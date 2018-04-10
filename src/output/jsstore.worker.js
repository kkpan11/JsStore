/*!
 * @license :jsstore - V2.0.0 - 09/04/2018
 * https://github.com/ujjwalguptaofficial/JsStore
 * Copyright (c) 2018 @Ujjwal Gupta; Licensed MIT
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./codes/worker/start.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./codes/main/enums.ts":
/*!*****************************!*\
  !*** ./codes/main/enums.ts ***!
  \*****************************/
/*! exports provided: Error_Type, WebWorker_Status, Data_Type */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Error_Type", function() { return Error_Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebWorker_Status", function() { return WebWorker_Status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data_Type", function() { return Data_Type; });
var Error_Type;
(function (Error_Type) {
    Error_Type["WorkerNotSupplied"] = "worker_not_supplied";
    Error_Type["IndexedDbUndefined"] = "indexeddb_undefined";
})(Error_Type || (Error_Type = {}));
var WebWorker_Status;
(function (WebWorker_Status) {
    WebWorker_Status["Registered"] = "registerd";
    WebWorker_Status["Failed"] = "failed";
    WebWorker_Status["NotStarted"] = "not_started";
})(WebWorker_Status || (WebWorker_Status = {}));
var Data_Type;
(function (Data_Type) {
    Data_Type["String"] = "string";
    Data_Type["Object"] = "object";
    Data_Type["Array"] = "array";
    Data_Type["Number"] = "number";
    Data_Type["Boolean"] = "boolean";
    Data_Type["Null"] = "null";
})(Data_Type || (Data_Type = {}));


/***/ }),

/***/ "./codes/worker/business/base.ts":
/*!***************************************!*\
  !*** ./codes/worker/business/base.ts ***!
  \***************************************/
/*! exports provided: Base */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return Base; });
/* harmony import */ var _base_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_helper */ "./codes/worker/business/base_helper.ts");
/* harmony import */ var _where_checker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./where_checker */ "./codes/worker/business/where_checker.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Base = /** @class */ (function (_super) {
    __extends(Base, _super);
    function Base() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorOccured = false;
        _this.errorCount = 0;
        _this.rowAffected = 0;
        _this.checkFlag = false;
        _this.onCursorError = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        _this.goToWhereLogic = function () {
            var _this = this;
            var columnName = this.getObjectFirstKey(this.query.where);
            if (this.query.IgnoreCase === true) {
                this.query.where = this.makeQryInCaseSensitive(this.query.where);
            }
            if (this.objectStore.indexNames.contains(columnName)) {
                var value = this.query.where[columnName];
                if (typeof value === 'object') {
                    this.checkFlag = Boolean(Object.keys(value).length > 1 ||
                        Object.keys(this.query.where).length > 1);
                    if (this.checkFlag === true) {
                        this.whereCheckerInstance = new _where_checker__WEBPACK_IMPORTED_MODULE_1__["WhereChecker"](this.query.where);
                    }
                    var key = this.getObjectFirstKey(value);
                    switch (key) {
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Like:
                            {
                                var filterValues = value[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Like].split('%');
                                var filterValue = void 0, occurence = void 0;
                                if (filterValues[1]) {
                                    filterValue = filterValues[1];
                                    occurence = filterValues.length > 2 ? _enums__WEBPACK_IMPORTED_MODULE_3__["OCCURENCE"].Any : _enums__WEBPACK_IMPORTED_MODULE_3__["OCCURENCE"].Last;
                                }
                                else {
                                    filterValue = filterValues[0];
                                    occurence = _enums__WEBPACK_IMPORTED_MODULE_3__["OCCURENCE"].First;
                                }
                                if (occurence === _enums__WEBPACK_IMPORTED_MODULE_3__["OCCURENCE"].First) {
                                    this.getAllCombinationOfWord(filterValue).forEach(function (item) {
                                        _this.executeWhereLogic(columnName, { '-': { low: item, high: item + '\uffff' } }, '-');
                                    });
                                    delete this.query.where[columnName][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Like];
                                }
                                else {
                                    this.executeLikeLogic(columnName, filterValue, occurence);
                                }
                            }
                            break;
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].In:
                            this.executeInLogic(columnName, value[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].In]);
                            break;
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Between:
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].GreaterThan:
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].LessThan:
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].GreaterThanEqualTo:
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].LessThanEqualTo:
                            this.executeWhereLogic(columnName, value, key);
                            break;
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Aggregate: break;
                        default: this.executeWhereLogic(columnName, value);
                    }
                }
                else {
                    this.checkFlag = Boolean(Object.keys(this.query.where).length > 1);
                    if (this.checkFlag === true) {
                        this.whereCheckerInstance = new _where_checker__WEBPACK_IMPORTED_MODULE_1__["WhereChecker"](this.query.where);
                    }
                    this.executeWhereLogic(columnName, value);
                }
            }
            else {
                this.errorOccured = true;
                var column = this.getColumnInfo(columnName), error = column == null ?
                    new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_3__["ERROR_TYPE"].ColumnNotExist, { ColumnName: columnName }) :
                    new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_3__["ERROR_TYPE"].EnableSearchOff, { ColumnName: columnName });
                this.onErrorOccured(error, true);
            }
        };
        return _this;
    }
    Base.prototype.onErrorOccured = function (e, customError) {
        if (customError === void 0) { customError = false; }
        ++this.errorCount;
        if (this.errorCount === 1) {
            if (customError) {
                e.logError();
                this.onError(e.get());
            }
            else {
                var error = new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](e.target.error.name);
                error.message = e.target.error.message;
                error.logError();
                this.onError(error.get());
            }
        }
    };
    Base.prototype.onExceptionOccured = function (ex, info) {
        switch (ex.name) {
            case 'NotFoundError':
                var error = new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_3__["ERROR_TYPE"].TableNotExist, info);
                this.onErrorOccured(error, true);
                break;
            default: console.error(ex);
        }
    };
    Base.prototype.getColumnInfo = function (columnName) {
        var columnInfo;
        this.getTable(this.tableName).columns.every(function (column) {
            if (column.name === columnName) {
                columnInfo = column;
                return false;
            }
            return true;
        });
        return columnInfo;
    };
    Base.prototype.addGreatAndLessToNotOp = function () {
        var whereQuery = this.query.where;
        var value;
        if (this.containsNot(whereQuery)) {
            var queryKeys = Object.keys(whereQuery);
            if (queryKeys.length === 1) {
                queryKeys.forEach(function (prop) {
                    value = whereQuery[prop];
                    if (value[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].NotEqualTo]) {
                        whereQuery[prop][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].GreaterThan] = value[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].NotEqualTo];
                        if (whereQuery[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or] === undefined) {
                            whereQuery[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or] = {};
                            whereQuery[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or][prop] = {};
                        }
                        else if (whereQuery[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or][prop] === undefined) {
                            whereQuery[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or][prop] = {};
                        }
                        whereQuery[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or][prop][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].LessThan] = value[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].NotEqualTo];
                        delete whereQuery[prop][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].NotEqualTo];
                    }
                });
                this.query.where = whereQuery;
            }
            else {
                var whereTmp_1 = [];
                queryKeys.forEach(function (prop) {
                    value = whereQuery[prop];
                    var tmpQry = {};
                    if (value[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].NotEqualTo]) {
                        tmpQry[prop] = {};
                        tmpQry[prop][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].GreaterThan] = value[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].NotEqualTo];
                        tmpQry[prop][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or] = {};
                        tmpQry[prop][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or][prop] = {};
                        tmpQry[prop][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Or][prop][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].LessThan] = value[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].NotEqualTo];
                    }
                    else {
                        tmpQry[prop] = value;
                    }
                    whereTmp_1.push(tmpQry);
                });
                this.query.where = whereTmp_1;
            }
        }
    };
    Base.prototype.makeQryInCaseSensitive = function (qry) {
        var results = [];
        var columnValue, keyValue;
        for (var column in qry) {
            columnValue = qry[column];
            if (typeof columnValue === 'object') {
                for (var key in columnValue) {
                    keyValue = columnValue[key];
                    switch (key) {
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].In:
                            results = results.concat(this.getAllCombinationOfWord(keyValue, true));
                            break;
                        case _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Like:
                            break;
                        default:
                            results = results.concat(this.getAllCombinationOfWord(keyValue));
                    }
                }
                qry[column][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].In] = results;
            }
            else {
                results = results.concat(this.getAllCombinationOfWord(columnValue));
                qry[column] = {};
                qry[column][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].In] = results;
            }
        }
        return qry;
    };
    return Base;
}(_base_helper__WEBPACK_IMPORTED_MODULE_0__["BaseHelper"]));



/***/ }),

/***/ "./codes/worker/business/base_helper.ts":
/*!**********************************************!*\
  !*** ./codes/worker/business/base_helper.ts ***!
  \**********************************************/
/*! exports provided: BaseHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseHelper", function() { return BaseHelper; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/business/idb_helper.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./codes/worker/util.ts");




var BaseHelper = /** @class */ (function () {
    function BaseHelper() {
        // static method helpers
        this.filterOnOccurence = function (value) {
            var found = false;
            value = value.toLowerCase();
            switch (this._compSymbol) {
                case _enums__WEBPACK_IMPORTED_MODULE_0__["OCCURENCE"].Any:
                    if (value.indexOf(this._compValue) >= 0) {
                        found = true;
                    }
                    break;
                case _enums__WEBPACK_IMPORTED_MODULE_0__["OCCURENCE"].First:
                    if (value.indexOf(this._compValue) === 0) {
                        found = true;
                    }
                    break;
                case _enums__WEBPACK_IMPORTED_MODULE_0__["OCCURENCE"].Last:
                    if (value.lastIndexOf(this._compValue) === value.length - this._compValueLength) {
                        found = true;
                    }
                    break;
                default: if (value !== this._compValue) {
                    found = true;
                }
            }
            return found;
        };
    }
    Object.defineProperty(BaseHelper.prototype, "activeDb", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHelper.prototype, "dbConnection", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].dbConnection;
        },
        enumerable: true,
        configurable: true
    });
    BaseHelper.prototype.getObjectFirstKey = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_2__["Util"].getObjectFirstKey(value);
    };
    BaseHelper.prototype.isNull = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_2__["Util"].isNull(value);
    };
    BaseHelper.prototype.getType = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_2__["Util"].getType(value);
    };
    Object.defineProperty(BaseHelper.prototype, "transaction", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].transaction;
        },
        enumerable: true,
        configurable: true
    });
    BaseHelper.prototype.createTransaction = function (tableNames, callBack, mode) {
        _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].createTransaction(tableNames, callBack);
    };
    BaseHelper.prototype.containsNot = function (whereQry) {
        var status = false;
        var value;
        Object.keys(whereQry).every(function (key) {
            value = whereQry[key];
            if (value['!=']) {
                status = true;
            }
            return !status;
        });
        return status;
    };
    BaseHelper.prototype.isTableExist = function (tableName) {
        var isExist = false;
        this.activeDb.tables.every(function (table) {
            if (table.name === tableName) {
                isExist = true;
                return false;
            }
            return true;
        });
        return isExist;
    };
    BaseHelper.prototype.getTable = function (tableName) {
        var currentTable;
        this.activeDb.tables.every(function (table) {
            if (table.name === tableName) {
                currentTable = table;
                return false;
            }
            return true;
        });
        return currentTable;
    };
    BaseHelper.prototype.getKeyRange = function (value, op) {
        var keyRange;
        switch (op) {
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].Between:
                keyRange = IDBKeyRange.bound(value.low, value.high, false, false);
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].GreaterThan:
                keyRange = IDBKeyRange.lowerBound(value, true);
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].GreaterThanEqualTo:
                keyRange = IDBKeyRange.lowerBound(value);
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].LessThan:
                keyRange = IDBKeyRange.upperBound(value, true);
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].LessThanEqualTo:
                keyRange = IDBKeyRange.upperBound(value);
                break;
            default:
                keyRange = IDBKeyRange.only(value);
                break;
        }
        return keyRange;
    };
    BaseHelper.prototype.getPrimaryKey = function (tableName) {
        var primaryKey = this.getTable(tableName).primaryKey;
        return primaryKey ? primaryKey : this.getKeyPath(tableName);
    };
    BaseHelper.prototype.getKeyPath = function (tableName) {
        var transaction = this.dbConnection.transaction([tableName], "readonly"), objectStore = transaction.objectStore(tableName);
        return objectStore.keyPath;
    };
    BaseHelper.prototype.getAllCombinationOfWord = function (word, isArray) {
        if (isArray) {
            var results = [];
            for (var i = 0, length_1 = word.length; i < length_1; i++) {
                results = results.concat(this.getCombination_(word[i]));
            }
            return results;
        }
        else {
            return this.getCombination_(word);
        }
    };
    BaseHelper.prototype.getCombination_ = function (word) {
        var results = [];
        var doAndPushCombination = function (subWord, chars, index) {
            if (index === subWord.length) {
                results.push(chars.join(""));
            }
            else {
                var ch = subWord.charAt(index);
                chars[index] = ch.toLowerCase();
                doAndPushCombination(subWord, chars, index + 1);
                chars[index] = ch.toUpperCase();
                doAndPushCombination(subWord, chars, index + 1);
            }
        };
        doAndPushCombination(word, [], 0);
        return results;
    };
    return BaseHelper;
}());



/***/ }),

/***/ "./codes/worker/business/bulk_insert.ts":
/*!**********************************************!*\
  !*** ./codes/worker/business/bulk_insert.ts ***!
  \**********************************************/
/*! exports provided: BulkInsert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BulkInsert", function() { return BulkInsert; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./codes/worker/business/base.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../log_helper */ "./codes/worker/log_helper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var BulkInsert = /** @class */ (function (_super) {
    __extends(BulkInsert, _super);
    function BulkInsert(query, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.query = query;
        _this.onSuccess = onSuccess;
        _this.onError = onError;
        return _this;
    }
    BulkInsert.prototype.execute = function () {
        if (!Array.isArray(this.query.values)) {
            this.onErrorOccured(new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].NotArray), true);
        }
        else if (this.isTableExist(this.query.into) === true) {
            try {
                this.bulkinsertData(this.query.values);
                this.query.values = null;
            }
            catch (ex) {
                this.onExceptionOccured(ex, { TableName: this.query.into });
            }
        }
        else {
            var error = new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].TableNotExist, { TableName: this.query.into });
            error.throw();
        }
    };
    BulkInsert.prototype.bulkinsertData = function (values) {
        var _this = this;
        this.createTransaction([this.query.into], function () {
            _this.onSuccess();
        });
        this.objectStore = this.transaction.objectStore(this.query.into);
        for (var i = 0, length_1 = values.length; i < length_1; i++) {
            this.objectStore.add(values[i]);
        }
    };
    return BulkInsert;
}(_base__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/business/clear.ts":
/*!****************************************!*\
  !*** ./codes/worker/business/clear.ts ***!
  \****************************************/
/*! exports provided: Clear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clear", function() { return Clear; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./codes/worker/business/base.ts");
/* harmony import */ var _keystore_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../keystore/index */ "./codes/worker/keystore/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Clear = /** @class */ (function (_super) {
    __extends(Clear, _super);
    function Clear(tableName, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.query = tableName;
        _this.onSuccess = onSuccess;
        _this.onError = onError;
        return _this;
    }
    Clear.prototype.execute = function () {
        var _this = this;
        this.createTransaction([this.query], function () {
            if (_this.errorOccured === false) {
                _this.onSuccess();
            }
        });
        var clearRequest = this.transaction.objectStore(this.query).clear();
        clearRequest.onsuccess = function (e) {
            var currentTable = _this.getTable(_this.query);
            currentTable.columns.forEach(function (column) {
                if (column.autoIncrement) {
                    _keystore_index__WEBPACK_IMPORTED_MODULE_1__["set"]("JsStore_" + _this.activeDb.name + "_" + _this.query + "_" + column.name + "_Value", 0);
                }
            });
        };
        clearRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
    };
    return Clear;
}(_base__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/business/count/base_count.ts":
/*!***************************************************!*\
  !*** ./codes/worker/business/count/base_count.ts ***!
  \***************************************************/
/*! exports provided: BaseCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseCount", function() { return BaseCount; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ "./codes/worker/business/base.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BaseCount = /** @class */ (function (_super) {
    __extends(BaseCount, _super);
    function BaseCount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._resultCount = 0;
        _this.checkFlag = false;
        return _this;
    }
    BaseCount.prototype.onQueryFinished = function () {
        if (this.isTransaction === true) {
            this.onTransactionCompleted();
        }
    };
    BaseCount.prototype.onTransactionCompleted = function () {
        if (this.errorOccured === false) {
            this.onSuccess(this._resultCount);
        }
    };
    return BaseCount;
}(_base__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/business/count/in.ts":
/*!*******************************************!*\
  !*** ./codes/worker/business/count/in.ts ***!
  \*******************************************/
/*! exports provided: In */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "In", function() { return In; });
/* harmony import */ var _not_where__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_where */ "./codes/worker/business/count/not_where.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var In = /** @class */ (function (_super) {
    __extends(In, _super);
    function In() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    In.prototype.executeInLogic = function (column, values) {
        var _this = this;
        var cursor, cursorRequest;
        var columnStore = this.objectStore.index(column);
        if (this.checkFlag) {
            var _loop_1 = function (i, length_1) {
                cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                cursorRequest.onsuccess = function (e) {
                    cursor = e.target.result;
                    if (cursor) {
                        if (_this.whereCheckerInstance.check(cursor.value)) {
                            ++_this._resultCount;
                        }
                        cursor.continue();
                    }
                    else if (i + 1 === length_1) {
                        _this.onQueryFinished();
                    }
                };
                cursorRequest.onerror = this_1.onCursorError;
            };
            var this_1 = this;
            for (var i = 0, length_1 = values.length; i < length_1; i++) {
                _loop_1(i, length_1);
            }
        }
        else {
            if (this.objectStore.count) {
                var _loop_2 = function (i, length_2) {
                    cursorRequest = columnStore.count(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        _this._resultCount += e.target.result;
                        if (i + 1 === length_2) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = this_2.onCursorError;
                };
                var this_2 = this;
                for (var i = 0, length_2 = values.length; i < length_2; i++) {
                    _loop_2(i, length_2);
                }
            }
            else {
                var _loop_3 = function (i, length_3) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            ++_this._resultCount;
                            cursor.continue();
                        }
                        else if (i + 1 === length_3) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = this_3.onCursorError;
                };
                var this_3 = this;
                for (var i = 0, length_3 = values.length; i < length_3; i++) {
                    _loop_3(i, length_3);
                }
            }
        }
    };
    return In;
}(_not_where__WEBPACK_IMPORTED_MODULE_0__["NotWhere"]));



/***/ }),

/***/ "./codes/worker/business/count/index.ts":
/*!**********************************************!*\
  !*** ./codes/worker/business/count/index.ts ***!
  \**********************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance */ "./codes/worker/business/count/instance.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["Instance"]; });




/***/ }),

/***/ "./codes/worker/business/count/instance.ts":
/*!*************************************************!*\
  !*** ./codes/worker/business/count/instance.ts ***!
  \*************************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return Instance; });
/* harmony import */ var _where__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./where */ "./codes/worker/business/count/where.ts");
/* harmony import */ var _select_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../select/index */ "./codes/worker/business/select/index.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Instance = /** @class */ (function (_super) {
    __extends(Instance, _super);
    function Instance(query, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.onError = onError;
        _this.onSuccess = onSuccess;
        _this.query = query;
        return _this;
    }
    Instance.prototype.execute = function () {
        var _this = this;
        if (this.isTableExist(this.query.from)) {
            try {
                if (this.query.where !== undefined) {
                    this.addGreatAndLessToNotOp();
                    if (this.query.where.Or || Array.isArray(this.query.where)) {
                        var selectInstance = new _select_index__WEBPACK_IMPORTED_MODULE_1__["Instance"](this.query, function (results) {
                            _this._resultCount = results.length;
                            _this.onTransactionCompleted();
                        }, this.onError);
                        selectInstance.execute();
                    }
                    else {
                        this.initTransaction_();
                        this.goToWhereLogic();
                    }
                }
                else {
                    this.initTransaction_();
                    this.executeWhereUndefinedLogic();
                }
            }
            catch (ex) {
                this.onExceptionOccured(ex, { TableName: this.query.from });
            }
        }
        else {
            this.errorOccured = true;
            this.onErrorOccured(new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_3__["ERROR_TYPE"].TableNotExist, { TableName: this.query.From }), true);
        }
    };
    Instance.prototype.initTransaction_ = function () {
        this.createTransaction([this.query.From], this.onTransactionCompleted, 'readonly');
        this.objectStore = this.transaction.objectStore(this.query.From);
    };
    return Instance;
}(_where__WEBPACK_IMPORTED_MODULE_0__["Where"]));



/***/ }),

/***/ "./codes/worker/business/count/like.ts":
/*!*********************************************!*\
  !*** ./codes/worker/business/count/like.ts ***!
  \*********************************************/
/*! exports provided: Like */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Like", function() { return Like; });
/* harmony import */ var _in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./in */ "./codes/worker/business/count/in.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Like = /** @class */ (function (_super) {
    __extends(Like, _super);
    function Like() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Like.prototype.executeLikeLogic = function (column, value, symbol) {
        var _this = this;
        var cursor;
        this._compValue = value.toLowerCase();
        this._compValueLength = this._compValue.length;
        this._compSymbol = symbol;
        var cursorRequest = this.objectStore.index(column).openCursor();
        cursorRequest.onerror = this.onCursorError;
        if (this.checkFlag) {
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key) &&
                        _this.whereCheckerInstance.check(cursor.value)) {
                        ++_this._resultCount;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key)) {
                        ++_this._resultCount;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    return Like;
}(_in__WEBPACK_IMPORTED_MODULE_0__["In"]));



