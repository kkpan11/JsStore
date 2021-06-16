describe('Db upgrade Test', function () {
    var connection = new JsStore.Connection();

    it('create db DbUpdateTest', function (done) {
        var db = DbUpgradeTest.getDbSchema();
        connection.initDb(db).then(function (isDbCreated) {
            expect(isDbCreated).to.be.an('boolean').equal(true);
            done();
        }).catch(function () {
            done("dff")
        })
        console.log("executing create db 3");

    });

    it('insert data', function () {
        var values = DbUpgradeTest.getValues();
        return connection.insert({
            into: "test",
            values: values
        }).then(results => {
            expect(results).to.equal(3);
        })
    })

    it('getDbSchema', function (done) {
        connection.openDb(DbUpgradeTest.getDbSchema().name).then(function (schema) {
            const processIdColumn = schema.tables[0].columns[1];
            expect(processIdColumn.name).to.equal("process_id");
            expect(processIdColumn.dataType).to.equal("number");
            expect(schema.tables[0].columns[1].encrypt).equal(true)
            expect(schema.version).equal(1);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('change db to v2', function (done) {
        var db = DbUpgradeTest.getDbSchema();
        db.version = 2;
        connection.initDb(db).then(function (isDbCreated) {
            expect(isDbCreated).to.be.an('boolean').equal(true);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('open db with old version', function () {
        connection.openDb("DbUpgradeTest").catch(function (err) {
            console.error(JSON.stringify(err));
            const expected = {
                "message": "The requested version (1) is less than the existing version (2).",
                "type": "VersionError"
            };
            expect(err.type).to.equal(expected.type);
            done();
        });
    })


    it('getDbSchema after updating db', function (done) {
        connection.openDb("DbUpgradeTest", 2).then(function (schema) {
            const processIdColumn = schema.tables[0].columns[1];
            expect(processIdColumn.name).to.equal("process_id");
            expect(processIdColumn.dataType).to.equal("number");
            // expect(schema.tables[0].version).equal(2)

            expect(schema.version).equal(2);
            expect(schema.tables[0].columns[1].encrypt).equal(true)
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('count data to ensure data is not deleted', function () {
        return connection.count({
            from: "test",
        }).then(results => {
            expect(results).to.equal(3);
        })
    })

    it('change db to v3', function (done) {
        var db = DbUpgradeTest.getDbSchema();
        db.version = 3;
        db.tables[0].columns.process_id.encrypt = false;
        let isUpgradeCalled = false;
        connection.on("upgrade", (dataBase, oldVersion, newVersion) => {
            isUpgradeCalled = true;
            expect(db.version).equal(dataBase.version);
            expect(db.name).equal(dataBase.name);
            expect(db.tables.length).equal(dataBase.tables.length);
            expect(oldVersion).equal(2);
            expect(newVersion).equal(3);
        })
        let isOpenCalled = false;
        connection.on("open", () => {
            expect(isUpgradeCalled).to.be.an('boolean').equal(true);
            connection.off("upgrade");
            isOpenCalled = true;
        })
        let isCreateCalled = false;
        connection.on("create", () => {
            isCreateCalled = true;
        })
        connection.initDb(db).then(function (isDbCreated) {
            expect(isDbCreated).to.be.an('boolean').equal(true);
            expect(isCreateCalled).to.be.an('boolean').equal(false);
            expect(isUpgradeCalled).to.be.an('boolean').equal(true);
            expect(isOpenCalled).to.be.an('boolean').equal(true);
            connection.off("open");
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('count data to ensure data is there', function () {
        return connection.count({
            from: "test",
        }).then(results => {
            expect(results).to.equal(3);
        })
    })

    it('getDbSchema after updating db to v3', function (done) {
        connection.openDb("DbUpgradeTest", 3).then(function (schema) {
            const processIdColumn = schema.tables[0].columns[1];
            expect(processIdColumn.name).to.equal("process_id");
            expect(processIdColumn.dataType).to.equal("number");
            // expect(schema.tables[0].version).equal(2)
            expect(schema.version).equal(3);
            expect(schema.tables[0].columns[1].encrypt).equal(false)
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('create version v5 with skipping version 4', function (done) {
        var db = DbUpgradeTestV5.getDbSchema();
        let isUpgradeCalled = false;
        connection.on("upgrade", (dataBase, oldVersion, newVersion) => {
            isUpgradeCalled = true;
            expect(db.version).equal(dataBase.version);
            expect(db.name).equal(dataBase.name);
            expect(db.tables.length).equal(dataBase.tables.length);
            expect(oldVersion).equal(3);
            expect(newVersion).equal(5);
            const columns = dataBase.tables[0].columns;

            expect(Object.keys(columns)).length(4);

            expect(columns.id).not.null;
            expect(columns.name).not.null;
            expect(columns.name.dataType).equal('string');
            expect(columns.name.notNull).equal(true);

            expect(columns.gender.notNull).equal(undefined);
            expect(columns.gender.dataType).equal('string');

            expect(columns.s).to.be.undefined;
        })
        let isOpenCalled = false;
        connection.on("open", () => {
            expect(isUpgradeCalled).to.be.an('boolean').equal(true);
            connection.off("upgrade");
            isOpenCalled = true;
        })
        let isCreateCalled = false;
        connection.on("create", () => {
            isCreateCalled = true;
        })
        connection.initDb(db).then(function (isDbCreated) {
            expect(isDbCreated).to.be.an('boolean').equal(true);
            expect(isCreateCalled).to.be.an('boolean').equal(false);
            expect(isUpgradeCalled).to.be.an('boolean').equal(true);
            expect(isOpenCalled).to.be.an('boolean').equal(true);
            connection.off("open");
            connection.off("create");
            done();
        }).catch(function (err) {
            done(err);
        });
    })

    it('count data to ensure data is there', function () {
        return connection.count({
            from: "test",
        }).then(results => {
            expect(results).to.equal(3);
        })
    })

    it('insert data', function () {
        return connection.insert({
            into: "test",
            values: [{
                process_id: 2
            }]
        }).then(results => {
            expect(results).to.equal(3);
        }).catch(err => {
            var error = {
                "message": "Null value is not allowed for column 'name'",
                "type": "null_value"
            };
            expect(err).to.be.an('object').eql(error);
        })
    })

    it('open db version v5', function (done) {
        var db = DbUpgradeTestV5.getDbSchema();
        let isUpgradeCalled = false;
        connection.on("upgrade", () => {
            isUpgradeCalled = true;
        })
        let isOpenCalled = false;
        connection.on("open", (dataBase) => {
            con.off("upgrade");
            isOpenCalled = true;

            expect(db.version).equal(dataBase.version);
            expect(db.name).equal(dataBase.name);
            expect(db.tables.length).equal(dataBase.tables.length);

            const columns = dataBase.tables[0].columns;

            expect(Object.keys(columns)).length(4);

            expect(columns.id).not.null;
            expect(columns.name).not.null;
            expect(columns.name.dataType).equal('string');
            expect(columns.name.notNull).equal(true);

            expect(columns.gender.notNull).equal(undefined);
            expect(columns.gender.dataType).equal('string');

        })
        let isCreateCalled = false;
        connection.on("create", () => {
            isCreateCalled = true;
        })
        connection.initDb(db).then(function (isDbCreated) {
            expect(isDbCreated).to.be.an('boolean').equal(false);
            expect(isCreateCalled).to.be.an('boolean').equal(false);
            expect(isUpgradeCalled).to.be.an('boolean').equal(false);
            expect(isOpenCalled).to.be.an('boolean').equal(true);
            connection.off("open");
            connection.off("create");
            done();
        }).catch(function (err) {
            done(err);
        });
    })

    it('insert data with name null', function () {
        return connection.insert({
            into: "test",
            values: [{
                process_id: 2
            }]
        }).then(results => {
            expect(results).to.equal(3);
        }).catch(err => {
            var error = {
                "message": "Null value is not allowed for column 'name'",
                "type": "null_value"
            };
            expect(err).to.be.an('object').eql(error);
        })
    })

    it('insert data with gender null', function () {
        return connection.insert({
            into: "test",
            values: [{
                process_id: 2,
                name: 'ujjwal',
                gender: 12
            }]
        }).then(results => {
            expect(results).to.equal(3);
        })
        .catch(err => {
            var error = {
                "message": "Supplied value for column 'gender' have wrong data type",
                "type": "wrong_data_type"
            };
            expect(err).to.be.an('object').eql(error);
        })
    })

    it('drop db', function () {
        return connection.dropDb();
    })

    var DbUpgradeTest = {
        getDbSchema: function () {
            var people = {
                "name": "test",
                "columns":
                {
                    "id": {
                        "primaryKey": true,
                        "dataType": "number",
                        "autoIncrement": true,
                        "notNull": true
                    },
                    "process_id": {
                        "dataType": "number",
                        encrypt: true
                    },
                },

            },
                dataBase = {
                    name: 'DbUpgradeTest',
                    tables: [people]
                };
            return dataBase;
        },
        getValues: function () {
            var values = [{
                name: "Ray",
                tags: ["apple", "banana", "beer"]
            },
            {
                name: "Scott",
                tags: ["beer"]
            }, {
                name: "Marc",
                tags: ["mongo", "jenkins"]
            }
            ];
            return values;
        }
    }

    var DbUpgradeTestV5 = {
        getDbSchema: function () {
            var people = {
                "name": "test",
                "columns":
                {
                    "id": {
                        "primaryKey": true,
                        "dataType": "number",
                        "autoIncrement": true,
                        "notNull": true
                    },
                    "process_id": {
                        "dataType": "number",
                        encrypt: true
                    },
                },

                alter: {
                    4: {
                        add: {
                            name: {
                                dataType: 'string'
                            }
                        },
                    },
                    5: {
                        add: {
                            gender: {
                                dataType: 'string'
                            }
                        },
                        modify: {
                            name: {
                                notNull: true
                            }
                        },
                    },
                }

            },
                dataBase = {
                    name: 'DbUpgradeTest',
                    tables: [people],
                    version: 5
                };
            return dataBase;
        },
        getValues: function () {
            var values = [{
                name: "Ray",
                tags: ["apple", "banana", "beer"]
            },
            {
                name: "Scott",
                tags: ["beer"]
            }, {
                name: "Marc",
                tags: ["mongo", "jenkins"]
            }
            ];
            return values;
        }
    }

});

