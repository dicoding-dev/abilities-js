import { FieldAttribute } from '../utils/typings';
export declare class Resource {
    private resource;
    private field;
    private fieldType;
    /**
     *
     * @param {string} resource A resource or subjectname
     * @param {number|string|array|object} field An attributes of a resource.
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
    /**
     * @returns bool
     */
    private isSingularField;
    toString(): string;
}