/***/ }),

/***/ "./codes/worker/business/count/not_where.ts":
/*!**************************************************!*\
  !*** ./codes/worker/business/count/not_where.ts ***!
  \**************************************************/
/*! exports provided: NotWhere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotWhere", function() { return NotWhere; });
/* harmony import */ var _base_count__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_count */ "./codes/worker/business/count/base_count.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NotWhere = /** @class */ (function (_super) {
    __extends(NotWhere, _super);
    function NotWhere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotWhere.prototype.executeWhereUndefinedLogic = function () {
        var _this = this;
        if (this.objectStore.count) {
            var countRequest_1 = this.objectStore.count();
            countRequest_1.onsuccess = function () {
                _this._resultCount = countRequest_1.result;
                _this.onQueryFinished();
            };
            countRequest_1.onerror = this.onCursorError;
        }
        else {
            var cursor_1;
            var cursorRequest = this.objectStore.openCursor();
            cursorRequest.onsuccess = function (e) {
                cursor_1 = e.target.result;
                if (cursor_1) {
                    ++this._resultCount;
                    cursor_1.continue();
                }
                else {
                    this.onQueryFinished();
                }
            }.bind(this);
            cursorRequest.onerror = this.onCursorError;
        }
    };
    return NotWhere;
}(_base_count__WEBPACK_IMPORTED_MODULE_0__["BaseCount"]));



/***/ }),

/***/ "./codes/worker/business/count/where.ts":
/*!**********************************************!*\
  !*** ./codes/worker/business/count/where.ts ***!
  \**********************************************/
/*! exports provided: Where */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Where", function() { return Where; });
/* harmony import */ var _like__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./like */ "./codes/worker/business/count/like.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Where = /** @class */ (function (_super) {
    __extends(Where, _super);
    function Where() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Where.prototype.executeWhereLogic = function (column, value, op) {
        var _this = this;
        value = op ? value[op] : value;
        var cursorRequest, cursor;
        if (this.checkFlag) {
            cursorRequest = this.objectStore.index(column).openCursor(this.getKeyRange(value, op));
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.whereCheckerInstance.check(cursor.value)) {
                        ++_this._resultCount;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            if (this.objectStore.count) {
                cursorRequest = this.objectStore.index(column).count(this.getKeyRange(value, op));
                cursorRequest.onsuccess = function () {
                    _this._resultCount = cursorRequest.result;
                    _this.onQueryFinished();
                };
            }
            else {
                cursorRequest = this.objectStore.index(column).openCursor(this.getKeyRange(value, op));
                cursorRequest.onsuccess = function (e) {
                    cursor = e.target.result;
                    if (cursor) {
                        ++_this._resultCount;
                        cursor.continue();
                    }
                    else {
                        _this.onQueryFinished();
                    }
                };
            }
        }
        cursorRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
    };
    return Where;
}(_like__WEBPACK_IMPORTED_MODULE_0__["Like"]));



/***/ }),

/***/ "./codes/worker/business/create_db.ts":
/*!********************************************!*\
  !*** ./codes/worker/business/create_db.ts ***!
  \********************************************/
/*! exports provided: CreateDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateDb", function() { return CreateDb; });
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/business/idb_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _keystore_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../keystore/index */ "./codes/worker/keystore/index.ts");



var CreateDb = /** @class */ (function () {
    function CreateDb(tablesMetaData, onSuccess, onError) {
        var _this = this;
        this.dbName_ = this.activeDb_.name;
        var listofTableCreated = [];
        var dbRequest = indexedDB.open(this.dbName_, this.dbVersion_);
        dbRequest.onerror = function (event) {
            if (onError != null) {
                onError(event.target.error);
            }
        };
        dbRequest.onsuccess = function (event) {
            _this.dbStatus_.conStatus = _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Connected;
            _this.dbConnection_ = dbRequest.result;
            _this.dbConnection_.onclose = function (e) {
                _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].callDbDroppedByBrowser();
                _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].updateDbStatus(_enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed, _enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].ConnectionClosed);
            };
            _this.dbConnection_.onversionchange = function (e) {
                if (e.newVersion === null) {
                    e.target.close(); // Manually close our connection to the db
                    _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].callDbDroppedByBrowser(true);
                    _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].updateDbStatus(_enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed, _enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].ConnectionClosed);
                }
            };
            _this.dbConnection_.onerror = function (e) {
                _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus.lastError = ("Error occured in connection :" + e.target.result);
            };
            _this.dbConnection_.onabort = function (e) {
                _this.dbStatus_ = {
                    conStatus: _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed,
                    lastError: _enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].ConnectionAborted
                };
            };
            // save in database list
            _this.saveDbName();
            if (onSuccess != null) {
                onSuccess(listofTableCreated);
            }
        };
        dbRequest.onupgradeneeded = function (event) {
            var dbConnection = event.target.result;
            var createObjectStore = function (item, index) {
                try {
                    if (item.primaryKey.length > 0) {
                        _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb.tables[index].primaryKey = item.primaryKey;
                        var store_1 = dbConnection.createObjectStore(item.name, {
                            keyPath: item.primaryKey
                        });
                        item.columns.forEach(function (column) {
                            if (column.enableSearch === true) {
                                var options = column.primaryKey ? { unique: true } : { unique: column.unique };
                                options['multiEntry'] = column.multiEntry;
                                store_1.createIndex(column.name, column.name, options);
                                if (column.autoIncrement) {
                                    _keystore_index__WEBPACK_IMPORTED_MODULE_2__["set"]("JsStore_" + _this.dbName_ + "_" + item.name + "_" + column.name + "_Value", 0);
                                }
                            }
                        });
                    }
                    else {
                        var store_2 = dbConnection.createObjectStore(item.name, {
                            autoIncrement: true
                        });
                        item.columns.forEach(function (column) {
                            var options = { unique: column.unique, multiEntry: column.multiEntry };
                            store_2.createIndex(column.name, column.name, options);
                            if (column.autoIncrement) {
                                _keystore_index__WEBPACK_IMPORTED_MODULE_2__["set"]("JsStore_" + _this.dbName_ + "_" + item.name + "_" + column.name + "_Value", 0);
                            }
                        });
                    }
                    listofTableCreated.push(item.name);
                    // setting the table version
                    _keystore_index__WEBPACK_IMPORTED_MODULE_2__["set"]("JsStore_" + _this.dbName_ + "_" + item.name + "_Version", item.version);
                }
                catch (e) {
                    console.error(e);
                }
            };
            tablesMetaData.forEach(function (item, index) {
                if (item.requireDelete) {
                    // Delete the old datastore.    
                    if (dbConnection.objectStoreNames.contains(item.name)) {
                        dbConnection.deleteObjectStore(item.name);
                    }
                    createObjectStore(item, index);
                }
                else if (item.requireCreation) {
                    createObjectStore(item, index);
                }
            });
        };
    }
    Object.defineProperty(CreateDb.prototype, "activeDb_", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateDb.prototype, "dbVersion_", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDbVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateDb.prototype, "dbStatus_", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus;
        },
        set: function (value) {
            _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CreateDb.prototype, "dbConnection_", {
        set: function (value) {
            _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbConnection = value;
        },
        enumerable: true,
        configurable: true
    });
    CreateDb.prototype.getDbList_ = function (callback) {
        _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].getDbList(callback);
    };
    CreateDb.prototype.saveDbName = function () {
        var _this = this;
        this.getDbList_(function (result) {
            if (result.indexOf(_this.dbName_) < 0) {
                result.push(_this.dbName_);
                _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].setDbList(result);
            }
        });
    };
    return CreateDb;
}());



/***/ }),

/***/ "./codes/worker/business/drop_db.ts":
/*!******************************************!*\
  !*** ./codes/worker/business/drop_db.ts ***!
  \******************************************/
/*! exports provided: DropDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropDb", function() { return DropDb; });
/* harmony import */ var _keystore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../keystore/index */ "./codes/worker/keystore/index.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/business/idb_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../log_helper */ "./codes/worker/log_helper.ts");




var DropDb = /** @class */ (function () {
    function DropDb(onSuccess, onError) {
        this.onSuccess_ = onSuccess;
        this.onError_ = onError;
        this.dbName_ = _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDb.name;
    }
    DropDb.prototype.deleteMetaData = function () {
        var _this = this;
        _keystore_index__WEBPACK_IMPORTED_MODULE_0__["remove"]("JsStore_" + this.dbName_ + "_Db_Version");
        _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDb.tables.forEach(function (table) {
            _keystore_index__WEBPACK_IMPORTED_MODULE_0__["remove"]("JsStore_" + _this.dbName_ + "_" + table.name + "_Version");
            table.columns.forEach(function (column) {
                if (column.autoIncrement) {
                    _keystore_index__WEBPACK_IMPORTED_MODULE_0__["remove"]("JsStore_" + this._dbName + "_" + table.name + "_" + column.name + "_Value");
                }
            });
        });
        // remove from database_list 
        this.getDbList_(function (result) {
            result.splice(result.indexOf(_this.dbName_), 1);
            _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].setDbList(result);
        });
        _keystore_index__WEBPACK_IMPORTED_MODULE_0__["remove"]("JsStore_" + this.dbName_ + "_Schema", this.onSuccess_);
    };
    DropDb.prototype.getDbList_ = function (callback) {
        _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].getDbList(callback);
    };
    DropDb.prototype.deleteDb = function () {
        var _this = this;
        setTimeout(function () {
            var dropDbRequest = indexedDB.deleteDatabase(_this.dbName_);
            dropDbRequest.onblocked = function () {
                if (_this.onError_ != null) {
                    _this.onError_(new _log_helper__WEBPACK_IMPORTED_MODULE_3__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_2__["ERROR_TYPE"].DbBlocked).get());
                }
            };
            dropDbRequest.onerror = function (e) {
                if (_this.onError_ != null) {
                    _this.onError_(event.target.error);
                }
            };
            dropDbRequest.onsuccess = function () {
                _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].dbStatus.conStatus = _enums__WEBPACK_IMPORTED_MODULE_2__["CONNECTION_STATUS"].Closed;
                _this.deleteMetaData();
            };
        }, 100);
    };
    return DropDb;
}());



/***/ }),

/***/ "./codes/worker/business/idb_helper.ts":
/*!*********************************************!*\
  !*** ./codes/worker/business/idb_helper.ts ***!
  \*********************************************/
/*! exports provided: IdbHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdbHelper", function() { return IdbHelper; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _keystore_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../keystore/index */ "./codes/worker/keystore/index.ts");
/* harmony import */ var _drop_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drop_db */ "./codes/worker/business/drop_db.ts");



var IdbHelper = /** @class */ (function () {
    function IdbHelper() {
    }
    IdbHelper.callDbDroppedByBrowser = function (deleteMetaData) {
        if (this.dbStatus.conStatus === _enums__WEBPACK_IMPORTED_MODULE_0__["CONNECTION_STATUS"].Connected) {
            this.isDbDeletedByBrowser = true;
            if (deleteMetaData === true) {
                var dropDbObject = new _drop_db__WEBPACK_IMPORTED_MODULE_2__["DropDb"](this.onDbDroppedByBrowser, null);
                dropDbObject.deleteMetaData();
            }
        }
    };
    IdbHelper.createTransaction = function (tableNames, callBack, mode) {
        var _this = this;
        if (this.transaction === null) {
            mode = mode ? mode : _enums__WEBPACK_IMPORTED_MODULE_0__["Idb_Mode"].ReadWrite;
            this.transaction = this.dbConnection.transaction(tableNames, mode);
            this.transaction.oncomplete = function () {
                _this.transaction = null;
                callBack();
            };
            this.transaction.ontimeout = function () {
                _this.transaction = null;
                console.error('transaction timed out');
            };
        }
    };
    IdbHelper.setDbList = function (list) {
        _keystore_index__WEBPACK_IMPORTED_MODULE_1__["set"]('database_list', list);
    };
    IdbHelper.updateDbStatus = function (status, err) {
        if (err === undefined) {
            this.dbStatus.conStatus = status;
        }
        else {
            this.dbStatus = {
                conStatus: status,
                lastError: err
            };
        }
    };
    IdbHelper.getDbList = function (callback) {
        _keystore_index__WEBPACK_IMPORTED_MODULE_1__["get"]('Database_List', function (result) {
            result = result == null ? [] : result;
            callback(result);
        });
    };
    IdbHelper.getDbVersion = function (dbName, callback) {
        _keystore_index__WEBPACK_IMPORTED_MODULE_1__["get"]("JsStore_" + dbName + "_Db_Version", function (dbVersion) {
            callback.call(this, Number(dbVersion));
        }.bind(this));
    };
    IdbHelper.getDbSchema = function (dbName, callback) {
        _keystore_index__WEBPACK_IMPORTED_MODULE_1__["get"]("JsStore_" + dbName + "_Schema", function (result) {
            callback(result);
        });
    };
    IdbHelper.transaction = null;
    IdbHelper.activeDbVersion = 0;
    IdbHelper.dbStatus = {
        conStatus: _enums__WEBPACK_IMPORTED_MODULE_0__["CONNECTION_STATUS"].NotStarted,
        lastError: null
    };
    return IdbHelper;
}());



/***/ }),

/***/ "./codes/worker/business/insert/index.ts":
/*!***********************************************!*\
  !*** ./codes/worker/business/insert/index.ts ***!
  \***********************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance */ "./codes/worker/business/insert/instance.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["Instance"]; });




/***/ }),

/***/ "./codes/worker/business/insert/instance.ts":
/*!**************************************************!*\
  !*** ./codes/worker/business/insert/instance.ts ***!
  \**************************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return Instance; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ "./codes/worker/business/base.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _values_checker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./values_checker */ "./codes/worker/business/insert/values_checker.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Instance = /** @class */ (function (_super) {
    __extends(Instance, _super);
    function Instance(query, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this._valuesAffected = [];
        _this.onError = onError;
        _this.query = query;
        _this.onSuccess = onSuccess;
        _this.tableName = _this.query.into;
        return _this;
    }
    Instance.prototype.execute = function () {
        var _this = this;
        var table = this.getTable(this.tableName);
        if (!Array.isArray(this.query.values)) {
            this.onErrorOccured(new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].NotArray), true);
        }
        else if (table) {
            try {
                if (this.query.skipDataCheck) {
                    this.insertData(this.query.values);
                }
                else {
                    var valueCheckerInstance_1 = new _values_checker__WEBPACK_IMPORTED_MODULE_3__["ValuesChecker"](table, this.query.values);
                    valueCheckerInstance_1.checkAndModifyValues(function (isError) {
                        if (isError) {
                            _this.onErrorOccured(valueCheckerInstance_1.error, true);
                        }
                        else {
                            _this.insertData(valueCheckerInstance_1.values);
                        }
                        valueCheckerInstance_1 = undefined;
                    });
                }
                // remove values from query
                this.query.values = undefined;
            }
            catch (ex) {
                this.onExceptionOccured(ex, { TableName: this.tableName });
            }
        }
        else {
            new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].TableNotExist, { TableName: this.tableName }).throw();
        }
    };
    Instance.prototype.onTransactionCompleted = function () {
        if (this.errorOccured === false) {
            this.onSuccess(this.query.return ? this._valuesAffected : this.rowAffected);
        }
    };
    Instance.prototype.onQueryFinished = function () {
        if (this.isTransaction === true) {
            this.onTransactionCompleted();
        }
    };
    Instance.prototype.insertData = function (values) {
        var _this = this;
        var valueIndex = 0, insertDataIntoTable;
        if (this.query.return) {
            insertDataIntoTable = function (value) {
                if (value) {
                    var addResult = objectStore.add(value);
                    addResult.onerror = _this.onErrorOccured.bind(_this);
                    addResult.onsuccess = function (e) {
                        _this._valuesAffected.push(value);
                        insertDataIntoTable.call(_this, values[valueIndex++]);
                    };
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            insertDataIntoTable = function (value) {
                if (value) {
                    var addResult = objectStore.add(value);
                    addResult.onerror = _this.onErrorOccured.bind(_this);
                    addResult.onsuccess = function (e) {
                        ++_this.rowAffected;
                        insertDataIntoTable.call(_this, values[valueIndex++]);
                    };
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        this.createTransaction([this.query.into], this.onTransactionCompleted);
        var objectStore = this.transaction.objectStore(this.query.into);
        insertDataIntoTable(values[valueIndex++]);
    };
    return Instance;
}(_base__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/business/insert/value_checker.ts":
/*!*******************************************************!*\
  !*** ./codes/worker/business/insert/value_checker.ts ***!
  \*******************************************************/
/*! exports provided: ValueChecker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueChecker", function() { return ValueChecker; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util */ "./codes/worker/util.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../log_helper */ "./codes/worker/log_helper.ts");



var ValueChecker = /** @class */ (function () {
    function ValueChecker(table, autoIncrementValue) {
        this.errorOccured = false;
        this.autoIncrementValue = {};
        this.table = table;
        this.autoIncrementValue = autoIncrementValue;
    }
    ValueChecker.prototype.checkAndModifyValue = function (value) {
        var _this = this;
        this.value = value;
        this.table.columns.every(function (column) {
            _this.checkAndModifyColumnValue_(column);
            return !_this.errorOccured;
        });
        return this.errorOccured;
    };
    ValueChecker.prototype.isNull_ = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_0__["Util"].isNull(value);
    };
    ValueChecker.prototype.getType_ = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_0__["Util"].getType(value);
    };
    ValueChecker.prototype.checkNotNullAndDataType_ = function (column) {
        // check not null schema
        if (column.notNull && this.isNull_(this.value[column.name])) {
            this.onValidationError_(_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].NullValue, { ColumnName: column.name });
        }
        else if (column.dataType && !this.isNull_(this.value[column.name]) &&
            this.getType_(this.value[column.name]) !== column.dataType) {
            this.onValidationError_(_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].BadDataType, { ColumnName: column.name });
        }
    };
    ValueChecker.prototype.checkAndModifyColumnValue_ = function (column) {
        // check auto increment scheme
        if (column.autoIncrement) {
            this.value[column.name] = ++this.autoIncrementValue[column.name];
        }
        else if (column.default && this.isNull_(this.value[column.name])) {
            this.value[column.name] = column.default;
        }
        this.checkNotNullAndDataType_(column);
    };
    ValueChecker.prototype.onValidationError_ = function (error, details) {
        this.errorOccured = true;
        this.error = new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](error, details);
    };
    return ValueChecker;
}());



/***/ }),

/***/ "./codes/worker/business/insert/values_checker.ts":
/*!********************************************************!*\
  !*** ./codes/worker/business/insert/values_checker.ts ***!
  \********************************************************/
/*! exports provided: ValuesChecker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValuesChecker", function() { return ValuesChecker; });
/* harmony import */ var _value_checker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./value_checker */ "./codes/worker/business/insert/value_checker.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../index */ "./codes/worker/index.ts");
/* harmony import */ var _keystore_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../keystore/index */ "./codes/worker/keystore/index.ts");



var ValuesChecker = /** @class */ (function () {
    function ValuesChecker(table, values) {
        this.table = table;
        this.values = values;
    }
    ValuesChecker.prototype.checkAndModifyValues = function (onFinish) {
        var _this = this;
        this.onFinish = onFinish;
        var autoIncColumns = this.table.columns.filter(function (col) {
            return col.autoIncrement;
        });
        var autoIncValues = {};
        autoIncColumns.forEach(function (column) {
            var autoIncrementKey = "JsStore_" + _index__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDb.name + "_" + _this.table.name + "_" + column.name + "_Value";
            _keystore_index__WEBPACK_IMPORTED_MODULE_2__["get"](autoIncrementKey, function (val) {
                autoIncValues[column.name] = val;
            });
        });
        _keystore_index__WEBPACK_IMPORTED_MODULE_2__["get"]('dumy_key', function (val) {
            _this.valueCheckerObj = new _value_checker__WEBPACK_IMPORTED_MODULE_0__["ValueChecker"](_this.table, autoIncValues);
            _this.startChecking();
        }, function (err) {
            _this.error = err;
            _this.onFinish(true);
        });
    };
    ValuesChecker.prototype.startChecking = function () {
        var _this = this;
        var isError = false;
        this.values.every(function (item) {
            isError = _this.valueCheckerObj.checkAndModifyValue(item);
            return !isError;
        });
        if (isError) {
            this.error = this.valueCheckerObj.error;
            this.onFinish(true);
        }
        else {
            for (var _i = 0, _a = Object.keys(this.valueCheckerObj.autoIncrementValue); _i < _a.length; _i++) {
                var prop = _a[_i];
                var autoIncrementKey = "JsStore_" + _index__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDb.name + "_" + this.table.name + "_" + prop + "_Value";
                _keystore_index__WEBPACK_IMPORTED_MODULE_2__["set"](autoIncrementKey, this.valueCheckerObj.autoIncrementValue[prop]);
            }
            _keystore_index__WEBPACK_IMPORTED_MODULE_2__["get"]('dumy_key', function (val) {
                _this.onFinish(false);
            }, function (err) {
                _this.error = err;
                _this.onFinish(true);
            });
        }
    };
    return ValuesChecker;
}());



