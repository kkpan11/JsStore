import { TableMeta } from "@/worker/model/table_meta";
import { IColumn, TStringAny, ERROR_TYPE, DATA_TYPE, IInsertQuery } from "@/common";
import { getDataType, LogHelper, isNull } from "@/worker/utils";


export class ValuesChecker {
    table: TableMeta;
    autoIncrementValue;
    query: IInsertQuery;

    constructor(table: TableMeta, autoIncValues) {
        this.table = table;
        this.autoIncrementValue = autoIncValues;
    }

    checkAndModifyValues(query: IInsertQuery) {
        let err: LogHelper;
        this.query = query;
        const values = query.values;
        const ignoreIndexes = [];
        values.every((item, index) => {
            err = this.checkAndModifyValue(item);
            if (query.ignore && err) {
                ignoreIndexes.push(index);
                err = null;
            }
            return err ? false : true;
        });
        ignoreIndexes.forEach(index => {
            values.splice(index, 1);
        });
        return { err, values };
    }

    private checkAndModifyValue(value) {
        let error: LogHelper;
        this.table.columns.every(column => {
            error = this.checkAndModifyColumnValue_(column, value);
            return error ? false : true;
        })
        return error;
    }

    private checkNotNullAndDataType_(column: IColumn, value: TStringAny) {
        // check not null schema
        if (column.notNull && isNull(value[column.name])) {
            return this.getError(ERROR_TYPE.NullValue, { ColumnName: column.name });
        }
        // check datatype
        else if (column.dataType && !isNull(value[column.name])) {
            const receivedType = getDataType(value[column.name]);
            if (receivedType !== column.dataType) {
                return this.getError(ERROR_TYPE.WrongDataType, { column: column.name, expected: column.dataType, received: receivedType });
            }
        }
    }

    private checkAndModifyColumnValue_(column: IColumn, value: TStringAny) {
        const columnValue = value[column.name];
        // check auto increment scheme
        if (column.autoIncrement) {
            // if value is null, then create the autoincrement value
            if (isNull(columnValue)) {
                value[column.name] = ++this.autoIncrementValue[column.name];
            }
            else {
                if (getDataType(columnValue) === DATA_TYPE.Number) {
                    // if column value is greater than autoincrement value saved, then make the
                    // column value as autoIncrement value
                    if (columnValue > this.autoIncrementValue[column.name]) {
                        this.autoIncrementValue[column.name] = columnValue;
                    }
                }
            }
        }
        // check Default Schema
        else if (column.default !== undefined && isNull(columnValue)) {
            value[column.name] = column.default;
        }
        const query = this.query;
        if (query.validation) {
            return this.checkNotNullAndDataType_(column, value);
        }
    }

    private getError(error: string, details: object) {
        return new LogHelper(error, details);
    }
}
