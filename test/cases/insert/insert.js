function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

describe('Test insert', function () {

    it("load script", function (done) {
        con.importScripts("../cases/insert/insert_middleware.js").then(done).catch(done);
    });

    it('wrong table test', function (done) {
        con.insert({
            into: 'Customer'
        }).
            catch(function (err) {
                console.log(err);
                var error = {
                    message: "Table 'Customer' does not exist",
                    type: 'table_not_exist'
                };
                expect(err).to.be.an('object').eql(error);
                done();
            })
    });

    it('wrong table test with some waiting', function (done) {
        con.insert({
            into: 'Customer'
        }).
            catch(function (err) {
                console.log(err);
                var error = {
                    message: "Table 'Customer' does not exist",
                    type: 'table_not_exist'
                };
                expect(err).to.be.an('object').eql(error);
                setTimeout(done, 100);
                // done();
            })
    });

    it('insert customers', function (done) {
        $.getJSON("test/static/Customers.json", function (results) {
            con.insert({
                into: 'Customers',
                values: results
            }).then(function (results) {
                expect(results).to.be.an('number').to.equal(93);
                done();
            }).catch(function (err) {
                done(err);
            })
        });
    });

    it('insert customers with inserted id', function (done) {
        con.insert({
            into: 'Customers',
            values: [{ "customerId": 93, "customerName": "ujjwal gupta", "contactName": "ujjwal", "address": "bhubaneswar odisha", "city": "bhubaneswar", "postalCode": "12345", "country": "India" }]
        }).catch(function (err) {
            var error = { "message": "Key already exists in the object store.", "type": "ConstraintError" };
            expect(err).to.be.an('object').to.haveOwnProperty('type').equal('ConstraintError')
            done();
        })
    });

    it('insert customer using upsert - already inserted data', function (done) {
        const selectCustomerWithId91 = () => {
            return con.select({
                from: 'Customers',
                where: {
                    customerId: 91
                }
            })
        }
        selectCustomerWithId91().then(function (customers) {
            expect(customers[0]).to.haveOwnProperty('customerName').equal('Wolski');
            // console.log("before upsert results", customers);
            con.insert({
                into: 'Customers',
                upsert: true,
                return: true,
                values: [{
                    "customerId": 91, "customerName": "Jon Snow",
                    "contactName": "Zbyszek", "address": "ul. Filtrowa 68",
                    "city": "Walla",
                    // "postalCode": "01-012", 
                    "country": "Poland"
                }]
            }).then(function (results) {
                // console.log("upsert results", results);
                expect(results).to.be.an('array').length(1);
                expect(results[0]).to.haveOwnProperty('customerName').equal('Jon Snow');
                selectCustomerWithId91().then(function (newCustomers) {
                    expect(newCustomers).to.be.an('array').length(1);
                    expect(newCustomers[0]).to.haveOwnProperty('customerName').equal('Jon Snow');
                    done();
                }).catch(done);
            }).catch(function (err) {
                done(err);
            })
        })
    });

    it('check total no of customer', function (done) {
        con.count({
            from: 'Customers',
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(93);
            done();
        }).catch(function (err) {
            done(err);
        })
    });


    it('insert Orders', function (done) {
        $.getJSON("test/static/Orders.json", function (results) {
            results.forEach(val => {
                val.orderDate = new Date(val.orderDate);
            })
            con.insert({
                into: 'Orders',
                values: results
            }).then(function (results) {
                expect(results).to.be.an('number').to.equal(196);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert Orders a second time without option upsert', function (done) {
        $.getJSON("test/static/Orders.json", function (results) {
            results.forEach(val => {
                val.orderDate = new Date(val.orderDate);
            })
            con.insert({
                into: 'Orders',
                values: results
            }).then(function (result) {
                done(result);
            }).catch(function (err) {
                var error = {
                    message: "Key already exists in the object store.",
                    type: "ConstraintError"
                };
                expect(err).to.be.an('object').to.haveOwnProperty('type').equal('ConstraintError')
                done();
                console.log(err);
            });
        });
    });

    it('insert Orders a second time with option upsert', function (done) {
        $.getJSON("test/static/Orders.json", function (results) {
            results.forEach(val => {
                val.orderDate = new Date(val.orderDate);
            })
            con.insert({
                into: 'Orders',
                values: results,
                upsert: true
            }).then(function (results) {
                expect(results).to.be.an('number').to.equal(196);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });


    it('insert into orders with existing primaryKey', function (done) {
        con.insert({
            into: 'Orders',
            values: [{
                orderId: 10248,
                customerId: 90,
                employeeId: 5,
                orderDate: new Date("2019-04-05T02:48:32.955Z"),
                shipperId: 3
            }]
        }).catch(function (err) {
            var error = {
                "message": "Key already exists in the object store.",
                "type": "ConstraintError"
            };
            expect(err).to.be.an('object').to.haveOwnProperty('type').equal(error.type)
            done();
        });
    });

    it('insert Employees with invalid date', function (done) {
        $.getJSON("test/static/Employees.json", function (results) {
            con.insert({
                into: 'Employees',
                values: results
            }).catch(function (err) {
                // done(err);
                var error = {
                    "message": "Expected data type for the column birthDate is date_time, but received a string.",
                    "type": "wrong_data_type"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            });
        });
    });

    it('add middleware in worker', function (done) {
        con.addMiddleware("InsertMiddleware.insertEmployees", true).then(done).catch(done);
    })


    it('insert Employees', function (done) {
        $.getJSON("test/static/Employees.json", function (results) {
            // var startDate = new Date(1994, 0, 1);
            // var endDate = new Date();
            // results.forEach(function (value) {
            //     value.birthDate = randomDate(startDate, endDate);
            // });
            con.insert({
                into: 'Employees',
                values: results
            }).then(function (results) {
                expect(results).to.be.an('string').to.equal(
                    "Total inserted record is 34"
                );
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert Shippers ', function (done) {
        $.getJSON("test/static/Shippers.json", function (results) {
            con.insert({
                into: 'Shippers',
                values: results
            }).then(function (results) {
                expect(results).to.be.an('number').to.equal(3);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert products - using Skip Data', function (done) {
        $.getJSON("test/static/Products.json", function (results) {
            con.insert({
                into: 'Products',
                values: results,
                skipDataCheck: true
            }).
                then(function (results) {
                    expect(results).to.be.an('number').to.equal(77);
                    done();
                }).catch(function (err) {
                    done(err);
                });
        });
    });

    it('insert suppliers - using return Data', function (done) {
        $.getJSON("test/static/Suppliers.json", function (results) {
            var values = [{
                supplierName: "Exotic Liquid",
                contactName: "Charlotte Cooper",
                address: "49 Gilbert St.",
                city: "Londona",
                postalCode: "43951-1",
                country: "UK",
                phone: "12345"
            }, {
                supplierName: "Exotsic Liquid",
                contactName: "Charlotte Cooper",
                address: "49 Gilbert St.",
                city: "Londona",
                postalCode: "43951-1",
                country: "UK",
                phone: "12345"
            }, {
                supplierName: "Exotsic Liqduid",
                contactName: "Charlotte Cooper",
                address: "49 Gilbert St.",
                city: "Londona",
                postalCode: "43951-1",
                country: "UK",
                phone: "12345"
            }];
            con.insert({
                into: 'Suppliers',
                values: results.concat(values),
                return: true
            }).then(function (results) {
                expect(results).to.be.an('array').length(32);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });

    it('insert without values Option', function (done) {
        con.insert({
            into: 'Customers'
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(196);
            done();
        }).catch(function (err) {
            console.log(err);
            var error = {
                message: 'No value is supplied',
                type: 'no_value_supplied'
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('not null test', function (done) {
        con.insert({
            into: 'Customers',
            values: [{}]
        }).catch(function (err) {
            console.log(err);
            var error = {
                "message": "Null value is not allowed for column 'customerName'",
                "type": "null_value"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('not null test for last column', function (done) {
        var value = {
            shipperName: 'dsfgb'
        }
        con.insert({
            into: 'Shippers',
            values: [value]
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).catch(function (err) {
            console.log(err);
            var error = {
                "message": "Null value is not allowed for column 'phone'",
                "type": "null_value"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('wrong data type test - string', function (done) {
        var value = {
            shipperName: 'dsfgb',
            phone: 91234
        }
        con.insert({
            into: 'Shippers',
            values: [value]
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).catch(function (err) {
            // done(err);
            var error = {
                "message": "Expected data type for the column phone is string, but received a number.",
                "type": "wrong_data_type"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('wrong data type test - number', function (done) {
        var value = {
            productName: "dfb",
            supplierId: 5,
            categoryId: 10,
            price: "1123",
            unit: 12333
        }
        con.insert({
            into: 'Products',
            values: [value]
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(3);
            done();
        }).catch(function (err) {
            // done(err);
            var error = {
                "message": "Expected data type for the column unit is string, but received a number.",
                "type": "wrong_data_type"
            };
            expect(err).to.be.an('object').eql(error);
            done();
        });
    });

    it('undefined column insert', function (done) {
        var value = {
            shipperName: 'dsfgb',
            phone: '91234',
            address: 'ewrtgb'
        }
        con.insert({
            into: 'Shippers',
            values: [value],
            return: true
        }).
            then(function (results) {
                var returned_value = results[0];
                value['shipperId'] = returned_value.shipperId;
                expect(returned_value).to.be.an('object').eql(value);
                done();
            }).
            catch(function (err) {
                done(err);
            });
    });

    it('EnableSearch column test', function (done) {
        var value = {
            customerName: "dfb",
            contactName: "Anders",
            address: 'ewrgt',
            city: "1123",
            postalCode: "frfd",
            country: 'fesgt',
            email: 1234
        }
        con.insert({
            into: 'Customers',
            values: [value]
        }).
            then(function (results) {
                expect(results).to.be.an('number').to.equal(3);
                done();
            }).
            catch(function (err) {
                var error = {
                    "message": "Expected data type for the column email is string, but received a number.",
                    "type": "wrong_data_type"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            });
    });

    it('insert things', function (done) {
        var things = [
            "nest",
            "Eggs",
            "bite",
            "gator",
            "caYman",
            "Grip",
            "grips",
            "Jaw",
            "crocodilian",
            "Bayou"
        ];
        things = things.map(function (val) {
            return {
                value: val
            }
        })
        con.insert({
            into: 'things',
            values: things
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(10);
            done();
        }).catch(done)
    })

    it('insert Categories', function (done) {
        $.getJSON("test/static/Categories.json", function (results) {
            // var startDate = new Date(1994, 0, 1);
            // var endDate = new Date();
            // results.forEach(function (value) {
            //     value.birthDate = new randomDate(startDate, endDate);
            // });
            con.insert({
                into: 'Categories',
                values: results
            }).then(function (results) {
                expect(results).to.be.an('number').to.equal(8);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });
});