/***/ }),

/***/ "./codes/worker/business/open_db.ts":
/*!******************************************!*\
  !*** ./codes/worker/business/open_db.ts ***!
  \******************************************/
/*! exports provided: OpenDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenDb", function() { return OpenDb; });
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/business/idb_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../log_helper */ "./codes/worker/log_helper.ts");



var OpenDb = /** @class */ (function () {
    function OpenDb(onSuccess, onError) {
        this.dbName_ = _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb.name;
        this.onSuccess_ = onSuccess;
        this.onError_ = onError;
    }
    Object.defineProperty(OpenDb.prototype, "dbStatus_", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpenDb.prototype, "dbConnection_", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbConnection;
        },
        set: function (value) {
            _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbConnection = value;
        },
        enumerable: true,
        configurable: true
    });
    OpenDb.prototype.updateDbStatus_ = function (status, err) {
        _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].updateDbStatus(status, err);
    };
    OpenDb.prototype.onDbDroppedByBrowser_ = function (deleteMetaData) {
        _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].callDbDroppedByBrowser(deleteMetaData);
    };
    OpenDb.prototype.execute = function () {
        var _this = this;
        if (this.dbName_.length > 0) {
            var dbRequest_1 = indexedDB.open(this.dbName_, _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDbVersion);
            dbRequest_1.onerror = function (event) {
                if (_this.onError_ != null) {
                    _this.onError_(event.target.error);
                }
            };
            dbRequest_1.onsuccess = function (event) {
                _this.dbStatus_.conStatus = _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Connected;
                _this.dbConnection_ = dbRequest_1.result;
                _this.dbConnection_.onclose = function (e) {
                    _this.onDbDroppedByBrowser_();
                    _this.updateDbStatus_(_enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed, _enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].ConnectionClosed);
                };
                _this.dbConnection_.onversionchange = function (e) {
                    if (e.newVersion === null) {
                        if (e.newVersion === null) {
                            e.target.close(); // Manually close our connection to the db
                            _this.onDbDroppedByBrowser_(true);
                            _this.updateDbStatus_(_enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed, _enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].ConnectionClosed);
                        }
                    }
                };
                _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbConnection.onerror = function (e) {
                    _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus.lastError = ("Error occured in connection :" + e.target.result);
                };
                _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbConnection.onabort = function (e) {
                    _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus = {
                        conStatus: _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed,
                        lastError: _enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].ConnectionAborted
                    };
                };
                if (_this.onSuccess_ != null) {
                    _this.onSuccess_();
                }
                _this.setPrimaryKey_();
            };
        }
        else {
            var error = new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].UndefinedDbName);
            error.throw();
        }
    };
    Object.defineProperty(OpenDb.prototype, "activeDb_", {
        get: function () {
            return _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb;
        },
        enumerable: true,
        configurable: true
    });
    OpenDb.prototype.setPrimaryKey_ = function () {
        this.activeDb_.tables.forEach(function (table, index) {
            table.columns.every(function (item) {
                _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb.tables[index].primaryKey = item.primaryKey ? item.name : "";
                return !item.primaryKey;
            });
        });
    };
    return OpenDb;
}());



/***/ }),

/***/ "./codes/worker/business/remove/base_remove.ts":
/*!*****************************************************!*\
  !*** ./codes/worker/business/remove/base_remove.ts ***!
  \*****************************************************/
/*! exports provided: BaseRemove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseRemove", function() { return BaseRemove; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ "./codes/worker/business/base.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BaseRemove = /** @class */ (function (_super) {
    __extends(BaseRemove, _super);
    function BaseRemove() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checkFlag = false;
        return _this;
    }
    BaseRemove.prototype.onQueryFinished = function () {
        // ff
    };
    return BaseRemove;
}(_base__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/business/remove/in.ts":
/*!********************************************!*\
  !*** ./codes/worker/business/remove/in.ts ***!
  \********************************************/
/*! exports provided: In */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "In", function() { return In; });
/* harmony import */ var _not_where__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_where */ "./codes/worker/business/remove/not_where.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var In = /** @class */ (function (_super) {
    __extends(In, _super);
    function In() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    In.prototype.executeInLogic = function (column, values) {
        var _this = this;
        var cursor, cursorRequest;
        if (this.checkFlag) {
            var _loop_1 = function (i, length_1) {
                if (!this_1.errorOccured) {
                    cursorRequest = this_1.objectStore.index(column).
                        openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            if (_this.whereCheckerInstance.check(cursor.value)) {
                                cursor.delete();
                                ++_this.rowAffected;
                            }
                            cursor.continue();
                        }
                        else if (i + 1 === length_1) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = this_1.onCursorError;
                }
            };
            var this_1 = this;
            for (var i = 0, length_1 = values.length; i < length_1; i++) {
                _loop_1(i, length_1);
            }
        }
        else {
            var _loop_2 = function (i, length_2) {
                if (!this_2.errorOccured) {
                    cursorRequest = this_2.objectStore.index(column).
                        openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            cursor.delete();
                            ++_this.rowAffected;
                            cursor.continue();
                        }
                        else if (i + 1 === length_2) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = this_2.onCursorError;
                }
            };
            var this_2 = this;
            for (var i = 0, length_2 = values.length; i < length_2; i++) {
                _loop_2(i, length_2);
            }
        }
    };
    return In;
}(_not_where__WEBPACK_IMPORTED_MODULE_0__["NotWhere"]));



/***/ }),

/***/ "./codes/worker/business/remove/index.ts":
/*!***********************************************!*\
  !*** ./codes/worker/business/remove/index.ts ***!
  \***********************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance */ "./codes/worker/business/remove/instance.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["Instance"]; });




/***/ }),

/***/ "./codes/worker/business/remove/instance.ts":
/*!**************************************************!*\
  !*** ./codes/worker/business/remove/instance.ts ***!
  \**************************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return Instance; });
/* harmony import */ var _where__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./where */ "./codes/worker/business/remove/where.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../idb_helper */ "./codes/worker/business/idb_helper.ts");
/* harmony import */ var _select_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../select/index */ "./codes/worker/business/select/index.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Instance = /** @class */ (function (_super) {
    __extends(Instance, _super);
    function Instance(query, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.query = query;
        _this.onSuccess = onSuccess;
        _this.onError = onError;
        return _this;
    }
    Instance.prototype.execute = function () {
        try {
            if (this.query.where !== undefined) {
                this.addGreatAndLessToNotOp();
                this.initTransaction_();
                if (Array.isArray(this.query.where)) {
                    this.processWhereArrayQry();
                }
                else {
                    this.processWhere_();
                }
            }
            else {
                this.initTransaction_();
                this.executeWhereUndefinedLogic();
            }
        }
        catch (ex) {
            this.errorOccured = true;
            this.onExceptionOccured(ex, { TableName: this.query.from });
        }
    };
    Instance.prototype.processWhereArrayQry = function () {
        var _this = this;
        var selectObject = new _select_index__WEBPACK_IMPORTED_MODULE_2__["Instance"](this.query, function (results) {
            var keyList = [];
            var pkey = _this.getPrimaryKey(_this.query.from);
            results.forEach(function (item) {
                keyList.push(item[pkey]);
            });
            results = null;
            _this.query.where = {};
            _this.query.where[pkey] = {};
            _this.query.where[pkey][_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].In] = keyList;
            _this.processWhere_();
        }, this.onError);
        selectObject.execute();
    };
    Instance.prototype.processWhere_ = function () {
        if (this.query.where.or) {
            this.processOrLogic();
        }
        this.goToWhereLogic();
    };
    Instance.prototype.initTransaction_ = function () {
        _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].createTransaction([this.query.from], this.onTransactionCompleted_);
        this.objectStore = _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].transaction.objectStore(this.query.from);
    };
    Instance.prototype.onTransactionCompleted_ = function () {
        if (this.errorOccured === false) {
            this.onSuccess(this.rowAffected);
        }
    };
    Instance.prototype.onQueryFinished = function () {
        if (this.isOr === true) {
            this.orQuerySuccess_();
        }
        else if (this.isTransaction === true) {
            this.onTransactionCompleted_();
        }
    };
    Instance.prototype.orQuerySuccess_ = function () {
        var key = this.getObjectFirstKey(this._orInfo.OrQuery);
        if (key != null) {
            var where = {};
            where[key] = this._orInfo.OrQuery[key];
            delete this._orInfo.OrQuery[key];
            this.query.where = where;
            this.goToWhereLogic();
        }
        else {
            this.isOr = true;
        }
    };
    Instance.prototype.processOrLogic = function () {
        this.isOr = true;
        this._orInfo = {
            OrQuery: this.query.where.Or
        };
        // free or memory
        delete this.query.where.Or;
    };
    return Instance;
}(_where__WEBPACK_IMPORTED_MODULE_0__["Where"]));



/***/ }),

/***/ "./codes/worker/business/remove/like.ts":
/*!**********************************************!*\
  !*** ./codes/worker/business/remove/like.ts ***!
  \**********************************************/
/*! exports provided: Like */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Like", function() { return Like; });
/* harmony import */ var _in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./in */ "./codes/worker/business/remove/in.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Like = /** @class */ (function (_super) {
    __extends(Like, _super);
    function Like() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Like.prototype.executeLikeLogic = function (column, value, symbol) {
        var _this = this;
        var cursor;
        this._compValue = value.toLowerCase();
        this._compValueLength = this._compValue.length;
        this._compSymbol = symbol;
        var cursorRequest = this.objectStore.index(column).openCursor();
        cursorRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        if (this.checkFlag) {
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key) &&
                        _this.whereCheckerInstance.check(cursor.value)) {
                        cursor.delete();
                        ++_this.rowAffected;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key)) {
                        cursor.delete();
                        ++_this.rowAffected;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    return Like;
}(_in__WEBPACK_IMPORTED_MODULE_0__["In"]));



/***/ }),

/***/ "./codes/worker/business/remove/not_where.ts":
/*!***************************************************!*\
  !*** ./codes/worker/business/remove/not_where.ts ***!
  \***************************************************/
/*! exports provided: NotWhere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotWhere", function() { return NotWhere; });
/* harmony import */ var _base_remove__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_remove */ "./codes/worker/business/remove/base_remove.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NotWhere = /** @class */ (function (_super) {
    __extends(NotWhere, _super);
    function NotWhere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotWhere.prototype.executeWhereUndefinedLogic = function () {
        var _this = this;
        var cursor;
        var cursorRequest = this.objectStore.openCursor();
        cursorRequest.onsuccess = function (e) {
            cursor = e.target.result;
            if (cursor) {
                cursor.delete();
                ++_this.rowAffected;
                cursor.continue();
            }
            else {
                _this.onQueryFinished();
            }
        };
        cursorRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
    };
    return NotWhere;
}(_base_remove__WEBPACK_IMPORTED_MODULE_0__["BaseRemove"]));



/***/ }),

/***/ "./codes/worker/business/remove/where.ts":
/*!***********************************************!*\
  !*** ./codes/worker/business/remove/where.ts ***!
  \***********************************************/
/*! exports provided: Where */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Where", function() { return Where; });
/* harmony import */ var _like__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./like */ "./codes/worker/business/remove/like.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Where = /** @class */ (function (_super) {
    __extends(Where, _super);
    function Where() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Where.prototype.executeWhereLogic = function (column, value, op) {
        var _this = this;
        var cursor, cursorRequest;
        value = op ? value[op] : value;
        cursorRequest = this.objectStore.index(column).openCursor(this.getKeyRange(value, op));
        if (this.checkFlag) {
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.whereCheckerInstance.check(cursor.value)) {
                        cursor.delete();
                        ++_this.rowAffected;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    cursor.delete();
                    ++_this.rowAffected;
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        cursorRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
    };
    return Where;
}(_like__WEBPACK_IMPORTED_MODULE_0__["Like"]));



/***/ }),

/***/ "./codes/worker/business/select/base_select.ts":
/*!*****************************************************!*\
  !*** ./codes/worker/business/select/base_select.ts ***!
  \*****************************************************/
/*! exports provided: BaseSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseSelect", function() { return BaseSelect; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ "./codes/worker/business/base.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var BaseSelect = /** @class */ (function (_super) {
    __extends(BaseSelect, _super);
    function BaseSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.results = [];
        _this.sorted = false;
        return _this;
    }
    BaseSelect.prototype.removeDuplicates = function () {
        var datas = this.results;
        // free results memory
        this.results = undefined;
        var key = this.getPrimaryKey(this.query.from);
        var lookupObject = {};
        for (var i in datas) {
            lookupObject[datas[i][key]] = datas[i];
        }
        // free datas memory
        datas = [];
        for (var i in lookupObject) {
            datas.push(lookupObject[i]);
        }
        this.results = datas;
    };
    BaseSelect.prototype.onQueryFinished = function () {
        // ff
    };
    return BaseSelect;
}(_base__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/business/select/group_by_helper.ts":
/*!*********************************************************!*\
  !*** ./codes/worker/business/select/group_by_helper.ts ***!
  \*********************************************************/
/*! exports provided: GroupByHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupByHelper", function() { return GroupByHelper; });
/* harmony import */ var _where__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./where */ "./codes/worker/business/select/where.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var GroupByHelper = /** @class */ (function (_super) {
    __extends(GroupByHelper, _super);
    function GroupByHelper() {
        return _super.call(this) || this;
    }
    GroupByHelper.prototype.processGroupBy = function () {
        var grpQry = this.query.GroupBy;
        var datas = this.results;
        var lookUpObj = {};
        // free results memory
        this.results = this.query.GroupBy = undefined;
        if (typeof grpQry === 'string') {
            for (var _i = 0, _a = Object.keys(datas); _i < _a.length; _i++) {
                var i = _a[_i];
                lookUpObj[datas[i][grpQry]] = datas[i];
            }
        }
        else {
            var objKey = void 0;
            for (var _b = 0, _c = Object.keys(datas); _b < _c.length; _b++) {
                var i = _c[_b];
                objKey = "";
                for (var _d = 0, _e = Object.keys(grpQry); _d < _e.length; _d++) {
                    var column = _e[_d];
                    objKey += datas[i][grpQry[column]];
                }
                lookUpObj[objKey] = datas[i];
            }
        }
        // free datas memory
        datas = [];
        for (var _f = 0, _g = Object.keys(lookUpObj); _f < _g.length; _f++) {
            var i = _g[_f];
            datas.push(lookUpObj[i]);
        }
        this.results = datas;
    };
    GroupByHelper.prototype.executeAggregateGroupBy = function () {
        var _this = this;
        var grpQry = this.query.GroupBy;
        var datas = this.results;
        var lookUpObj = {};
        // assign aggregate and free aggregate memory
        var aggregateQry = this.query.aggregate;
        this.query.aggregate = undefined;
        // free results memory
        this.results = undefined;
        var index;
        var objKey;
        var value;
        var aggrColumn;
        var calculateAggregate = function () {
            for (var _i = 0, _a = Object.keys(aggregateQry); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'Count':
                        var getCount = function () {
                            value = lookUpObj[objKey];
                            // get old value
                            value = value ? value["Count(" + aggrColumn + ")"] : 0;
                            // add with old value if data exist
                            value += datas[index][aggrColumn] ? 1 : 0;
                            return value;
                        };
                        if (typeof aggregateQry[prop] === 'string') {
                            aggrColumn = aggregateQry[prop];
                            datas[index]["Count(" + aggrColumn + ")"] = getCount();
                        }
                        else if (Array.isArray(aggregateQry[prop])) {
                            for (var item in aggregateQry[prop]) {
                                aggrColumn = aggregateQry[prop][item];
                                datas[index]["Count(" + aggrColumn + ")"] = getCount();
                            }
                        }
                        break;
                    case 'max':
                        var getMax = function () {
                            value = lookUpObj[objKey];
                            // get old value
                            value = value ? value["max(" + aggrColumn + ")"] : 0;
                            datas[index][aggrColumn] = datas[index][aggrColumn] ?
                                datas[index][aggrColumn] : 0;
                            // compare between old value and new value
                            return value > datas[index][aggrColumn] ? value : datas[index][aggrColumn];
                        };
                        if (typeof aggregateQry[prop] === 'string') {
                            aggrColumn = aggregateQry[prop];
                            datas[index]["max(" + aggrColumn + ")"] = getMax();
                        }
                        else if (Array.isArray(aggregateQry[prop])) {
                            for (var item in aggregateQry[prop]) {
                                aggrColumn = aggregateQry[prop][item];
                                datas[index]["max(" + aggrColumn + ")"] = getMax();
                            }
                        }
                        break;
                    case 'min':
                        var getMin = function () {
                            value = lookUpObj[objKey];
                            // get old value
                            value = value ? value["min(" + aggrColumn + ")"] : Infinity;
                            datas[index][aggrColumn] = datas[index][aggrColumn] ?
                                datas[index][aggrColumn] : Infinity;
                            // compare between old value and new value
                            return value < datas[index][aggrColumn] ? value : datas[index][aggrColumn];
                        };
                        if (typeof aggregateQry[prop] === 'string') {
                            aggrColumn = aggregateQry[prop];
                            datas[index]["min(" + aggrColumn + ")"] = getMin();
                        }
                        else if (Array.isArray(aggregateQry[prop])) {
                            for (var item in aggregateQry[prop]) {
                                aggrColumn = aggregateQry[prop][item];
                                datas[index]["min(" + aggrColumn + ")"] = getMin();
                            }
                        }
                        break;
                    case 'Sum':
                        var getSum = function () {
                            value = lookUpObj[objKey];
                            // get old value
                            value = value ? value["Sum(" + aggrColumn + ")"] : 0;
                            // add with old value if data exist
                            value += datas[index][aggrColumn] ? datas[index][aggrColumn] : 0;
                            return value;
                        };
                        if (typeof aggregateQry[prop] === 'string') {
                            aggrColumn = aggregateQry[prop];
                            datas[index]["Sum(" + aggrColumn + ")"] = getSum();
                        }
                        else if (_this.getType(aggregateQry[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].Array) {
                            for (var item in aggregateQry[prop]) {
                                aggrColumn = aggregateQry[prop][item];
                                datas[index]["Sum(" + aggrColumn + ")"] = getSum();
                            }
                        }
                        break;
                    case 'Avg':
                        var getAvg = function () {
                            value = lookUpObj[objKey];
                            // get old sum value
                            var sumOfColumn = value ? value["Sum(" + aggrColumn + ")"] : 0;
                            // add with old value if data exist
                            sumOfColumn += datas[index][aggrColumn] ? datas[index][aggrColumn] : 0;
                            datas[index]["Sum(" + aggrColumn + ")"] = sumOfColumn;
                            // get old count value
                            value = value ? value["Count(" + aggrColumn + ")"] : 0;
                            // add with old value if data exist
                            value += datas[index][aggrColumn] ? 1 : 0;
                            datas[index]["Count(" + aggrColumn + ")"] = value;
                        };
                        if (typeof aggregateQry[prop] === 'string') {
                            aggrColumn = aggregateQry[prop];
                            getAvg();
                        }
                        else if (_this.getType(aggregateQry[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].Array) {
                            for (var _b = 0, _c = Object.keys(aggregateQry[prop]); _b < _c.length; _b++) {
                                var item = _c[_b];
                                aggrColumn = aggregateQry[prop][item];
                                getAvg();
                            }
                        }
                        break;
                }
            }
        };
        if (this.getType(grpQry) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String) {
            for (index in datas) {
                objKey = datas[index][grpQry];
                calculateAggregate();
                lookUpObj[objKey] = datas[index];
            }
        }
        else {
            for (index in datas) {
                objKey = "";
                for (var column in grpQry) {
                    objKey += datas[index][grpQry[column]];
                }
                calculateAggregate();
                lookUpObj[objKey] = datas[index];
            }
        }
        // free datas memory
        datas = [];
        for (var i in lookUpObj) {
            datas.push(lookUpObj[i]);
        }
        // Checking for avg and if exist then fill the datas;
        if (aggregateQry.Avg) {
            if (this.getType(aggregateQry.Avg) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String) {
                for (index in datas) {
                    var sumForAvg = datas[index]["Sum(" + aggregateQry.Avg + ")"], countForAvg = datas[index]["Count(" + aggregateQry.Avg + ")"];
                    datas[index]["Avg(" + aggregateQry.Avg + ")"] = sumForAvg / countForAvg;
                    if (aggregateQry.Count !== aggregateQry.Avg) {
                        delete datas[index]["Count(" + aggregateQry.Avg + ")"];
                    }
                    if (aggregateQry.Sum !== aggregateQry.Avg) {
                        delete datas[index]["Sum(" + aggregateQry.Avg + ")"];
                    }
                }
            }
            else {
                var isCountTypeString = this.getType(aggregateQry.Count) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String;
                var isSumTypeString = this.getType(aggregateQry.Count) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String;
                for (index in datas) {
                    for (var column in aggregateQry.Avg) {
                        var avgColumn = aggregateQry.Avg[column], sum = datas[index]["Sum(" + avgColumn + ")"], count = datas[index]["Count(" + avgColumn + ")"];
                        datas[index]["Avg(" + avgColumn + ")"] = sum / count;
                        if (isCountTypeString) {
                            if (aggregateQry.Count !== avgColumn) {
                                delete datas[index]["Count(" + avgColumn + ")"];
                            }
                            else if (aggregateQry.Count.indexOf(avgColumn) === -1) {
                                delete datas[index]["Count(" + avgColumn + ")"];
                            }
                        }
                        if (isSumTypeString) {
                            if (aggregateQry.Sum !== avgColumn) {
                                delete datas[index]["Sum(" + avgColumn + ")"];
                            }
                            else if (aggregateQry.Sum.indexOf(avgColumn) === -1) {
                                delete datas[index]["Sum(" + avgColumn + ")"];
                            }
                        }
                    }
                }
            }
        }
        this.results = datas;
    };
    return GroupByHelper;
}(_where__WEBPACK_IMPORTED_MODULE_0__["Where"]));



