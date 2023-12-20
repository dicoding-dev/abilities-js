"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const object_deep_compare_1 = __importDefault(require("object-deep-compare"));
// const FieldType = {
//     ALL: 1,
//     SINGULAR_FIELD: 2,
//     ARRAY: 3,
//     OBJECT: 4,
// };
var FieldType;
(function (FieldType) {
    FieldType[FieldType["ALL"] = 0] = "ALL";
    FieldType[FieldType["SINGULAR_FIELD"] = 1] = "SINGULAR_FIELD";
    FieldType[FieldType["ARRAY"] = 2] = "ARRAY";
    FieldType[FieldType["OBJECT"] = 3] = "OBJECT";
})(FieldType || (FieldType = {}));
class Resource {
    /**
     *
     * @param {string} resource A resource or subjectname
     * @param {number|string|array|object} field An attributes of a resource.
     */
    constructor(resource, field = null) {
        var _a;
        this.resource = (_a = resource === null || resource === void 0 ? void 0 : resource.trim()) !== null && _a !== void 0 ? _a : '';
        this.field = field;
        if (this.resource.length < 1) {
            throw new Error('Resource must not be empty');
        }
        this.processField();
    }
    processField() {
        if (!this.field || this.field === '*') {
            this.fieldType = FieldType.ALL;
            return;
        }
        if (this.isSingularField(this.field)) {
            this.fieldType = FieldType.SINGULAR_FIELD;
            return;
        }
        // @ts-ignore
        if (typeof this.field === 'array' || this.field instanceof Array) {
            this.fieldType = FieldType.ARRAY;
            return;
        }
        if (typeof this.field === 'object') {
            this.fieldType = FieldType.OBJECT;
            return;
        }
        throw new Error('Invalid field argument. Field does not support associative or non-trimmed string');
    }
    /**
     * @returns string
     */
    getResourceStr() {
        return this.resource;
    }
    /**
     * @returns {FieldAttribute}
     */
    getField() {
        return this.field;
    }
    /**
     * @returns boolean
     */
    allField() {
        return this.fieldType === FieldType.ALL;
    }
    /**
     * @param {FieldAttribute} field
     * @returns boolean
     */
    matchField(field) {
        if (this.allField()) {
            return true;
        }
        if (!field) {
            return false;
        }
        if (this.fieldType === FieldType.SINGULAR_FIELD) {
            if (!this.isSingularField(field)) {
                return false;
            }
            return `${this.field}` === `${field}`;
        }
        if (this.fieldType === FieldType.ARRAY) {
            // @ts-ignore
            if (typeof field === 'array' || field instanceof Array) {
                // @ts-ignore
                for (const itemField of field) {
                    // @ts-ignore
                    if (!this.field.includes(itemField)) {
                        return false;
                    }
                }
                return true;
            }
            // @ts-ignore
            return this.field.includes(field);
        }
        if (this.fieldType === FieldType.OBJECT) {
            const result = object_deep_compare_1.default.CompareValuesWithConflicts(this.field, field);
            return result.length === 0;
        }
    }
    /**
     * @returns bool
     */
    isSingularField(field) {
        if (typeof field === 'string' || field instanceof String) {
            return true;
        }
        if (typeof field === 'number') {
            return true;
        }
        return false;
    }
    toString() {
        if (this.allField()) {
            return this.getResourceStr() + '/*';
        }
        if (this.fieldType === FieldType.SINGULAR_FIELD) {
            return this.getResourceStr() + "/" + this.getField();
        }
        return this.getResourceStr() + "/" + JSON.stringify(this.getField());
    }
}
exports.Resource = Resource;
