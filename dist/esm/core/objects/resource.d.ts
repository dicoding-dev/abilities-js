import { FieldAttribute } from '../utils/typings';
declare enum FieldType {
    ALL = 0,
    SINGULAR_FIELD = 1,
    ARRAY = 2,
    OBJECT = 3
}
export declare class Resource {
    private resource;
    private field;
    private fieldType;
    /**
     *
     * @param {string} resource A resource or subjectname
     * @param {FieldAttribute} field An attributes of a resource.
     */
    constructor(resource: string, field?: FieldAttribute);
    private processField;
    /**
     * @returns string
     */
    getResourceStr(): string;
    /**
     * @returns {FieldAttribute}
     */
    getField(): FieldAttribute;
    /**
     * @returns boolean
     */
    allField(): boolean;
    /**
     * @param {FieldAttribute} field
     * @returns boolean
     */
    matchField(field: FieldAttribute): any;
    isEqualWith(other: Resource): boolean;
    getFieldType(): FieldType;
    /**
     * @returns bool
     */
    private isSingularField;
    toString(): string;
}
export {};