/***/ }),

/***/ "./codes/worker/business/select/helper.ts":
/*!************************************************!*\
  !*** ./codes/worker/business/select/helper.ts ***!
  \************************************************/
/*! exports provided: Helper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Helper", function() { return Helper; });
/* harmony import */ var _group_by_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group_by_helper */ "./codes/worker/business/select/group_by_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Helper = /** @class */ (function (_super) {
    __extends(Helper, _super);
    function Helper() {
        return _super.call(this) || this;
    }
    Helper.prototype.processOrderBy = function () {
        var _this = this;
        var order = this.query.order;
        if (order && this.results.length > 0 && !this.sorted && order.by) {
            order.Type = order.Type ? order.Type.toLowerCase() : 'asc';
            var orderColumn_1 = order.by, sortNumberInAsc = function () {
                _this.results.sort(function (a, b) {
                    return a[orderColumn_1] - b[orderColumn_1];
                });
            }, sortNumberInDesc = function () {
                _this.results.sort(function (a, b) {
                    return b[orderColumn_1] - a[orderColumn_1];
                });
            }, sortAlphabetInAsc = function () {
                _this.results.sort(function (a, b) {
                    return a[orderColumn_1].toLowerCase().localeCompare(b[orderColumn_1].toLowerCase());
                });
            }, sortAlphabetInDesc = function () {
                _this.results.sort(function (a, b) {
                    return b[orderColumn_1].toLowerCase().localeCompare(a[orderColumn_1].toLowerCase());
                });
            };
            if (typeof this.results[0][orderColumn_1] === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String) {
                if (order.Type === 'asc') {
                    sortAlphabetInAsc();
                }
                else {
                    sortAlphabetInDesc();
                }
            }
            else if (typeof this.results[0][orderColumn_1] === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].Number) {
                if (order.Type === 'asc') {
                    sortNumberInAsc();
                }
                else {
                    sortNumberInDesc();
                }
            }
        }
    };
    Helper.prototype.processAggregateQry = function () {
        var datas = this.results, results = {};
        var columnToAggregate;
        // free results memory
        this.results = undefined;
        for (var prop in this.query.Aggregate) {
            switch (prop) {
                case 'count':
                    var getCount = function () {
                        var result = 0;
                        for (var i in datas) {
                            result += datas[i][columnToAggregate] ? 1 : 0;
                        }
                        return result;
                    };
                    if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String) {
                        columnToAggregate = this.query.Aggregate[prop];
                        results["count(" + columnToAggregate + ")"] = getCount();
                    }
                    else if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].Array) {
                        for (var key in this.query.Aggregate[prop]) {
                            columnToAggregate = this.query.Aggregate[prop][key];
                            results["count(" + columnToAggregate + ")"] = getCount();
                        }
                    }
                    break;
                case 'max':
                    var getMax = function () {
                        var result = 0;
                        for (var i in datas) {
                            result = result > datas[i][columnToAggregate] ?
                                result : datas[i][columnToAggregate];
                        }
                        return result;
                    };
                    if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String) {
                        columnToAggregate = this.query.Aggregate[prop];
                        results["max(" + columnToAggregate + ")"] = getMax();
                    }
                    else if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].Array) {
                        for (var key in this.query.Aggregate[prop]) {
                            columnToAggregate = this.query.Aggregate[prop][key];
                            results["max(" + columnToAggregate + ")"] = getMax();
                        }
                    }
                    break;
                case 'min':
                    var getMin = function () {
                        var result = Infinity, value = Infinity;
                        for (var i in datas) {
                            value = datas[i][columnToAggregate] ?
                                datas[i][columnToAggregate] : Infinity;
                            result = result < value ? result : value;
                        }
                        return result;
                    };
                    if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String) {
                        columnToAggregate = this.query.Aggregate[prop];
                        results["min(" + columnToAggregate + ")"] = getMin();
                    }
                    else if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].Array) {
                        for (var key in this.query.Aggregate[prop]) {
                            columnToAggregate = this.query.Aggregate[prop][key];
                            results["min(" + columnToAggregate + ")"] = getMin();
                        }
                    }
                    break;
                case 'sum':
                    var getSum = function () {
                        var result = 0;
                        for (var i in datas) {
                            result += datas[i][columnToAggregate];
                        }
                        return result;
                    };
                    if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String) {
                        columnToAggregate = this.query.Aggregate[prop];
                        results["sum(" + columnToAggregate + ")"] = getSum();
                    }
                    else if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].Array) {
                        for (var key in this.query.Aggregate[prop]) {
                            columnToAggregate = this.query.Aggregate[prop][key];
                            results["sum(" + columnToAggregate + ")"] = getSum();
                        }
                    }
                    break;
                case 'avg':
                    var getAvg = function () {
                        var result = 0;
                        for (var i in datas) {
                            result += datas[i][columnToAggregate];
                        }
                        return result / datas.length;
                    };
                    if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].String) {
                        columnToAggregate = this.query.Aggregate[prop];
                        results["avg(" + columnToAggregate + ")"] = getAvg();
                    }
                    else if (this.getType(this.query.Aggregate[prop]) === _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"].Array) {
                        for (var key in this.query.Aggregate[prop]) {
                            columnToAggregate = this.query.Aggregate[prop][key];
                            results["avg(" + columnToAggregate + ")"] = getAvg();
                        }
                    }
                    break;
            }
        }
        // add results to the first index of result
        for (var prop in results) {
            datas[0][prop] = results[prop];
        }
        this.results = datas;
    };
    return Helper;
}(_group_by_helper__WEBPACK_IMPORTED_MODULE_0__["GroupByHelper"]));



/***/ }),

/***/ "./codes/worker/business/select/in.ts":
/*!********************************************!*\
  !*** ./codes/worker/business/select/in.ts ***!
  \********************************************/
/*! exports provided: In */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "In", function() { return In; });
/* harmony import */ var _not_where__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_where */ "./codes/worker/business/select/not_where.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var In = /** @class */ (function (_super) {
    __extends(In, _super);
    function In() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    In.prototype.executeInLogic = function (column, values) {
        if (this.skipRecord && this.limitRecord) {
            this.executeSkipAndLimitForIn_(column, values);
        }
        else if (this.skipRecord) {
            this.executeSkipForIn_(column, values);
        }
        else if (this.limitRecord) {
            this.executeLimitForIn_(column, values);
        }
        else {
            this.executeSimpleForIn_(column, values);
        }
    };
    In.prototype.executeSkipAndLimitForIn_ = function (column, values) {
        var _this = this;
        var cursor, cursorRequest, skip = this.skipRecord;
        var columnStore = this.objectStore.index(column);
        var skipOrPush = function (value) {
            if (skip === 0) {
                _this.results.push(value);
            }
            else {
                --skip;
            }
        };
        var onCursorError = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        if (this.checkFlag) {
            var _loop_1 = function (i, length_1) {
                if (!this_1.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (_this.results.length !== _this.limitRecord && cursor) {
                            if (_this.whereCheckerInstance.check(cursor.value)) {
                                skipOrPush(cursor.value);
                            }
                            cursor.continue();
                        }
                        else if (i + 1 === length_1) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_1 = this;
            for (var i = 0, length_1 = values.length; i < length_1; i++) {
                _loop_1(i, length_1);
            }
        }
        else {
            var _loop_2 = function (i, length_2) {
                if (!this_2.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (_this.results.length !== _this.limitRecord && cursor) {
                            skipOrPush(cursor.value);
                            cursor.continue();
                        }
                        else if (i + 1 === length_2) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_2 = this;
            for (var i = 0, length_2 = values.length; i < length_2; i++) {
                _loop_2(i, length_2);
            }
        }
    };
    In.prototype.executeSkipForIn_ = function (column, values) {
        var _this = this;
        var cursor, skip = this.skipRecord, cursorRequest;
        var columnStore = this.objectStore.index(column);
        var skipOrPush = function (value) {
            if (skip === 0) {
                _this.results.push(value);
            }
            else {
                --skip;
            }
        };
        var onCursorError = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        if (this.checkFlag) {
            var _loop_3 = function (i, length_3) {
                if (!this_3.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            if (_this.whereCheckerInstance.check(cursor.value)) {
                                skipOrPush((cursor.value));
                            }
                            cursor.continue();
                        }
                        else if (i + 1 === length_3) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_3 = this;
            for (var i = 0, length_3 = values.length; i < length_3; i++) {
                _loop_3(i, length_3);
            }
        }
        else {
            var _loop_4 = function (i, length_4) {
                if (!this_4.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            skipOrPush((cursor.value));
                            cursor.continue();
                        }
                        else if (i + 1 === length_4) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_4 = this;
            for (var i = 0, length_4 = values.length; i < length_4; i++) {
                _loop_4(i, length_4);
            }
        }
    };
    In.prototype.executeLimitForIn_ = function (column, values) {
        var _this = this;
        var cursor, cursorRequest;
        var columnStore = this.objectStore.index(column);
        var onCursorError = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        if (this.checkFlag) {
            var _loop_5 = function (i, length_5) {
                if (!this_5.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor && _this.results.length !== _this.limitRecord) {
                            if (_this.whereCheckerInstance.check(cursor.value)) {
                                _this.results.push(cursor.value);
                            }
                            cursor.continue();
                        }
                        else if (i + 1 === length_5) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_5 = this;
            for (var i = 0, length_5 = values.length; i < length_5; i++) {
                _loop_5(i, length_5);
            }
        }
        else {
            var _loop_6 = function (i, length_6) {
                if (!this_6.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor && _this.results.length !== _this.limitRecord) {
                            _this.results.push(cursor.value);
                            cursor.continue();
                        }
                        else if (i + 1 === length_6) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_6 = this;
            for (var i = 0, length_6 = values.length; i < length_6; i++) {
                _loop_6(i, length_6);
            }
        }
    };
    In.prototype.executeSimpleForIn_ = function (column, values) {
        var _this = this;
        var cursor, cursorRequest;
        var columnStore = this.objectStore.index(column), onCursorError = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        if (this.checkFlag) {
            var _loop_7 = function (i, length_7) {
                if (!this_7.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            if (_this.whereCheckerInstance.check(cursor.value)) {
                                _this.results.push(cursor.value);
                            }
                            cursor.continue();
                        }
                        else if (i + 1 === length_7) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_7 = this;
            for (var i = 0, length_7 = values.length; i < length_7; i++) {
                _loop_7(i, length_7);
            }
        }
        else {
            var _loop_8 = function (i, length_8) {
                if (!this_8.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            _this.results.push(cursor.value);
                            cursor.continue();
                        }
                        else if (i + 1 === length_8) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_8 = this;
            for (var i = 0, length_8 = values.length; i < length_8; i++) {
                _loop_8(i, length_8);
            }
        }
    };
    return In;
}(_not_where__WEBPACK_IMPORTED_MODULE_0__["NotWhere"]));



/***/ }),

/***/ "./codes/worker/business/select/index.ts":
/*!***********************************************!*\
  !*** ./codes/worker/business/select/index.ts ***!
  \***********************************************/
/*! exports provided: Instance, Join */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance */ "./codes/worker/business/select/instance.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["Instance"]; });

/* harmony import */ var _join__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./join */ "./codes/worker/business/select/join.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Join", function() { return _join__WEBPACK_IMPORTED_MODULE_1__["Join"]; });





/***/ }),

/***/ "./codes/worker/business/select/instance.ts":
/*!**************************************************!*\
  !*** ./codes/worker/business/select/instance.ts ***!
  \**************************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return Instance; });
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../idb_helper */ "./codes/worker/business/idb_helper.ts");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./codes/worker/business/select/helper.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Instance = /** @class */ (function (_super) {
    __extends(Instance, _super);
    function Instance(query, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.onError = onError;
        _this.onSuccess = onSuccess;
        _this.query = query;
        _this.skipRecord = query.skip;
        _this.limitRecord = query.limit;
        _this.tableName = query.from;
        return _this;
    }
    Instance.prototype.execute = function () {
        if (this.isTableExist(this.tableName) === true) {
            try {
                if (this.query.where !== undefined) {
                    this.addGreatAndLessToNotOp();
                    this.initTransaction_();
                    if (Array.isArray(this.query.where)) {
                        this.processWhereArrayQry();
                    }
                    else {
                        this.processWhere_();
                    }
                }
                else {
                    this.initTransaction_();
                    this.executeWhereUndefinedLogic();
                }
            }
            catch (ex) {
                this.errorOccured = true;
                this.onExceptionOccured(ex, { TableName: this.query.from });
            }
        }
        else {
            this.errorOccured = true;
            this.onErrorOccured(new _log_helper__WEBPACK_IMPORTED_MODULE_2__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_3__["ERROR_TYPE"].TableNotExist, { TableName: this.query.from }), true);
        }
    };
    Instance.prototype.processWhereArrayQry = function () {
        var _this = this;
        this.isArrayQry = true;
        var wherequery = this.query.where, pKey = this.getPrimaryKey(this.query.from);
        var isFirstWhere = true, output = [], operation;
        var isItemExist = function (keyValue) {
            var isExist = false;
            output.every(function (item) {
                if (item[pKey] === keyValue) {
                    isExist = true;
                    return false;
                }
                return true;
            });
            return isExist;
        };
        var onSuccess = function () {
            if (operation === _enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].And) {
                var doAnd = function () {
                    var andResults = [];
                    _this.results.forEach(function (item) {
                        if (isItemExist(item[pKey])) {
                            andResults.push(item);
                        }
                    });
                    output = andResults;
                    andResults = null;
                };
                if (output.length > 0) {
                    doAnd();
                }
                else if (isFirstWhere === true) {
                    output = _this.results;
                }
                else {
                    doAnd();
                }
            }
            else {
                if (output.length > 0) {
                    _this.results = output.concat(_this.results);
                    _this.removeDuplicates();
                    output = _this.results;
                }
                else {
                    output = _this.results;
                }
            }
            if (wherequery.length > 0) {
                _this.results = [];
                processFirstQry();
            }
            else {
                _this.results = output;
            }
            isFirstWhere = false;
        };
        var processFirstQry = function () {
            _this.query.where = wherequery.shift();
            if (_this.query.where['or']) {
                if (Object.keys(_this.query.where).length === 1) {
                    operation = 'or';
                    _this.query.where = _this.query.where['or'];
                    _this.onWhereArrayQrySuccess = onSuccess;
                }
                else {
                    operation = 'and';
                    _this.onWhereArrayQrySuccess = onSuccess;
                }
            }
            else {
                operation = 'and';
                _this.onWhereArrayQrySuccess = onSuccess;
            }
            _this.processWhere_();
        };
        processFirstQry();
    };
    Instance.prototype.onQueryFinished = function () {
        if (this.isOr === true) {
            this.orQuerySuccess_();
        }
        else if (this.isArrayQry === true) {
            this.onWhereArrayQrySuccess();
        }
        else if (this.isTransaction === true) {
            this.onTransactionCompleted_();
        }
    };
    Instance.prototype.initTransaction_ = function () {
        _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].createTransaction([this.tableName], this.onTransactionCompleted_, _enums__WEBPACK_IMPORTED_MODULE_3__["Idb_Mode"].ReadOnly);
        this.objectStore = _idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].transaction.objectStore(this.tableName);
    };
    Instance.prototype.processWhere_ = function () {
        if (this.query.where.or) {
            this.processOrLogic_();
        }
        this.goToWhereLogic();
    };
    Instance.prototype.onTransactionCompleted_ = function () {
        if (this.errorOccured === false) {
            this.processOrderBy();
            if (this.query.distinct) {
                var groupBy = [];
                var result = this.results[0];
                for (var key in result) {
                    groupBy.push(key);
                }
                var primaryKey = this.getPrimaryKey(this.query.from), index = groupBy.indexOf(primaryKey);
                groupBy.splice(index, 1);
                this.query.groupBy = groupBy.length > 0 ? groupBy : null;
            }
            if (this.query.from) {
                if (this.query.aggregate) {
                    this.executeAggregateGroupBy();
                }
                else {
                    this.processGroupBy();
                }
            }
            else if (this.query.aggregate) {
                this.processAggregateQry();
            }
            this.onSuccess(this.results);
        }
    };
    Instance.prototype.orQueryFinish_ = function () {
        this.isOr = false;
        this.results = this.orInfo.results;
        // free or info memory
        this.orInfo = undefined;
        this.removeDuplicates();
        this.onQueryFinished();
    };
    Instance.prototype.orQuerySuccess_ = function () {
        this.orInfo.results = this.orInfo.results.concat(this.orInfo.results);
        if (!this.query.limit || (this.query.limit > this.orInfo.results.length)) {
            this.results = [];
            var key = this.getObjectFirstKey(this.orInfo.orQuery);
            if (key != null) {
                var where = {};
                where[key] = this.orInfo.orQuery[key];
                delete this.orInfo.orQuery[key];
                this.query.where = where;
                this.goToWhereLogic();
            }
            else {
                this.orQueryFinish_();
            }
        }
        else {
            this.orQueryFinish_();
        }
    };
    Instance.prototype.processOrLogic_ = function () {
        this.isOr = true;
        this.orInfo = {
            orQuery: this.query.where.or,
            results: []
        };
        // free or memory
        delete this.query.where.or;
    };
    return Instance;
}(_helper__WEBPACK_IMPORTED_MODULE_1__["Helper"]));



/***/ }),

/***/ "./codes/worker/business/select/join.ts":
/*!**********************************************!*\
  !*** ./codes/worker/business/select/join.ts ***!
  \**********************************************/
/*! exports provided: Join */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Join", function() { return Join; });
/* harmony import */ var _base_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_select */ "./codes/worker/business/select/base_select.ts");
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instance */ "./codes/worker/business/select/instance.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Join = /** @class */ (function (_super) {
    __extends(Join, _super);
    function Join(query, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.queryStack = [];
        _this.currentQueryStackIndex = 0;
        _this.onSuccess = onSuccess;
        _this.onError = onError;
        _this.query = query;
        var tableList = []; // used to open the multiple object store
        var convertQueryIntoStack = function (qry) {
            if (qry.table1 !== undefined) {
                qry.table2['JoinType'] = qry.join === undefined ? 'inner' : qry.join.toLowerCase();
                _this.queryStack.push(qry.table2);
                if (_this.queryStack.length % 2 === 0) {
                    _this.queryStack[_this.queryStack.length - 1].nextJoin = qry.nextJoin;
                }
                tableList.push(qry.table2.table);
                return convertQueryIntoStack(qry.table1);
            }
            else {
                _this.queryStack.push(qry);
                tableList.push(qry.table);
                return;
            }
        };
        convertQueryIntoStack(query.from);
        _this.queryStack.reverse();
        // get the data for first table
        if (!_this.errorOccured) {
            var selectObject = new _instance__WEBPACK_IMPORTED_MODULE_1__["Instance"]({
                from: _this.queryStack[0].table,
                where: _this.queryStack[0].where
            }, function (results) {
                var tableName = _this.queryStack[0].table;
                results.forEach(function (item, index) {
                    _this.results[index] = {};
                    _this.results[index][tableName] = item;
                });
                _this.startExecutionJoinLogic_();
            }, _this.onErrorOccured);
            selectObject.execute();
        }
        return _this;
    }
    Join.prototype.onTransactionCompleted_ = function (e) {
        if (this.onSuccess != null && (this.queryStack.length === this.currentQueryStackIndex + 1)) {
            if (this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Count]) {
                this.onSuccess(this.results.length);
            }
            else {
                if (this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Skip] && this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Limit]) {
                    this.results.splice(0, this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Skip]);
                    this.results.splice(this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Limit] - 1, this.results.length);
                }
                else if (this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Skip]) {
                    this.results.splice(0, this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Skip]);
                }
                else if (this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Limit]) {
                    this.results.splice(this.query[_enums__WEBPACK_IMPORTED_MODULE_2__["QUERY_OPTION"].Limit] - 1, this.results.length);
                }
                this.onSuccess(this.results);
            }
        }
    };
    Join.prototype.executeWhereJoinLogic_ = function (joinQuery, query) {
        var _this = this;
        var results = [], column = query.column, tmpresults = this.results, resultLength = tmpresults.length;
        var item, joinIndex = 0;
        // get the data from query table
        var selectObject = new _instance__WEBPACK_IMPORTED_MODULE_1__["Instance"]({
            from: query.table,
            order: query.order,
            where: query.where
        }, function (selectResults) {
            // perform join
            selectResults.forEach(function (value, index) {
                // search item through each global result
                for (var i = 0; i < resultLength; i++) {
                    item = tmpresults[i][joinQuery.table][joinQuery.column];
                    doJoin(item, value, i);
                }
            });
            _this.results = results;
            // check if further execution needed
            if (_this.queryStack.length > _this.currentQueryStackIndex + 1) {
                _this.startExecutionJoinLogic_();
            }
            else {
                _this.onTransactionCompleted_(null);
            }
        }, this.onErrorOccured);
        selectObject.execute();
        var doJoin = function (value1, value2, itemIndex) {
            results[joinIndex] = {};
            if (value1 === value2[query.column]) {
                results[joinIndex][query.table] = value2;
                // copy other relative data into current result
                for (var j = 0; j < _this.currentQueryStackIndex; j++) {
                    results[joinIndex][_this.queryStack[j].table] =
                        tmpresults[itemIndex][_this.queryStack[j].table];
                }
                ++joinIndex;
            }
            else if (query.joinType === 'left') {
                // left join
                results[joinIndex] = {};
                results[joinIndex][query.table] = null;
                // copy other relative data into current result
                for (var j = 0; j < _this.currentQueryStackIndex; j++) {
                    results[joinIndex][_this.queryStack[j].table] =
                        tmpresults[itemIndex][_this.queryStack[j].table];
                }
                ++joinIndex;
            }
        };
    };
    Join.prototype.executeRightJoin_ = function (joinQuery, query) {
        var _this = this;
        var joinresults = [], joinIndex = 0, column = query.column, tmpresults = this.results, resultLength = tmpresults.length, where = {};
        var itemIndex = 0;
        var onExecutionFinished = function () {
            _this.results = joinresults;
            // check if further execution needed
            if (_this.queryStack.length > _this.currentQueryStackIndex + 1) {
                _this.startExecutionJoinLogic_();
            }
            else {
                _this.onTransactionCompleted_(null);
            }
        };
        var doRightJoin = function (results) {
            var valueFound = false;
            results.forEach(function (item, index) {
                for (itemIndex = 0; itemIndex < resultLength; itemIndex++) {
                    if (item[query.column] ===
                        tmpresults[itemIndex][joinQuery.table][joinQuery.column]) {
                        valueFound = true;
                        break;
                    }
                }
                joinresults[index] = {};
                joinresults[index][query.table] = item;
                if (valueFound) {
                    valueFound = false;
                    for (var j = 0; j < this.currentQueryStackIndex; j++) {
                        joinresults[index][this.queryStack[j].table] =
                            tmpresults[itemIndex][this.queryStack[j].table];
                    }
                }
                else {
                    for (var j = 0; j < this.currentQueryStackIndex; j++) {
                        joinresults[index][this.queryStack[j].table] = null;
                    }
                }
            }, _this);
        };
        var executeLogic = function () {
            var selectObject = new _instance__WEBPACK_IMPORTED_MODULE_1__["Instance"]({
                from: query.table,
                order: query.order,
                where: query.where
            }, function (results) {
                doRightJoin(results);
                onExecutionFinished();
            }, _this.onErrorOccured);
            selectObject.execute();
        };
        executeLogic();
    };
    Join.prototype.executeWhereUndefinedLogicForJoin_ = function (joinQuery, query) {
        var _this = this;
        var joinresults = [], column = query.column, tmpresults = this.results, where = {}, 
        // Item,
        resultLength = tmpresults.length;
        var joinIndex = 0, itemIndex = 0;
        var onExecutionFinished = function () {
            _this.results = joinresults;
            // check if further execution needed
            if (_this.queryStack.length > _this.currentQueryStackIndex + 1) {
                _this.startExecutionJoinLogic_();
            }
            else {
                _this.onTransactionCompleted_(null);
            }
        };
        var doJoin = function (results) {
            if (results.length > 0) {
                results.forEach(function (value) {
                    joinresults[joinIndex] = {};
                    joinresults[joinIndex][query.table] = value;
                    // copy other relative data into current result
                    for (var k = 0; k < _this.currentQueryStackIndex; k++) {
                        joinresults[joinIndex][_this.queryStack[k].table] =
                            tmpresults[itemIndex][_this.queryStack[k].table];
                    }
                    ++joinIndex;
                });
            }
            else if (query.joinType === 'left') {
                // left join
                joinresults[joinIndex] = {};
                joinresults[joinIndex][query.table] = null;
                // copy other relative data into current result
                for (var j = 0; j < _this.currentQueryStackIndex; j++) {
                    joinresults[joinIndex][_this.queryStack[j].table] =
                        tmpresults[itemIndex][_this.queryStack[j].table];
                }
                ++joinIndex;
            }
        };
        var executeLogic = function () {
            if (itemIndex < resultLength) {
                if (!_this.errorOccured) {
                    where[query.column] = tmpresults[itemIndex][joinQuery.table][joinQuery.column];
                    var selectInstance = new _instance__WEBPACK_IMPORTED_MODULE_1__["Instance"]({
                        from: query.table,
                        order: query.order,
                        where: where
                    }, function (results) {
                        doJoin(results);
                        ++itemIndex;
                        executeLogic();
                    }, _this.onErrorOccured.bind(_this));
                    selectInstance.execute();
                }
            }
            else {
                onExecutionFinished();
            }
        };
        executeLogic();
    };
    Join.prototype.startExecutionJoinLogic_ = function () {
        var joinQuery;
        if (this.currentQueryStackIndex >= 1 && this.currentQueryStackIndex % 2 === 1) {
            joinQuery = {
                column: this.queryStack[this.currentQueryStackIndex].nextJoin.column,
                table: this.queryStack[this.currentQueryStackIndex].nextJoin.table
            };
            this.currentQueryStackIndex++;
        }
        else {
            joinQuery = this.queryStack[this.currentQueryStackIndex++];
        }
        var query = this.queryStack[this.currentQueryStackIndex];
        if (query.joinType === 'right') {
            this.executeRightJoin_(joinQuery, query);
        }
        else if (query.where) {
            this.executeWhereJoinLogic_(joinQuery, query);
        }
        else {
            this.executeWhereUndefinedLogicForJoin_(joinQuery, query);
        }
    };
    return Join;
}(_base_select__WEBPACK_IMPORTED_MODULE_0__["BaseSelect"]));



/***/ }),

/***/ "./codes/worker/business/select/like.ts":
/*!**********************************************!*\
  !*** ./codes/worker/business/select/like.ts ***!
  \**********************************************/
/*! exports provided: Like */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Like", function() { return Like; });
/* harmony import */ var _in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./in */ "./codes/worker/business/select/in.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Like = /** @class */ (function (_super) {
    __extends(Like, _super);
    function Like() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Like.prototype.executeLikeLogic_ = function (column, value, symbol) {
        this._compValue = value.toLowerCase();
        this._compValueLength = this._compValue.length;
        this._compSymbol = symbol;
        this.cursorOpenRequest = this.objectStore.index(column).openCursor();
        this.cursorOpenRequest.onerror = this.onCursorError;
        if (this.skipRecord && this.limitRecord) {
            this.executeSkipAndLimit_();
        }
        else if (this.skipRecord) {
            this.executeSkip_();
        }
        else if (this.limitRecord) {
            this.executeLimit_();
        }
        else {
            this.executeSimple_();
        }
    };
    Like.prototype.executeSkipAndLimit_ = function () {
        var _this = this;
        var cursor;
        var skipOrPush = function (value) {
            if (skip === 0) {
                _this.results.push(value);
            }
            else {
                --skip;
            }
        };
        var skip = this.skipRecord;
        if (this.checkFlag) {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (_this.results.length !== _this.limitRecord && cursor) {
                    if (_this.filterOnOccurence(cursor.key) &&
                        _this.whereCheckerInstance.check(cursor.value)) {
                        skipOrPush(cursor.value);
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (_this.results.length !== _this.limitRecord && cursor) {
                    if (_this.filterOnOccurence(cursor.key)) {
                        skipOrPush(cursor.value);
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    Like.prototype.executeSkip_ = function () {
        var _this = this;
        var cursor, skip = this.skipRecord;
        var skipOrPush = function (value) {
            if (skip === 0) {
                _this.results.push(value);
            }
            else {
                --skip;
            }
        };
        if (this.checkFlag) {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key) &&
                        _this.whereCheckerInstance.check(cursor.value)) {
                        skipOrPush((cursor.value));
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key)) {
                        skipOrPush((cursor.value));
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    Like.prototype.executeLimit_ = function () {
        var _this = this;
        var cursor;
        if (this.checkFlag) {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (_this.results.length !== _this.limitRecord && cursor) {
                    if (_this.filterOnOccurence(cursor.key) &&
                        _this.whereCheckerInstance.check(cursor.value)) {
                        _this.results.push(cursor.value);
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (_this.results.length !== _this.limitRecord && cursor) {
                    if (_this.filterOnOccurence(cursor.key)) {
                        _this.results.push(cursor.value);
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    Like.prototype.executeSimple_ = function () {
        var _this = this;
        var cursor;
        if (this.checkFlag) {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key) &&
                        _this.whereCheckerInstance.check(cursor.value)) {
                        _this.results.push(cursor.value);
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key)) {
                        _this.results.push(cursor.value);
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    return Like;
}(_in__WEBPACK_IMPORTED_MODULE_0__["In"]));



/***/ }),

/***/ "./codes/worker/business/select/not_where.ts":
/*!***************************************************!*\
  !*** ./codes/worker/business/select/not_where.ts ***!
  \***************************************************/
/*! exports provided: NotWhere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotWhere", function() { return NotWhere; });
/* harmony import */ var _base_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_select */ "./codes/worker/business/select/base_select.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var NotWhere = /** @class */ (function (_super) {
    __extends(NotWhere, _super);
    function NotWhere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotWhere.prototype.executeWhereUndefinedLogic = function () {
        if (this.query.order && this.query.order.by) {
            if (this.objectStore.indexNames.contains(this.query.order.by)) {
                var orderType = this.query.order.Type &&
                    this.query.order.Type.toLowerCase() === 'desc' ? 'prev' : 'next';
                this.sorted = true;
                this.cursorOpenRequest = this.objectStore.index(this.query.order.by).
                    openCursor(null, orderType);
            }
            else {
                var error = new _log_helper__WEBPACK_IMPORTED_MODULE_1__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_2__["ERROR_TYPE"].ColumnNotExist, { ColumnName: this.query.order.by });
                error.throw();
            }
        }
        else {
            this.cursorOpenRequest = this.objectStore.openCursor();
        }
        if (this.skipRecord && this.limitRecord) {
            this.executeSkipAndLimitForNoWhere_();
        }
        else if (this.skipRecord) {
            this.executeSkipForNoWhere_();
        }
        else if (this.limitRecord) {
            this.executeLimitForNotWhere_();
        }
        else {
            this.executeSimpleForNotWhere_();
        }
        this.cursorOpenRequest.onerror = function (e) {
            this._errorOccured = true;
            this.onErrorOccured(e);
        }.bind(this);
    };
    NotWhere.prototype.executeSkipAndLimitForNoWhere_ = function () {
        var _this = this;
        var recordSkipped = false, cursor;
        this.cursorOpenRequest.onsuccess = function (e) {
            cursor = e.target.result;
            if (cursor) {
                if (recordSkipped && _this.results.length !== _this.limitRecord) {
                    _this.results.push(cursor.value);
                    cursor.continue();
                }
                else {
                    recordSkipped = true;
                    cursor.advance(_this.skipRecord);
                }
            }
            else {
                _this.onQueryFinished();
            }
        };
    };
    NotWhere.prototype.executeSkipForNoWhere_ = function () {
        var _this = this;
        var recordSkipped = false, cursor;
        this.cursorOpenRequest.onsuccess = function (e) {
            cursor = e.target.result;
            if (cursor) {
                if (recordSkipped) {
                    _this.results.push(cursor.value);
                    cursor.continue();
                }
                else {
                    recordSkipped = true;
                    cursor.advance(_this.skipRecord);
                }
            }
            else {
                _this.onQueryFinished();
            }
        };
    };
    NotWhere.prototype.executeSimpleForNotWhere_ = function () {
        var cursor;
        this.cursorOpenRequest.onsuccess = function (e) {
            cursor = e.target.result;
            if (cursor) {
                this.results.push(cursor.value);
                cursor.continue();
            }
            else {
                this.onQueryFinished();
            }
        }.bind(this);
    };
    NotWhere.prototype.executeLimitForNotWhere_ = function () {
        var _this = this;
        var cursor;
        this.cursorOpenRequest.onsuccess = function (e) {
            cursor = e.target.result;
            if (cursor && _this.results.length !== _this.limitRecord) {
                _this.results.push(cursor.value);
                cursor.continue();
            }
            else {
                _this.onQueryFinished();
            }
        };
    };
    return NotWhere;
}(_base_select__WEBPACK_IMPORTED_MODULE_0__["BaseSelect"]));



/***/ }),

/***/ "./codes/worker/business/select/where.ts":
/*!***********************************************!*\
  !*** ./codes/worker/business/select/where.ts ***!
  \***********************************************/
/*! exports provided: Where */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Where", function() { return Where; });
/* harmony import */ var _like__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./like */ "./codes/worker/business/select/like.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Where = /** @class */ (function (_super) {
    __extends(Where, _super);
    function Where() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Where.prototype.executeSkipAndLimitForWhere_ = function () {
        var _this = this;
        var recordSkipped = false;
        var cursor;
        if (this.checkFlag) {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (recordSkipped && _this.results.length !== _this.limitRecord) {
                        if (_this.whereCheckerInstance.check(cursor.value)) {
                            _this.results.push(cursor.value);
                        }
                        cursor.continue();
                    }
                    else {
                        recordSkipped = true;
                        cursor.advance(_this.skipRecord);
                    }
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (recordSkipped && _this.results.length !== _this.limitRecord) {
                        _this.results.push(cursor.value);
                        cursor.continue();
                    }
                    else {
                        recordSkipped = true;
                        cursor.advance(_this.skipRecord);
                    }
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    Where.prototype.executeSkipForWhere_ = function () {
        var _this = this;
        var recordSkipped = false, cursor;
        if (this.checkFlag) {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (recordSkipped) {
                        if (_this.whereCheckerInstance.check(cursor.value)) {
                            _this.results.push(cursor.value);
                        }
                        cursor.continue();
                    }
                    else {
                        recordSkipped = true;
                        cursor.advance(_this.skipRecord);
                    }
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (recordSkipped) {
                        _this.results.push(cursor.value);
                        cursor.continue();
                    }
                    else {
                        recordSkipped = true;
                        cursor.advance(_this.skipRecord);
                    }
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    Where.prototype.executeLimitForWhere_ = function () {
        var _this = this;
        var cursor;
        if (this.checkFlag) {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor && _this.results.length !== _this.limitRecord &&
                    _this.whereCheckerInstance.check(cursor.value)) {
                    _this.results.push(cursor.value);
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor && _this.results.length !== _this.limitRecord) {
                    _this.results.push(cursor.value);
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    Where.prototype.executeSimpleForWhere_ = function () {
        var _this = this;
        var cursor;
        if (this.checkFlag) {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.whereCheckerInstance.check(cursor.value)) {
                        _this.results.push(cursor.value);
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            this.cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    _this.results.push(cursor.value);
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    Where.prototype.executeWhereLogic_ = function (column, value, op, dir) {
        var _this = this;
        value = op ? value[op] : value;
        this.cursorOpenRequest = this.objectStore.index(column).openCursor(this.getKeyRange(value, op), dir);
        this.cursorOpenRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        if (this.skipRecord && this.limitRecord) {
            this.executeSkipAndLimitForWhere_();
        }
        else if (this.skipRecord) {
            this.executeSkipForWhere_();
        }
        else if (this.limitRecord) {
            this.executeLimitForWhere_();
        }
        else {
            this.executeSimpleForWhere_();
        }
    };
    return Where;
}(_like__WEBPACK_IMPORTED_MODULE_0__["Like"]));



/***/ }),

/***/ "./codes/worker/business/update/base_update.ts":
/*!*****************************************************!*\
  !*** ./codes/worker/business/update/base_update.ts ***!
  \*****************************************************/
/*! exports provided: updateValue, BaseUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateValue", function() { return updateValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseUpdate", function() { return BaseUpdate; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base */ "./codes/worker/business/base.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../idb_helper */ "./codes/worker/business/idb_helper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var updateValue = function (suppliedValue, storedValue) {
    for (var key in suppliedValue) {
        if (typeof suppliedValue[key] !== 'object') {
            storedValue[key] = suppliedValue[key];
        }
        else {
            for (var op in suppliedValue[key]) {
                switch (op) {
                    case '+':
                        storedValue[key] += suppliedValue[key][op];
                        break;
                    case '-':
                        storedValue[key] -= suppliedValue[key][op];
                        break;
                    case '*':
                        storedValue[key] *= suppliedValue[key][op];
                        break;
                    case '/':
                        storedValue[key] /= suppliedValue[key][op];
                        break;
                    default: storedValue[key] = suppliedValue[key];
                }
                break;
            }
        }
    }
    return storedValue;
};
var BaseUpdate = /** @class */ (function (_super) {
    __extends(BaseUpdate, _super);
    function BaseUpdate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checkFlag = false;
        return _this;
    }
    BaseUpdate.prototype.initTransaction = function () {
        _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].createTransaction([this.query.in], this.onTransactionCompleted_);
        this.objectStore = _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].transaction.objectStore(this.query.in);
    };
    BaseUpdate.prototype.onQueryFinished = function () {
        if (this.isTransaction === true) {
            this.onTransactionCompleted_();
        }
    };
    BaseUpdate.prototype.onTransactionCompleted_ = function () {
        if (this.errorOccured === false) {
            this.onSuccess(this.rowAffected);
        }
    };
    return BaseUpdate;
}(_base__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/business/update/in.ts":
/*!********************************************!*\
  !*** ./codes/worker/business/update/in.ts ***!
  \********************************************/
/*! exports provided: In */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "In", function() { return In; });
/* harmony import */ var _not_where__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not_where */ "./codes/worker/business/update/not_where.ts");
/* harmony import */ var _base_update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base_update */ "./codes/worker/business/update/base_update.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var In = /** @class */ (function (_super) {
    __extends(In, _super);
    function In() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    In.prototype.executeInLogic = function (column, values) {
        var _this = this;
        var cursor;
        var columnStore = this.objectStore.index(column);
        var cursorRequest;
        var onCursorError = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        if (this.checkFlag) {
            var _loop_1 = function (i, length_1) {
                if (!this_1.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            if (_this.whereCheckerInstance.check(cursor.value)) {
                                cursor.update(Object(_base_update__WEBPACK_IMPORTED_MODULE_1__["updateValue"])(_this.query.Set, cursor.value));
                                ++_this.rowAffected;
                            }
                            cursor.continue();
                        }
                        else if (i + 1 === length_1) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_1 = this;
            for (var i = 0, length_1 = values.length; i < length_1; i++) {
                _loop_1(i, length_1);
            }
        }
        else {
            var _loop_2 = function (i, length_2) {
                if (!this_2.errorOccured) {
                    cursorRequest = columnStore.openCursor(IDBKeyRange.only(values[i]));
                    cursorRequest.onsuccess = function (e) {
                        cursor = e.target.result;
                        if (cursor) {
                            cursor.update(Object(_base_update__WEBPACK_IMPORTED_MODULE_1__["updateValue"])(_this.query.Set, cursor.value));
                            ++_this.rowAffected;
                            cursor.continue();
                        }
                        else if (i + 1 === length_2) {
                            _this.onQueryFinished();
                        }
                    };
                    cursorRequest.onerror = onCursorError;
                }
            };
            var this_2 = this;
            for (var i = 0, length_2 = values.length; i < length_2; i++) {
                _loop_2(i, length_2);
            }
        }
    };
    return In;
}(_not_where__WEBPACK_IMPORTED_MODULE_0__["NotWhere"]));



/***/ }),

/***/ "./codes/worker/business/update/index.ts":
/*!***********************************************!*\
  !*** ./codes/worker/business/update/index.ts ***!
  \***********************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance */ "./codes/worker/business/update/instance.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["Instance"]; });




/***/ }),

/***/ "./codes/worker/business/update/instance.ts":
/*!**************************************************!*\
  !*** ./codes/worker/business/update/instance.ts ***!
  \**************************************************/
/*! exports provided: Instance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Instance", function() { return Instance; });
/* harmony import */ var _where__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./where */ "./codes/worker/business/update/where.ts");
/* harmony import */ var _select_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../select/index */ "./codes/worker/business/select/index.ts");
/* harmony import */ var _schema_checker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schema_checker */ "./codes/worker/business/update/schema_checker.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Instance = /** @class */ (function (_super) {
    __extends(Instance, _super);
    function Instance(query, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.onSuccess = onSuccess;
        _this.onError = onError;
        _this.query = query;
        return _this;
    }
    Instance.prototype.execute = function () {
        try {
            this.error = new _schema_checker__WEBPACK_IMPORTED_MODULE_2__["SchemaChecker"](this.getTable(this.query.in)).
                check(this.query.set, this.query.in);
            if (!this.error) {
                if (this.query.where !== undefined) {
                    this.addGreatAndLessToNotOp();
                    if (this.query.where.or || Array.isArray(this.query.where)) {
                        this.executeComplexLogic_();
                    }
                    else {
                        this.initTransaction();
                        this.goToWhereLogic();
                    }
                }
                else {
                    this.initTransaction();
                    this.executeWhereUndefinedLogic();
                }
            }
            else {
                this.errorOccured = true;
                this.onErrorOccured(this.error, true);
            }
        }
        catch (ex) {
            this.errorOccured = true;
            this.onExceptionOccured.call(this, ex, { TableName: this.query.in });
        }
    };
    Instance.prototype.executeComplexLogic_ = function () {
        var _this = this;
        var selectObject = new _select_index__WEBPACK_IMPORTED_MODULE_1__["Instance"]({
            from: this.query.in,
            where: this.query.where
        }, function (results) {
            var key = _this.getPrimaryKey(_this.query.in), inQuery = [], whereQry = {};
            results.forEach(function (value) {
                inQuery.push(value[key]);
            });
            results = null;
            whereQry[key] = (_a = {}, _a[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].In] = inQuery, _a);
            _this.query[_enums__WEBPACK_IMPORTED_MODULE_3__["QUERY_OPTION"].Where] = whereQry;
            _this.initTransaction();
            _this.goToWhereLogic();
            var _a;
        }, this.onError);
        selectObject.execute();
    };
    return Instance;
}(_where__WEBPACK_IMPORTED_MODULE_0__["Where"]));



/***/ }),

/***/ "./codes/worker/business/update/like.ts":
/*!**********************************************!*\
  !*** ./codes/worker/business/update/like.ts ***!
  \**********************************************/
/*! exports provided: Like */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Like", function() { return Like; });
/* harmony import */ var _in__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./in */ "./codes/worker/business/update/in.ts");
/* harmony import */ var _base_update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base_update */ "./codes/worker/business/update/base_update.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Like = /** @class */ (function (_super) {
    __extends(Like, _super);
    function Like() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Like.prototype.executeLikeLogic = function (column, value, symbol) {
        var _this = this;
        var cursor;
        this.compValue = value.toLowerCase();
        this.compValueLength = this.compValue.length;
        this.compSymbol = symbol;
        var cursorOpenRequest = this.objectStore.index(column).openCursor();
        cursorOpenRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
        if (this.checkFlag) {
            cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key) &&
                        _this.whereCheckerInstance.check(cursor.value)) {
                        cursor.update(Object(_base_update__WEBPACK_IMPORTED_MODULE_1__["updateValue"])(_this.query.Set, cursor.value));
                        ++_this.rowAffected;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            cursorOpenRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.filterOnOccurence(cursor.key)) {
                        cursor.update(Object(_base_update__WEBPACK_IMPORTED_MODULE_1__["updateValue"])(_this.query.Set, cursor.value));
                        ++_this.rowAffected;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
    };
    return Like;
}(_in__WEBPACK_IMPORTED_MODULE_0__["In"]));



/***/ }),

/***/ "./codes/worker/business/update/not_where.ts":
/*!***************************************************!*\
  !*** ./codes/worker/business/update/not_where.ts ***!
  \***************************************************/
/*! exports provided: NotWhere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotWhere", function() { return NotWhere; });
/* harmony import */ var _base_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_update */ "./codes/worker/business/update/base_update.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NotWhere = /** @class */ (function (_super) {
    __extends(NotWhere, _super);
    function NotWhere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotWhere.prototype.executeWhereUndefinedLogic = function () {
        var _this = this;
        var cursor;
        var cursorRequest = this.objectStore.openCursor();
        cursorRequest.onsuccess = function (e) {
            cursor = e.target.result;
            if (cursor) {
                cursor.update(Object(_base_update__WEBPACK_IMPORTED_MODULE_0__["updateValue"])(_this.query.Set, cursor.value));
                ++_this.rowAffected;
                cursor.continue();
            }
            else {
                _this.onQueryFinished();
            }
        };
        cursorRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
    };
    return NotWhere;
}(_base_update__WEBPACK_IMPORTED_MODULE_0__["BaseUpdate"]));



/***/ }),

/***/ "./codes/worker/business/update/schema_checker.ts":
/*!********************************************************!*\
  !*** ./codes/worker/business/update/schema_checker.ts ***!
  \********************************************************/
/*! exports provided: SchemaChecker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchemaChecker", function() { return SchemaChecker; });
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enums */ "./codes/worker/enums.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./codes/worker/util.ts");



var SchemaChecker = /** @class */ (function () {
    function SchemaChecker(table) {
        this.table = table;
    }
    SchemaChecker.prototype.check = function (setValue, tblName) {
        var error = null;
        if (typeof setValue === 'object') {
            if (this.table) {
                // loop through table column and find data is valid
                this.table.columns.every(function (column) {
                    if (error === null) {
                        if (column.name in setValue) {
                            error = this.checkByColumn(column, setValue[column.name]);
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                }, this);
            }
            else {
                error = new _log_helper__WEBPACK_IMPORTED_MODULE_0__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].TableNotExist, { TableName: tblName });
            }
        }
        else {
            error = new _log_helper__WEBPACK_IMPORTED_MODULE_0__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].NotObject);
        }
        return error;
    };
    SchemaChecker.prototype.isNull_ = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_2__["Util"].isNull(value);
    };
    SchemaChecker.prototype.getType_ = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_2__["Util"].getType(value);
    };
    SchemaChecker.prototype.checkByColumn = function (column, value) {
        var error = null;
        // check not null schema
        if (column._notNull && this.isNull_(value)) {
            error = new _log_helper__WEBPACK_IMPORTED_MODULE_0__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].NullValue, { ColumnName: column.name });
        }
        // check datatype
        var type = this.getType_(value);
        if (column._dataType) {
            if (type !== column._dataType && type !== 'object') {
                error = new _log_helper__WEBPACK_IMPORTED_MODULE_0__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].BadDataType, { ColumnName: column.name });
            }
        }
        // check allowed operators
        if (type === 'object') {
            var allowedOp = ['+', '-', '*', '/'];
            for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
                var prop = _a[_i];
                if (allowedOp.indexOf(prop) < 0 && column._dataType && type !== column._dataType) {
                    error = new _log_helper__WEBPACK_IMPORTED_MODULE_0__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].BadDataType, { ColumnName: column.name });
                }
                break;
            }
        }
        return error;
    };
    return SchemaChecker;
}());



/***/ }),

/***/ "./codes/worker/business/update/where.ts":
/*!***********************************************!*\
  !*** ./codes/worker/business/update/where.ts ***!
  \***********************************************/
/*! exports provided: Where */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Where", function() { return Where; });
/* harmony import */ var _base_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_update */ "./codes/worker/business/update/base_update.ts");
/* harmony import */ var _like__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./like */ "./codes/worker/business/update/like.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Where = /** @class */ (function (_super) {
    __extends(Where, _super);
    function Where() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Where.prototype.executeWhereLogic_ = function (column, value, op) {
        var _this = this;
        var cursor, cursorRequest;
        value = op ? value[op] : value;
        cursorRequest = this.objectStore.index(column).openCursor(this.getKeyRange(value, op));
        if (this.checkFlag) {
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    if (_this.whereCheckerInstance.check(cursor.value)) {
                        cursor.update(Object(_base_update__WEBPACK_IMPORTED_MODULE_0__["updateValue"])(_this.query.Set, cursor.value));
                        ++_this.rowAffected;
                    }
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        else {
            cursorRequest.onsuccess = function (e) {
                cursor = e.target.result;
                if (cursor) {
                    cursor.update(Object(_base_update__WEBPACK_IMPORTED_MODULE_0__["updateValue"])(_this.query.Set, cursor.value));
                    ++_this.rowAffected;
                    cursor.continue();
                }
                else {
                    _this.onQueryFinished();
                }
            };
        }
        cursorRequest.onerror = function (e) {
            _this.errorOccured = true;
            _this.onErrorOccured(e);
        };
    };
    return Where;
}(_like__WEBPACK_IMPORTED_MODULE_1__["Like"]));



/***/ }),

/***/ "./codes/worker/business/where_checker.ts":
/*!************************************************!*\
  !*** ./codes/worker/business/where_checker.ts ***!
  \************************************************/
/*! exports provided: WhereChecker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhereChecker", function() { return WhereChecker; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");

/**
 * For matching the different column value existance for where option
 *
 * @export
 * @class WhereChecker
 */
var WhereChecker = /** @class */ (function () {
    function WhereChecker(where) {
        this.where = where;
    }
    WhereChecker.prototype.check = function (rowValue) {
        this.status = true;
        var columnValue;
        for (var columnName in this.where) {
            if (this.status) {
                columnValue = this.where[columnName];
                if (typeof columnValue === 'object') {
                    for (var key in columnValue) {
                        if (this.status) {
                            switch (key) {
                                case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].In:
                                    this.checkIn(columnName, rowValue[columnName]);
                                    break;
                                case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].Like:
                                    this.checkLike(columnName, rowValue[columnName]);
                                    break;
                                case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].Between:
                                case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].GreaterThan:
                                case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].LessThan:
                                case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].GreaterThanEqualTo:
                                case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].LessThanEqualTo:
                                case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].NotEqualTo:
                                    this.checkComparisionOp(columnName, rowValue[columnName], key);
                                    break;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
                else {
                    if (columnValue !== rowValue[columnName]) {
                        this.status = false;
                        break;
                    }
                }
            }
            else {
                break;
            }
        }
        return this.status;
    };
    WhereChecker.prototype.checkIn = function (column, value) {
        for (var i = 0, values = this.where[column][_enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].In], length_1 = values.length; i < length_1; i++) {
            if (values[i] === value) {
                this.status = true;
                break;
            }
            else {
                this.status = false;
            }
        }
    };
    WhereChecker.prototype.checkLike = function (column, value) {
        var values = this.where[column][_enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].Like].split('%');
        var compSymbol, compValue, symbolIndex;
        if (values[1]) {
            compValue = values[1];
            compSymbol = values.length > 2 ? _enums__WEBPACK_IMPORTED_MODULE_0__["OCCURENCE"].Any : _enums__WEBPACK_IMPORTED_MODULE_0__["OCCURENCE"].Last;
        }
        else {
            compValue = values[0];
            compSymbol = _enums__WEBPACK_IMPORTED_MODULE_0__["OCCURENCE"].First;
        }
        value = value.toLowerCase();
        switch (compSymbol) {
            case _enums__WEBPACK_IMPORTED_MODULE_0__["OCCURENCE"].Any:
                symbolIndex = value.indexOf(compValue.toLowerCase());
                if (symbolIndex < 0) {
                    this.status = false;
                }
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["OCCURENCE"].First:
                symbolIndex = value.indexOf(compValue.toLowerCase());
                if (symbolIndex > 0 || symbolIndex < 0) {
                    this.status = false;
                }
                break;
            default:
                symbolIndex = value.lastIndexOf(compValue.toLowerCase());
                if (symbolIndex < value.length - compValue.length) {
                    this.status = false;
                }
        }
    };
    WhereChecker.prototype.checkComparisionOp = function (column, value, symbol) {
        var compareValue = this.where[column][symbol];
        switch (symbol) {
            // greater than
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].GreaterThan:
                if (value <= compareValue) {
                    this.status = false;
                }
                break;
            // less than
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].LessThan:
                if (value >= compareValue) {
                    this.status = false;
                }
                break;
            // less than equal
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].LessThanEqualTo:
                if (value > compareValue) {
                    this.status = false;
                }
                break;
            // greather than equal
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].GreaterThanEqualTo:
                if (value < compareValue) {
                    this.status = false;
                }
                break;
            // between
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].Between:
                if (value < compareValue.Low || value > compareValue.High) {
                    this.status = false;
                }
                break;
            // Not equal to
            case _enums__WEBPACK_IMPORTED_MODULE_0__["QUERY_OPTION"].NotEqualTo:
                if (value === compareValue) {
                    this.status = false;
                }
                break;
        }
    };
    return WhereChecker;
}());



/***/ }),

/***/ "./codes/worker/config.ts":
/*!********************************!*\
  !*** ./codes/worker/config.ts ***!
  \********************************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config._isLogEnabled = false;
    return Config;
}());



/***/ }),

/***/ "./codes/worker/enums.ts":
/*!*******************************!*\
  !*** ./codes/worker/enums.ts ***!
  \*******************************/
/*! exports provided: OCCURENCE, WEBWORKER_STATUS, CONNECTION_STATUS, DATA_TYPE, ERROR_TYPE, QUERY_OPTION, Idb_Mode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OCCURENCE", function() { return OCCURENCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEBWORKER_STATUS", function() { return WEBWORKER_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONNECTION_STATUS", function() { return CONNECTION_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_TYPE", function() { return DATA_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR_TYPE", function() { return ERROR_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERY_OPTION", function() { return QUERY_OPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Idb_Mode", function() { return Idb_Mode; });
var OCCURENCE;
(function (OCCURENCE) {
    OCCURENCE["First"] = "f";
    OCCURENCE["Last"] = "l";
    OCCURENCE["Any"] = "a";
})(OCCURENCE || (OCCURENCE = {}));
var WEBWORKER_STATUS;
(function (WEBWORKER_STATUS) {
    WEBWORKER_STATUS["Registered"] = "registerd";
    WEBWORKER_STATUS["Failed"] = "failed";
    WEBWORKER_STATUS["NotStarted"] = "not_started";
})(WEBWORKER_STATUS || (WEBWORKER_STATUS = {}));
var CONNECTION_STATUS;
(function (CONNECTION_STATUS) {
    CONNECTION_STATUS["Connected"] = "connected";
    CONNECTION_STATUS["Closed"] = "closed";
    CONNECTION_STATUS["NotStarted"] = "not_started";
    CONNECTION_STATUS["UnableToStart"] = "unable_to_start";
    CONNECTION_STATUS["ClosedByJsStore"] = "closed_by_jsstore";
})(CONNECTION_STATUS || (CONNECTION_STATUS = {}));
var DATA_TYPE;
(function (DATA_TYPE) {
    DATA_TYPE["String"] = "string";
    DATA_TYPE["Object"] = "object";
    DATA_TYPE["Array"] = "array";
    DATA_TYPE["Number"] = "number";
    DATA_TYPE["Boolean"] = "boolean";
    DATA_TYPE["Null"] = "null";
})(DATA_TYPE || (DATA_TYPE = {}));
var ERROR_TYPE;
(function (ERROR_TYPE) {
    ERROR_TYPE["UndefinedColumn"] = "undefined_column";
    ERROR_TYPE["UndefinedValue"] = "undefined_value";
    ERROR_TYPE["UndefinedColumnName"] = "undefined_column_name";
    ERROR_TYPE["UndefinedDbName"] = "undefined_database_name";
    ERROR_TYPE["UndefinedColumnValue"] = "undefined_column_value";
    ERROR_TYPE["NotArray"] = "not_array";
    ERROR_TYPE["NoValueSupplied"] = "no_value_supplied";
    ERROR_TYPE["ColumnNotExist"] = "column_not_exist";
    ERROR_TYPE["EnableSearchOff"] = "enable_search_off";
    ERROR_TYPE["InvalidOp"] = "invalid_operator";
    ERROR_TYPE["NullValue"] = "null_value";
    ERROR_TYPE["BadDataType"] = "bad_data_type";
    ERROR_TYPE["NextJoinNotExist"] = "next_join_not_exist";
    ERROR_TYPE["TableNotExist"] = "table_not_exist";
    ERROR_TYPE["DbNotExist"] = "db_not_exist";
    ERROR_TYPE["ConnectionAborted"] = "connection_aborted";
    ERROR_TYPE["ConnectionClosed"] = "connection_closed";
    ERROR_TYPE["NotObject"] = "not_object";
    ERROR_TYPE["InvalidConfig"] = "invalid_config";
    ERROR_TYPE["DbBlocked"] = "Db_blocked";
    ERROR_TYPE["IndexedDbUndefined"] = "indexeddb_undefined";
    ERROR_TYPE["IndexedDbBlocked"] = "indexeddb_blocked";
})(ERROR_TYPE || (ERROR_TYPE = {}));
var QUERY_OPTION;
(function (QUERY_OPTION) {
    QUERY_OPTION["Where"] = "where";
    QUERY_OPTION["Like"] = "like";
    QUERY_OPTION["In"] = "in";
    QUERY_OPTION["Between"] = "-";
    QUERY_OPTION["GreaterThan"] = ">";
    QUERY_OPTION["LessThan"] = "<";
    QUERY_OPTION["GreaterThanEqualTo"] = ">=";
    QUERY_OPTION["LessThanEqualTo"] = "<=";
    QUERY_OPTION["NotEqualTo"] = "!=";
    QUERY_OPTION["Aggregate"] = "aggregate";
    QUERY_OPTION["Or"] = "or";
    QUERY_OPTION["Count"] = "count";
    QUERY_OPTION["Skip"] = "skip";
    QUERY_OPTION["Limit"] = "limit";
    QUERY_OPTION["And"] = "and";
})(QUERY_OPTION || (QUERY_OPTION = {}));
var Idb_Mode;
(function (Idb_Mode) {
    Idb_Mode["ReadOnly"] = "readonly";
    Idb_Mode["ReadWrite"] = "readwrite";
})(Idb_Mode || (Idb_Mode = {}));


/***/ }),

/***/ "./codes/worker/index.ts":
/*!*******************************!*\
  !*** ./codes/worker/index.ts ***!
  \*******************************/
/*! exports provided: IdbHelper, OCCURENCE, WEBWORKER_STATUS, CONNECTION_STATUS, DATA_TYPE, ERROR_TYPE, QUERY_OPTION, Idb_Mode, registerEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./business/idb_helper */ "./codes/worker/business/idb_helper.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IdbHelper", function() { return _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"]; });

/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums */ "./codes/worker/enums.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OCCURENCE", function() { return _enums__WEBPACK_IMPORTED_MODULE_1__["OCCURENCE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WEBWORKER_STATUS", function() { return _enums__WEBPACK_IMPORTED_MODULE_1__["WEBWORKER_STATUS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONNECTION_STATUS", function() { return _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DATA_TYPE", function() { return _enums__WEBPACK_IMPORTED_MODULE_1__["DATA_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ERROR_TYPE", function() { return _enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERY_OPTION", function() { return _enums__WEBPACK_IMPORTED_MODULE_1__["QUERY_OPTION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Idb_Mode", function() { return _enums__WEBPACK_IMPORTED_MODULE_1__["Idb_Mode"]; });

/* harmony import */ var _start__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./start */ "./codes/worker/start.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerEvents", function() { return _start__WEBPACK_IMPORTED_MODULE_2__["registerEvents"]; });






/***/ }),

/***/ "./codes/worker/keystore/business/base_logic.ts":
/*!******************************************************!*\
  !*** ./codes/worker/keystore/business/base_logic.ts ***!
  \******************************************************/
/*! exports provided: Base */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return Base; });
var Base = /** @class */ (function () {
    function Base() {
        this.results = null;
        this.errorOccured = false;
        this.errorCount = 0;
    }
    Base.prototype.onErrorOccured = function (e) {
        ++this.errorCount;
        if (this.errorCount === 1) {
            if (this.onError != null) {
                this.onError(e.target.error);
            }
        }
        console.error(e);
    };
    return Base;
}());



/***/ }),

/***/ "./codes/worker/keystore/business/get_logic.ts":
/*!*****************************************************!*\
  !*** ./codes/worker/keystore/business/get_logic.ts ***!
  \*****************************************************/
/*! exports provided: Get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Get", function() { return Get; });
/* harmony import */ var _base_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_logic */ "./codes/worker/keystore/business/base_logic.ts");
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../query_executor */ "./codes/worker/keystore/query_executor.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/keystore/business/idb_helper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Get = /** @class */ (function (_super) {
    __extends(Get, _super);
    function Get(key, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.onSuccess = onSuccess;
        _this.onError = onError;
        return _this;
    }
    Get.prototype.execute = function () {
        var _this = this;
        var getData = function (column, value) {
            var cursorRequest = _this.objectStore.index(column).openCursor(IDBKeyRange.only(value));
            cursorRequest.onerror = function (e) {
                _this.errorOccured = true;
                _this.onErrorOccured(e);
            };
            cursorRequest.onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    _this.results = cursor.value['Value'];
                }
            };
        };
        this.initTransaction_();
        getData(_query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].columnName, this.key);
    };
    Get.prototype.initTransaction_ = function () {
        _idb_helper__WEBPACK_IMPORTED_MODULE_2__["IdbHelper"].createTransaction([_query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].tableName], this.onTransactionCompleted_, 'readonly');
        this.objectStore = _idb_helper__WEBPACK_IMPORTED_MODULE_2__["IdbHelper"]._transaction.objectStore(_query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].tableName);
    };
    Get.prototype.onTransactionCompleted_ = function () {
        if (this.errorOccured === false) {
            this.onSuccess(this.results);
        }
    };
    return Get;
}(_base_logic__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/keystore/business/idb_helper.ts":
/*!******************************************************!*\
  !*** ./codes/worker/keystore/business/idb_helper.ts ***!
  \******************************************************/
/*! exports provided: IdbHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdbHelper", function() { return IdbHelper; });
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../query_executor */ "./codes/worker/keystore/query_executor.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums */ "./codes/worker/keystore/enums.ts");


var IdbHelper = /** @class */ (function () {
    function IdbHelper() {
    }
    IdbHelper.callDbDroppedByBrowser = function () {
        this._isDbDeletedByBrowser = _query_executor__WEBPACK_IMPORTED_MODULE_0__["QueryExecutor"].dbStatus.conStatus === _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Connected ? true : false;
    };
    IdbHelper.createTransaction = function (tableNames, callBack, mode) {
        var _this = this;
        if (this._transaction === null) {
            mode = mode ? mode : "readwrite";
            this._transaction = this._dbConnection.transaction(tableNames, mode);
            this._transaction.oncomplete = function () {
                _this._transaction = null;
                callBack();
            };
            this._transaction.ontimeout = function () {
                this._transaction = null;
                console.error('transaction timed out');
            };
        }
    };
    IdbHelper._transaction = null;
    return IdbHelper;
}());



/***/ }),

/***/ "./codes/worker/keystore/business/init_db_logic.ts":
/*!*********************************************************!*\
  !*** ./codes/worker/keystore/business/init_db_logic.ts ***!
  \*********************************************************/
/*! exports provided: tempDatas, InitDb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tempDatas", function() { return tempDatas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitDb", function() { return InitDb; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../index */ "./codes/worker/index.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums */ "./codes/worker/keystore/enums.ts");
/* harmony import */ var _utils_logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils_logic */ "./codes/worker/keystore/utils_logic.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/keystore/business/idb_helper.ts");
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../query_executor */ "./codes/worker/keystore/query_executor.ts");





var tempDatas;
var InitDb = /** @class */ (function () {
    function InitDb(dbName, onSuccess, onError) {
        var dbRequest = self.indexedDB.open(dbName, 1);
        _idb_helper__WEBPACK_IMPORTED_MODULE_3__["IdbHelper"]._isDbDeletedByBrowser = false;
        dbRequest.onerror = function (event) {
            if (event.target.error.name === 'InvalidStateError') {
                _index__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus = {
                    conStatus: _index__WEBPACK_IMPORTED_MODULE_0__["CONNECTION_STATUS"].UnableToStart,
                    lastError: _index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].IndexedDbBlocked,
                };
            }
            if (onError != null) {
                onError(event.target.error);
            }
        };
        dbRequest.onsuccess = function (event) {
            _query_executor__WEBPACK_IMPORTED_MODULE_4__["QueryExecutor"].dbStatus.conStatus = _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Connected;
            _idb_helper__WEBPACK_IMPORTED_MODULE_3__["IdbHelper"]._dbConnection = dbRequest.result;
            _idb_helper__WEBPACK_IMPORTED_MODULE_3__["IdbHelper"]._dbConnection.onclose = function () {
                _idb_helper__WEBPACK_IMPORTED_MODULE_3__["IdbHelper"].callDbDroppedByBrowser();
                _utils_logic__WEBPACK_IMPORTED_MODULE_2__["Utils"].updateDbStatus(_enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed, _index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].ConnectionClosed);
            };
            _idb_helper__WEBPACK_IMPORTED_MODULE_3__["IdbHelper"]._dbConnection.onversionchange = function (e) {
                if (e.newVersion === null) {
                    e.target.close(); // Manually close our connection to the db
                    _idb_helper__WEBPACK_IMPORTED_MODULE_3__["IdbHelper"].callDbDroppedByBrowser();
                    _utils_logic__WEBPACK_IMPORTED_MODULE_2__["Utils"].updateDbStatus(_enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed, _index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].ConnectionClosed);
                }
            };
            _idb_helper__WEBPACK_IMPORTED_MODULE_3__["IdbHelper"]._dbConnection.onerror = function (e) {
                _query_executor__WEBPACK_IMPORTED_MODULE_4__["QueryExecutor"].dbStatus.lastError = "Error occured in connection :" + e.target.result;
            };
            _idb_helper__WEBPACK_IMPORTED_MODULE_3__["IdbHelper"]._dbConnection.onabort = function (e) {
                _query_executor__WEBPACK_IMPORTED_MODULE_4__["QueryExecutor"].dbStatus = {
                    conStatus: _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed,
                    lastError: "Connection aborted"
                };
            };
            if (onSuccess != null) {
                onSuccess();
            }
        };
        dbRequest.onupgradeneeded = function (event) {
            var db = event.target.result, column = "Key";
            db.createObjectStore(_query_executor__WEBPACK_IMPORTED_MODULE_4__["QueryExecutor"].tableName, {
                keyPath: column
            }).createIndex(column, column, { unique: true });
        };
    }
    return InitDb;
}());



/***/ }),

/***/ "./codes/worker/keystore/business/main_logic.ts":
/*!******************************************************!*\
  !*** ./codes/worker/keystore/business/main_logic.ts ***!
  \******************************************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../query_executor */ "./codes/worker/keystore/query_executor.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums */ "./codes/worker/keystore/enums.ts");
/* harmony import */ var _remove_logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./remove_logic */ "./codes/worker/keystore/business/remove_logic.ts");
/* harmony import */ var _set_logic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./set_logic */ "./codes/worker/keystore/business/set_logic.ts");
/* harmony import */ var _init_db_logic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./init_db_logic */ "./codes/worker/keystore/business/init_db_logic.ts");
/* harmony import */ var _get_logic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./get_logic */ "./codes/worker/keystore/business/get_logic.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/keystore/business/idb_helper.ts");







var Main = /** @class */ (function () {
    function Main(onSuccess) {
        if (onSuccess === void 0) { onSuccess = null; }
        this.onSuccess = onSuccess;
    }
    Main.prototype.set = function (query, onSuccess, onError) {
        var insertInstance = new _set_logic__WEBPACK_IMPORTED_MODULE_3__["Set"](query, onSuccess, onError);
        insertInstance.execute();
    };
    Main.prototype.remove = function (key, onSuccess, onError) {
        var deleteInstance = new _remove_logic__WEBPACK_IMPORTED_MODULE_2__["Remove"](key, onSuccess, onError);
        deleteInstance.execute();
    };
    Main.prototype.get = function (key, onSuccess, onError) {
        var getInstance = new _get_logic__WEBPACK_IMPORTED_MODULE_5__["Get"](key, onSuccess, onError);
        getInstance.execute();
    };
    Main.prototype.createDb = function (onSuccess, onError) {
        var dbName = "KeyStore";
        var initDbInstance = new _init_db_logic__WEBPACK_IMPORTED_MODULE_4__["InitDb"](dbName, onSuccess, onError);
    };
    Main.prototype.checkConnectionAndExecuteLogic = function (request) {
        var _this = this;
        if (request.Name === 'create_db' || request.Name === 'open_db') {
            this.executeLogic(request);
        }
        else {
            switch (_query_executor__WEBPACK_IMPORTED_MODULE_0__["QueryExecutor"].dbStatus.conStatus) {
                case _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Connected:
                    this.executeLogic(request);
                    break;
                case _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].NotStarted:
                    setTimeout(function () {
                        this.checkConnectionAndExecuteLogic(request);
                    }.bind(this), 100);
                    break;
                case _enums__WEBPACK_IMPORTED_MODULE_1__["CONNECTION_STATUS"].Closed:
                    if (_idb_helper__WEBPACK_IMPORTED_MODULE_6__["IdbHelper"]._isDbDeletedByBrowser) {
                        this.createDb(function () {
                            _idb_helper__WEBPACK_IMPORTED_MODULE_6__["IdbHelper"]._isDbDeletedByBrowser = false;
                            _this.checkConnectionAndExecuteLogic(request);
                        }, function (err) {
                            console.error(err);
                        });
                    }
            }
        }
    };
    Main.prototype.returnResult = function (result) {
        if (this.onSuccess) {
            this.onSuccess(result);
        }
    };
    Main.prototype.executeLogic = function (request) {
        var _this = this;
        var onSuccess = function (results) {
            _this.returnResult({
                ReturnedValue: results
            });
        };
        var onError = function (err) {
            _this.returnResult({
                ErrorDetails: err,
                ErrorOccured: true
            });
        };
        switch (request.Name) {
            case 'get':
                this.get(request.Query, onSuccess, onError);
                break;
            case 'set':
                this.set(request.Query, onSuccess, onError);
                break;
            case 'remove':
                this.remove(request.Query, onSuccess, onError);
                break;
            case 'create_db':
                this.createDb(onSuccess, onError);
                break;
        }
    };
    return Main;
}());



/***/ }),

/***/ "./codes/worker/keystore/business/remove_logic.ts":
/*!********************************************************!*\
  !*** ./codes/worker/keystore/business/remove_logic.ts ***!
  \********************************************************/
/*! exports provided: Remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Remove", function() { return Remove; });
/* harmony import */ var _base_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_logic */ "./codes/worker/keystore/business/base_logic.ts");
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../query_executor */ "./codes/worker/keystore/query_executor.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/keystore/business/idb_helper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Remove = /** @class */ (function (_super) {
    __extends(Remove, _super);
    function Remove(key, onSuccess, onError) {
        var _this = _super.call(this) || this;
        _this.rowAffected = 0;
        _this.key = key;
        _this.onSuccess = onSuccess;
        _this.onError = onError;
        return _this;
    }
    Remove.prototype.execute = function () {
        var _this = this;
        this.initTransaction();
        var removeData = function (column, value) {
            var cursorRequest = _this.objectStore.index(column).openCursor(IDBKeyRange.only(value));
            cursorRequest.onerror = function (e) {
                _this.errorOccured = true;
                _this.onErrorOccured(e);
            };
            cursorRequest.onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    cursor.delete();
                    ++_this.rowAffected;
                    cursor.continue();
                }
            };
        };
        if (!this.errorOccured) {
            removeData(_query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].columnName, this.key);
        }
    };
    Remove.prototype.initTransaction = function () {
        _idb_helper__WEBPACK_IMPORTED_MODULE_2__["IdbHelper"].createTransaction([_query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].tableName], this.onTransactionCompleted.bind(this));
        this.objectStore = _idb_helper__WEBPACK_IMPORTED_MODULE_2__["IdbHelper"]._transaction.objectStore(_query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].tableName);
    };
    Remove.prototype.onTransactionCompleted = function () {
        if (this.errorOccured === false) {
            this.onSuccess(this.rowAffected);
        }
    };
    return Remove;
}(_base_logic__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/keystore/business/set_logic.ts":
/*!*****************************************************!*\
  !*** ./codes/worker/keystore/business/set_logic.ts ***!
  \*****************************************************/
/*! exports provided: Set */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Set", function() { return Set; });
/* harmony import */ var _base_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base_logic */ "./codes/worker/keystore/business/base_logic.ts");
/* harmony import */ var _idb_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./idb_helper */ "./codes/worker/keystore/business/idb_helper.ts");
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../query_executor */ "./codes/worker/keystore/query_executor.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Set = /** @class */ (function (_super) {
    __extends(Set, _super);
    function Set(query, onSuccess, onError) {
        var _this = _super.call(this) || this;
        try {
            _this.query = query;
            _this.onSuccess = onSuccess;
            _this.onError = onError;
        }
        catch (ex) {
            console.error(ex);
        }
        return _this;
    }
    Set.prototype.execute = function () {
        var _this = this;
        var updateIfExistElseInsert = function () {
            var cursorRequest = _this.objectStore.index(_query_executor__WEBPACK_IMPORTED_MODULE_2__["QueryExecutor"].columnName).openCursor(IDBKeyRange.only(_this.query[_query_executor__WEBPACK_IMPORTED_MODULE_2__["QueryExecutor"].columnName]));
            cursorRequest.onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    cursor.update(_this.query);
                }
                else {
                    insertData();
                }
            };
            cursorRequest.onerror = function (e) {
                _this.errorOccured = true;
                _this.onErrorOccured(e);
            };
        };
        var insertData = function () {
            var addResult = _this.objectStore.add(_this.query);
            addResult.onerror = function (e) {
                _this.errorOccured = true;
                _this.onErrorOccured(e);
            };
        };
        this.initTransaction();
        updateIfExistElseInsert();
    };
    Set.prototype.initTransaction = function () {
        _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].createTransaction([_query_executor__WEBPACK_IMPORTED_MODULE_2__["QueryExecutor"].tableName], this.onTransactionCompleted.bind(this));
        this.objectStore = _idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"]._transaction.objectStore(_query_executor__WEBPACK_IMPORTED_MODULE_2__["QueryExecutor"].tableName);
    };
    Set.prototype.onTransactionCompleted = function () {
        if (this.errorOccured === false && this.onSuccess) {
            this.onSuccess(null);
        }
    };
    return Set;
}(_base_logic__WEBPACK_IMPORTED_MODULE_0__["Base"]));



/***/ }),

/***/ "./codes/worker/keystore/enums.ts":
/*!****************************************!*\
  !*** ./codes/worker/keystore/enums.ts ***!
  \****************************************/
/*! exports provided: CONNECTION_STATUS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONNECTION_STATUS", function() { return CONNECTION_STATUS; });
var CONNECTION_STATUS;
(function (CONNECTION_STATUS) {
    CONNECTION_STATUS["Connected"] = "connected";
    CONNECTION_STATUS["Closed"] = "closed";
    CONNECTION_STATUS["NotStarted"] = "not_connected";
})(CONNECTION_STATUS || (CONNECTION_STATUS = {}));


/***/ }),

/***/ "./codes/worker/keystore/index.ts":
/*!****************************************!*\
  !*** ./codes/worker/keystore/index.ts ***!
  \****************************************/
/*! exports provided: init, get, set, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance */ "./codes/worker/keystore/instance.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "init", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["init"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["get"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "set", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["set"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return _instance__WEBPACK_IMPORTED_MODULE_0__["remove"]; });




/***/ }),

/***/ "./codes/worker/keystore/instance.ts":
/*!*******************************************!*\
  !*** ./codes/worker/keystore/instance.ts ***!
  \*******************************************/
/*! exports provided: init, get, set, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony import */ var _utils_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils_logic */ "./codes/worker/keystore/utils_logic.ts");
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_executor */ "./codes/worker/keystore/query_executor.ts");
var _this = undefined;


/**
 * Initialize KeyStore
 *
 */
var init = function () {
    _utils_logic__WEBPACK_IMPORTED_MODULE_0__["Utils"].setDbType();
    if (indexedDB) {
        _query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].prcoessQuery({
            Name: 'create_db',
            Query: null
        });
    }
};
/**
 * return the value by key
 *
 * @param {string} key
 * @param {(result) => void} onSuccess
 * @param {(err: IError) => void} [onError=null]
 * @returns
 */
var get = function (key, onSuccess, onError) {
    if (onError === void 0) { onError = null; }
    _query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].prcoessQuery({
        Name: 'get',
        OnError: onError,
        OnSuccess: onSuccess,
        Query: key
    });
    return _this;
};
/**
 * insert or update value
 *
 * @param {any} key
 * @param {any} value
 * @param {(result) => void} [onSuccess]
 * @param {(err: IError) => void} [onError]
 * @returns
 */
var set = function (key, value, onSuccess, onError) {
    var query = {
        Key: key,
        Value: value
    };
    _query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].prcoessQuery({
        Name: 'set',
        OnError: onError,
        OnSuccess: onSuccess,
        Query: query
    });
    return _this;
};
/**
 * delete value
 *
 * @param {string} key
 * @param {(result) => void} [onSuccess=null]
 * @param {(err: IError) => void} [onError=null]
 * @returns
 */
var remove = function (key, onSuccess, onError) {
    if (onSuccess === void 0) { onSuccess = null; }
    if (onError === void 0) { onError = null; }
    _query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].prcoessQuery({
        Name: 'remove',
        OnError: onError,
        OnSuccess: onSuccess,
        Query: key
    });
    return _this;
};


/***/ }),

/***/ "./codes/worker/keystore/query_executor.ts":
/*!*************************************************!*\
  !*** ./codes/worker/keystore/query_executor.ts ***!
  \*************************************************/
/*! exports provided: QueryExecutor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryExecutor", function() { return QueryExecutor; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./codes/worker/keystore/enums.ts");
/* harmony import */ var _business_main_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./business/main_logic */ "./codes/worker/keystore/business/main_logic.ts");


var QueryExecutor = /** @class */ (function () {
    function QueryExecutor() {
    }
    QueryExecutor.prcoessQuery = function (request) {
        this.requestQueue.push(request);
        if (this.requestQueue.length === 1) {
            this.executeCode();
        }
    };
    QueryExecutor.executeCode = function () {
        var _this = this;
        if (!this.isCodeExecuting && this.requestQueue.length > 0) {
            this.isCodeExecuting = true;
            var request = {
                Name: this.requestQueue[0].Name,
                Query: this.requestQueue[0].Query
            };
            new _business_main_logic__WEBPACK_IMPORTED_MODULE_1__["Main"](function (results) {
                _this.onQueryFinished(results);
            }).checkConnectionAndExecuteLogic(request);
        }
    };
    QueryExecutor.onQueryFinished = function (message) {
        var finishedRequest = this.requestQueue.shift();
        this.isCodeExecuting = false;
        if (message.ErrorOccured) {
            if (finishedRequest.OnError) {
                finishedRequest.OnError(message.ErrorDetails);
            }
            else {
                console.error(message.ErrorDetails);
            }
        }
        else if (finishedRequest.OnSuccess) {
            finishedRequest.OnSuccess(message.ReturnedValue);
        }
        this.executeCode();
    };
    QueryExecutor.requestQueue = [];
    QueryExecutor.tableName = "LocalStore";
    QueryExecutor.columnName = "Key";
    QueryExecutor.isCodeExecuting = false;
    QueryExecutor.dbStatus = {
        conStatus: _enums__WEBPACK_IMPORTED_MODULE_0__["CONNECTION_STATUS"].NotStarted,
        lastError: ""
    };
    return QueryExecutor;
}());



/***/ }),

/***/ "./codes/worker/keystore/utils_logic.ts":
/*!**********************************************!*\
  !*** ./codes/worker/keystore/utils_logic.ts ***!
  \**********************************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./codes/worker/index.ts");
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_executor */ "./codes/worker/keystore/query_executor.ts");


var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * determine and set the DataBase Type
     *
     *
     * @memberOf UtilityLogic
     */
    Utils.setDbType = function () {
        if (!indexedDB) {
            indexedDB = self.mozIndexedDB ||
                self.webkitIndexedDB || self.msIndexedDB;
        }
        if (indexedDB) {
            IDBTransaction = IDBTransaction ||
                self.webkitIDBTransaction || self.msIDBTransaction;
            self.IDBKeyRange = self.IDBKeyRange ||
                self.webkitIDBKeyRange || self.msIDBKeyRange;
        }
        else {
            _index__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus = {
                conStatus: _index__WEBPACK_IMPORTED_MODULE_0__["CONNECTION_STATUS"].UnableToStart,
                lastError: _index__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].IndexedDbUndefined
            };
        }
    };
    Utils.updateDbStatus = function (status, err) {
        if (err === undefined) {
            _query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].dbStatus.conStatus = status;
        }
        else {
            _query_executor__WEBPACK_IMPORTED_MODULE_1__["QueryExecutor"].dbStatus = {
                conStatus: status,
                lastError: err
            };
        }
    };
    return Utils;
}());



/***/ }),

/***/ "./codes/worker/log_helper.ts":
/*!************************************!*\
  !*** ./codes/worker/log_helper.ts ***!
  \************************************/
/*! exports provided: LogHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogHelper", function() { return LogHelper; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./codes/worker/enums.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./codes/worker/config.ts");


var LogHelper = /** @class */ (function () {
    function LogHelper(type, info) {
        if (info === void 0) { info = null; }
        this.type = type;
        this.info_ = info;
        this.message = this.getMsg_();
    }
    LogHelper.prototype.throw = function () {
        throw this.get();
    };
    LogHelper.log = function (msg) {
        if (_config__WEBPACK_IMPORTED_MODULE_1__["Config"]._isLogEnabled) {
            console.log(msg);
        }
    };
    LogHelper.prototype.logError = function () {
        console.error(this.get());
    };
    LogHelper.prototype.logWarning = function () {
        console.warn(this.get());
    };
    LogHelper.prototype.get = function () {
        return {
            message: this.message,
            type: this.type
        };
    };
    LogHelper.prototype.getMsg_ = function () {
        var errMsg;
        switch (this.type) {
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].NotArray:
                errMsg = "Supplied value is not an array";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].UndefinedColumn:
                errMsg = "Column is undefined in Where";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].UndefinedValue:
                errMsg = "Value is undefined in Where";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].UndefinedColumnName:
                errMsg = "Column name is undefined '" + this.info_['TableName'] + "'";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].UndefinedDbName:
                errMsg = "Database name is not supplied";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].UndefinedColumnValue:
                errMsg = "Column value is undefined";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].NoValueSupplied:
                errMsg = "No value supplied";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].InvalidOp:
                errMsg = "Invalid Op Value '" + this.info_['Op'] + "'";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].ColumnNotExist:
                errMsg = "Column '" + this.info_['ColumnName'] + "' does not exist";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].EnableSearchOff:
                errMsg = "Search is turned off for the Column '" + this.info_['ColumnName'] + "'";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].NullValue:
                errMsg = "Null value is not allowed for column '" + this.info_['ColumnName'] + "'";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].BadDataType:
                errMsg = "Supplied value for column '" + this.info_['ColumnName'] +
                    "' does not have valid type";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].NextJoinNotExist:
                errMsg = "Next join details not supplied";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].TableNotExist:
                errMsg = "Table '" + this.info_['TableName'] + "' does not exist";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].DbNotExist:
                errMsg = "Database '" + this.info_['DbName'] + "' does not exist";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].NotObject:
                errMsg = "supplied value is not object";
                break;
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].InvalidOp:
                errMsg = "Invalid Config '" + this.info_['Config'] + " '";
            case _enums__WEBPACK_IMPORTED_MODULE_0__["ERROR_TYPE"].DbBlocked:
                errMsg = "database is blocked, cant be deleted right now";
            default:
                errMsg = this.message;
                break;
        }
        return errMsg;
    };
    return LogHelper;
}());



/***/ }),

/***/ "./codes/worker/model/column.ts":
/*!**************************************!*\
  !*** ./codes/worker/model/column.ts ***!
  \**************************************/
/*! exports provided: Column */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Column", function() { return Column; });
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums */ "./codes/worker/enums.ts");


var Column = /** @class */ (function () {
    function Column(key, tableName) {
        if (key.name != null) {
            this.name = key.name;
        }
        else {
            var err = new _log_helper__WEBPACK_IMPORTED_MODULE_0__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_1__["ERROR_TYPE"].UndefinedColumnName, { TableName: tableName });
            err.throw();
        }
        this.autoIncrement = key.autoIncrement != null ? key.autoIncrement : false;
        this.primaryKey = key.primaryKey != null ? key.primaryKey : false;
        this.unique = key.unique != null ? key.unique : false;
        this.notNull = key.notNull != null ? key.notNull : false;
        this.dataType = key.dataType != null ? key.dataType : (key.autoIncrement ? 'number' : null);
        this.default = key.default;
        this.multiEntry = key.multiEntry == null ? false : key.multiEntry;
        this.enableSearch = key.enableSearch == null ? true : key.enableSearch;
    }
    return Column;
}());



/***/ }),

/***/ "./codes/worker/model/database.ts":
/*!****************************************!*\
  !*** ./codes/worker/model/database.ts ***!
  \****************************************/
/*! exports provided: DataBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataBase", function() { return DataBase; });
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table */ "./codes/worker/model/table.ts");

var DataBase = /** @class */ (function () {
    function DataBase(dataBase) {
        var _this = this;
        this.tables = [];
        this.name = dataBase.name;
        dataBase.tables.forEach(function (item) {
            _this.tables.push(new _table__WEBPACK_IMPORTED_MODULE_0__["Table"](item));
        });
    }
    return DataBase;
}());



/***/ }),

/***/ "./codes/worker/model/db_helper.ts":
/*!*****************************************!*\
  !*** ./codes/worker/model/db_helper.ts ***!
  \*****************************************/
/*! exports provided: DbHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DbHelper", function() { return DbHelper; });
/* harmony import */ var _table_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./table_helper */ "./codes/worker/model/table_helper.ts");

var DbHelper = /** @class */ (function () {
    function DbHelper(dataBase) {
        this.tables = [];
        this.name = dataBase.name;
        this.tables = dataBase.tables;
    }
    DbHelper.prototype.createMetaData = function (callBack) {
        var _this = this;
        var index = 0;
        var tableHelperList = [];
        var createMetaDataForTable = function () {
            if (index < _this.tables.length) {
                var table = _this.tables[index], tableHelperInstance_1 = new _table_helper__WEBPACK_IMPORTED_MODULE_0__["TableHelper"](table);
                tableHelperInstance_1.createMetaData(_this.name, function () {
                    tableHelperInstance_1.callback = null;
                    tableHelperList.push(tableHelperInstance_1);
                    createMetaDataForTable();
                });
                ++index;
            }
            else {
                callBack(tableHelperList);
            }
        };
        createMetaDataForTable();
    };
    return DbHelper;
}());



/***/ }),

/***/ "./codes/worker/model/table.ts":
/*!*************************************!*\
  !*** ./codes/worker/model/table.ts ***!
  \*************************************/
/*! exports provided: Table */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./column */ "./codes/worker/model/column.ts");

var Table = /** @class */ (function () {
    function Table(table) {
        var _this = this;
        this.columns = [];
        this.name = table.name;
        this.version = table.version == null ? 1 : table.version;
        table.columns.forEach(function (item) {
            _this.columns.push(new _column__WEBPACK_IMPORTED_MODULE_0__["Column"](item, table.name));
        });
    }
    return Table;
}());



/***/ }),

/***/ "./codes/worker/model/table_helper.ts":
/*!********************************************!*\
  !*** ./codes/worker/model/table_helper.ts ***!
  \********************************************/
/*! exports provided: TableHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableHelper", function() { return TableHelper; });
/* harmony import */ var _keystore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../keystore/index */ "./codes/worker/keystore/index.ts");
/* harmony import */ var _business_idb_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../business/idb_helper */ "./codes/worker/business/idb_helper.ts");


var TableHelper = /** @class */ (function () {
    function TableHelper(table) {
        this.columns = [];
        this.requireDelete = false;
        this.requireCreation = false;
        this.name = table.name;
        this.version = table.version;
        this.columns = table.columns;
        this.setPrimaryKey_();
    }
    TableHelper.prototype.createMetaData = function (dbName, callBack) {
        this.callback = callBack;
        this.setRequireDelete_(dbName);
        this.setDbVersion_(dbName);
    };
    TableHelper.prototype.setPrimaryKey_ = function () {
        var _this = this;
        this.columns.every(function (item) {
            _this.primaryKey = item.primaryKey ? item.name : "";
            return !item.primaryKey;
        });
    };
    TableHelper.prototype.setRequireDelete_ = function (dbName) {
        var _this = this;
        _keystore_index__WEBPACK_IMPORTED_MODULE_0__["get"]("JsStore_" + dbName + "_" + this.name + "_Version", function (tableVersion) {
            if (tableVersion == null) {
                _this.requireCreation = true;
            }
            else if (tableVersion < _this.version) {
                _this.requireDelete = true;
            }
        });
    };
    TableHelper.prototype.setDbVersion_ = function (dbName) {
        _business_idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDbVersion = _business_idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDbVersion > this.version ? _business_idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDbVersion : this.version;
        // setting db version
        _keystore_index__WEBPACK_IMPORTED_MODULE_0__["set"]("JsStore_" + dbName + "_Db_Version", _business_idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDbVersion);
        // setting table version
        _keystore_index__WEBPACK_IMPORTED_MODULE_0__["set"]("JsStore_" + dbName + "_" + this.name + "_Version", _business_idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDbVersion, this.callback);
        this.version = _business_idb_helper__WEBPACK_IMPORTED_MODULE_1__["IdbHelper"].activeDbVersion;
    };
    return TableHelper;
}());



/***/ }),

/***/ "./codes/worker/query_executor.ts":
/*!****************************************!*\
  !*** ./codes/worker/query_executor.ts ***!
  \****************************************/
/*! exports provided: QueryExecutor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryExecutor", function() { return QueryExecutor; });
/* harmony import */ var _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./business/idb_helper */ "./codes/worker/business/idb_helper.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enums */ "./codes/worker/enums.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./codes/worker/config.ts");
/* harmony import */ var _business_open_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./business/open_db */ "./codes/worker/business/open_db.ts");
/* harmony import */ var _business_drop_db__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./business/drop_db */ "./codes/worker/business/drop_db.ts");
/* harmony import */ var _keystore_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keystore/index */ "./codes/worker/keystore/index.ts");
/* harmony import */ var _model_db_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./model/db_helper */ "./codes/worker/model/db_helper.ts");
/* harmony import */ var _business_create_db__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./business/create_db */ "./codes/worker/business/create_db.ts");
/* harmony import */ var _model_database__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./model/database */ "./codes/worker/model/database.ts");
/* harmony import */ var _business_select_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./business/select/index */ "./codes/worker/business/select/index.ts");
/* harmony import */ var _business_count_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./business/count/index */ "./codes/worker/business/count/index.ts");
/* harmony import */ var _business_insert_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./business/insert/index */ "./codes/worker/business/insert/index.ts");
/* harmony import */ var _business_remove_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./business/remove/index */ "./codes/worker/business/remove/index.ts");
/* harmony import */ var _business_update_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./business/update/index */ "./codes/worker/business/update/index.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./util */ "./codes/worker/util.ts");
/* harmony import */ var _business_clear__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./business/clear */ "./codes/worker/business/clear.ts");
/* harmony import */ var _business_bulk_insert__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./business/bulk_insert */ "./codes/worker/business/bulk_insert.ts");
/* harmony import */ var _main_enums__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../main/enums */ "./codes/main/enums.ts");



















var QueryExecutor = /** @class */ (function () {
    function QueryExecutor() {
    }
    QueryExecutor.prototype.checkConnectionAndExecuteLogic = function (request) {
        var _this = this;
        _log_helper__WEBPACK_IMPORTED_MODULE_1__["LogHelper"].log('checking connection and executing request:' + request.name);
        switch (request.name) {
            case 'create_db':
            case 'is_db_exist':
            case 'get_db_version':
            case 'get_db_list':
            case 'get_db_schema':
            case 'open_db':
                this.executeLogic_(request);
                break;
            case 'change_log_status':
                this.changeLogStatus_(request.query['logging']);
                break;
            default:
                switch (this.dbStatus_.conStatus) {
                    case _enums__WEBPACK_IMPORTED_MODULE_2__["CONNECTION_STATUS"].Connected:
                        {
                            this.executeLogic_(request);
                        }
                        break;
                    case _enums__WEBPACK_IMPORTED_MODULE_2__["CONNECTION_STATUS"].Closed:
                        {
                            if (this.isDbDeletedByBrowser_ === true) {
                                this.createDb_(null, function () {
                                    _this.isDbDeletedByBrowser_ = false;
                                    _this.checkConnectionAndExecuteLogic(request);
                                }, request.onError);
                            }
                            else {
                                this.openDb_(this.activeDb_.name, function () {
                                    _this.checkConnectionAndExecuteLogic(request);
                                }, request.onError);
                            }
                        }
                        break;
                    default:
                        break;
                }
        }
    };
    QueryExecutor.prototype.changeLogStatus_ = function (enableLog) {
        _config__WEBPACK_IMPORTED_MODULE_3__["Config"]._isLogEnabled = enableLog;
    };
    QueryExecutor.prototype.returnResult_ = function (result) {
        self.postMessage(result);
    };
    QueryExecutor.prototype.executeLogic_ = function (request) {
        var _this = this;
        var onSuccess = function (results) {
            _this.returnResult_({
                returnedValue: results
            });
        };
        var onError = function (err) {
            _this.returnResult_({
                errorDetails: err,
                errorOccured: true
            });
        };
        switch (request.name) {
            case 'select':
                this.select_(request.query, onSuccess, onError);
                break;
            case 'insert':
                this.insert_(request.query, onSuccess, onError);
                break;
            case 'update':
                this.update_(request.query, onSuccess, onError);
                break;
            case 'remove':
                this.remove_(request.query, onSuccess, onError);
                break;
            case 'is_db_exist':
                this.isDbExist_(request.query, onSuccess, onError);
                break;
            case 'get_db_version':
                this.getDbVersion_(request.query, onSuccess);
                break;
            case 'get_db_list':
                this.getDbList_(onSuccess);
                break;
            case 'get_db_schema':
                this.getDbSchema_(request.query, onSuccess);
                break;
            case 'open_db':
                if (this.isDbDeletedByBrowser_ === true) {
                    this.createDb_(null, function () {
                        _this.isDbDeletedByBrowser_ = false;
                        onSuccess();
                    }, onError);
                }
                else {
                    this.openDb_(request.query, onSuccess, onError);
                }
                break;
            case 'create_db':
                this.createDb_(request.query, onSuccess, onError);
                break;
            case 'clear':
                this.clear_(request.query, onSuccess, onError);
                break;
            case 'drop_db':
                this.dropDb_(onSuccess, onError);
                break;
            case 'count':
                this.count_(request.query, onSuccess, onError);
                break;
            case 'bulk_insert':
                this.bulkInsert_(request.query, onSuccess, onError);
                break;
            case 'export_json':
                this.exportJson_(request.query, onSuccess, onError);
                break;
            default: console.error('The Api:-' + request.name + ' does not support.');
        }
    };
    QueryExecutor.prototype.getDbSchema_ = function (dbName, callback) {
        _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].getDbSchema(dbName, callback);
    };
    Object.defineProperty(QueryExecutor.prototype, "isDbDeletedByBrowser_", {
        get: function () {
            return _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].isDbDeletedByBrowser;
        },
        set: function (value) {
            _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].isDbDeletedByBrowser = value;
        },
        enumerable: true,
        configurable: true
    });
    QueryExecutor.prototype.getDbList_ = function (callback) {
        _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].getDbList(callback);
    };
    Object.defineProperty(QueryExecutor.prototype, "activeDb_", {
        get: function () {
            return _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb;
        },
        set: function (value) {
            _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb = value;
        },
        enumerable: true,
        configurable: true
    });
    QueryExecutor.prototype.openDb_ = function (dbName, onSuccess, onError) {
        var _this = this;
        this.getDbVersion_(dbName, function (dbVersion) {
            if (dbVersion !== 0) {
                _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDbVersion = dbVersion;
                _this.getDbSchema_(dbName, function (result) {
                    _this.activeDb_ = result;
                    var openDbProject = new _business_open_db__WEBPACK_IMPORTED_MODULE_4__["OpenDb"](onSuccess, onError);
                    openDbProject.execute();
                });
            }
            else {
                var err = new _log_helper__WEBPACK_IMPORTED_MODULE_1__["LogHelper"](_enums__WEBPACK_IMPORTED_MODULE_2__["ERROR_TYPE"].DbNotExist, { DbName: dbName });
                err.logError();
                onError(err.get());
            }
        });
    };
    QueryExecutor.prototype.closeDb_ = function () {
        if (_business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus.conStatus === _enums__WEBPACK_IMPORTED_MODULE_2__["CONNECTION_STATUS"].Connected) {
            _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus.conStatus = _enums__WEBPACK_IMPORTED_MODULE_2__["CONNECTION_STATUS"].ClosedByJsStore;
            _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbConnection.close();
        }
    };
    QueryExecutor.prototype.dropDb_ = function (onSuccess, onError) {
        this.closeDb_();
        var dropDbInstance = new _business_drop_db__WEBPACK_IMPORTED_MODULE_5__["DropDb"](onSuccess, onError);
        dropDbInstance.deleteDb();
    };
    QueryExecutor.prototype.update_ = function (query, onSuccess, onError) {
        var updateDbInstance = new _business_update_index__WEBPACK_IMPORTED_MODULE_14__["Instance"](query, onSuccess, onError);
        updateDbInstance.execute();
    };
    QueryExecutor.prototype.insert_ = function (query, onSuccess, onError) {
        var insertInstance = new _business_insert_index__WEBPACK_IMPORTED_MODULE_12__["Instance"](query, onSuccess, onError);
        insertInstance.execute();
    };
    QueryExecutor.prototype.bulkInsert_ = function (query, onSuccess, onError) {
        var bulkInsertInstance = new _business_bulk_insert__WEBPACK_IMPORTED_MODULE_17__["BulkInsert"](query, onSuccess, onError);
        bulkInsertInstance.execute();
    };
    QueryExecutor.prototype.remove_ = function (query, onSuccess, onError) {
        var deleteObject = new _business_remove_index__WEBPACK_IMPORTED_MODULE_13__["Instance"](query, onSuccess, onError);
        deleteObject.execute();
    };
    QueryExecutor.prototype.select_ = function (query, onSuccess, onError) {
        if (typeof query.From === 'object') {
            var selectJoinInstance = new _business_select_index__WEBPACK_IMPORTED_MODULE_10__["Join"](query, onSuccess, onError);
        }
        else {
            var selectInstance = new _business_select_index__WEBPACK_IMPORTED_MODULE_10__["Instance"](query, onSuccess, onError);
            selectInstance.execute();
        }
    };
    QueryExecutor.prototype.count_ = function (query, onSuccess, onError) {
        if (typeof query.From === 'object') {
            query['Count'] = true;
            var selectJoinInstance = new _business_select_index__WEBPACK_IMPORTED_MODULE_10__["Join"](query, onSuccess, onError);
        }
        else {
            var countInstance = new _business_count_index__WEBPACK_IMPORTED_MODULE_11__["Instance"](query, onSuccess, onError);
            countInstance.execute();
        }
    };
    QueryExecutor.prototype.createDb_ = function (dataBase, onSuccess, onError) {
        var _this = this;
        var processCreateDb = function () {
            // save dbSchema in keystore
            _keystore_index__WEBPACK_IMPORTED_MODULE_6__["set"]("JsStore_" + _this.activeDb_.name + "_Schema", _this.activeDb_);
            // create meta data
            var dbHelper = new _model_db_helper__WEBPACK_IMPORTED_MODULE_7__["DbHelper"](_business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb);
            dbHelper.createMetaData(function (tablesMetaData) {
                var createDbInstance = new _business_create_db__WEBPACK_IMPORTED_MODULE_8__["CreateDb"](tablesMetaData, onSuccess, onError);
            });
        };
        if (dataBase == null) {
            processCreateDb();
        }
        else {
            this.closeDb_();
            this.getDbVersion_(dataBase.name, function (version) {
                _this.activeDbVersion_ = version ? version : 1;
                _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDb = new _model_database__WEBPACK_IMPORTED_MODULE_9__["DataBase"](dataBase);
                processCreateDb();
            });
        }
    };
    Object.defineProperty(QueryExecutor.prototype, "activeDbVersion_", {
        get: function () {
            return _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDbVersion;
        },
        set: function (value) {
            _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].activeDbVersion = value;
        },
        enumerable: true,
        configurable: true
    });
    QueryExecutor.prototype.getDbVersion_ = function (dbName, callback) {
        _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].getDbVersion(dbName, callback);
    };
    Object.defineProperty(QueryExecutor.prototype, "dbStatus_", {
        get: function () {
            return _business_idb_helper__WEBPACK_IMPORTED_MODULE_0__["IdbHelper"].dbStatus;
        },
        enumerable: true,
        configurable: true
    });
    QueryExecutor.prototype.clear_ = function (tableName, onSuccess, onError) {
        var clearInstance = new _business_clear__WEBPACK_IMPORTED_MODULE_16__["Clear"](tableName, onSuccess, onError);
        clearInstance.execute();
    };
    QueryExecutor.prototype.exportJson_ = function (query, onSuccess, onError) {
        this.select_(query, function (results) {
            var url = URL.createObjectURL(new Blob([JSON.stringify(results)], {
                type: "text/json"
            }));
            onSuccess(url);
        }, function (err) {
            onError(err);
        });
    };
    QueryExecutor.prototype.getType = function (value) {
        return _util__WEBPACK_IMPORTED_MODULE_15__["Util"].getType(value);
    };
    QueryExecutor.prototype.isDbExist_ = function (dbInfo, onSuccess, onError) {
        if (this.dbStatus_.conStatus !== _enums__WEBPACK_IMPORTED_MODULE_2__["CONNECTION_STATUS"].UnableToStart) {
            if (this.getType(dbInfo) === _main_enums__WEBPACK_IMPORTED_MODULE_18__["Data_Type"].String) {
                this.getDbVersion_(dbInfo, function (dbVersion) {
                    onSuccess(Boolean(dbVersion));
                });
            }
            else {
                this.getDbVersion_(dbInfo.dbName, function (dbVersion) {
                    onSuccess(dbInfo.table.version <= dbVersion);
                });
            }
        }
        else {
            var error = {
                message: null,
                type: this.dbStatus_.lastError,
            };
            switch (error.type) {
                case _enums__WEBPACK_IMPORTED_MODULE_2__["ERROR_TYPE"].IndexedDbBlocked:
                    error.message = "IndexedDB is blocked";
                    break;
                case _enums__WEBPACK_IMPORTED_MODULE_2__["ERROR_TYPE"].IndexedDbUndefined:
                    error.message = "IndexedDB is not supported";
                    break;
                default: break;
            }
            onError(error);
        }
    };
    return QueryExecutor;
}());



/***/ }),

/***/ "./codes/worker/start.ts":
/*!*******************************!*\
  !*** ./codes/worker/start.ts ***!
  \*******************************/
/*! exports provided: registerEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerEvents", function() { return registerEvents; });
/* harmony import */ var _keystore_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keystore/index */ "./codes/worker/keystore/index.ts");
/* harmony import */ var _log_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log_helper */ "./codes/worker/log_helper.ts");
/* harmony import */ var _query_executor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_executor */ "./codes/worker/query_executor.ts");



var log = function (value) {
    _log_helper__WEBPACK_IMPORTED_MODULE_1__["LogHelper"].log(value);
};
var registerEvents = function () {
    self.onmessage = function (e) {
        log("Request executing from WebWorker, request name: " + e.data.Name);
        new _query_executor__WEBPACK_IMPORTED_MODULE_2__["QueryExecutor"]().checkConnectionAndExecuteLogic(e.data);
    };
};
registerEvents();
_keystore_index__WEBPACK_IMPORTED_MODULE_0__["init"]();


/***/ }),

/***/ "./codes/worker/util.ts":
/*!******************************!*\
  !*** ./codes/worker/util.ts ***!
  \******************************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./codes/worker/enums.ts");

var Util = /** @class */ (function () {
    function Util() {
    }
    Util.isNull = function (value) {
        if (value == null) {
            return true;
        }
        else {
            switch (typeof value) {
                case 'string': return value.length === 0;
                case 'number': return isNaN(value);
            }
        }
        return false;
    };
    Util.getObjectFirstKey = function (value) {
        for (var key in value) {
            return key;
        }
        return null;
    };
    /**
     *  get data type of supplied value
     *
     * @static
     * @param {any} value
     * @returns
     * @memberof Util
     */
    Util.getType = function (value) {
        if (value === null) {
            return _enums__WEBPACK_IMPORTED_MODULE_0__["DATA_TYPE"].Null;
        }
        var type = typeof value;
        switch (type) {
            case 'object':
                if (Array.isArray(value)) {
                    return _enums__WEBPACK_IMPORTED_MODULE_0__["DATA_TYPE"].Array;
                }
            default:
                return type;
        }
    };
    return Util;
}());



/***/ })

/******/ });
//# sourceMappingURL=jsstore.worker.js.map