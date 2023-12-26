import ObjectDeepCompare from 'object-deep-compare';
import { FieldAttribute } from '../utils/typings';
import { isArrayEqual } from '../utils/utils';

enum FieldType {
    ALL,
    SINGULAR_FIELD,
    ARRAY,
    OBJECT,
}



export class Resource {
    private resource: string;
    private field: FieldAttribute;

    // @ts-ignore because already assigned when call processField()
    private fieldType: FieldType;

    /**
     * 
     * @param {string} resource A resource or subjectname
     * @param {FieldAttribute} field An attributes of a resource.
     */
    constructor(resource: string, field: FieldAttribute = null) {
        this.resource = resource?.trim() ?? '';
        this.field = field;

        if (this.resource.length < 1) {
            throw new Error('Resource must not be empty');
        }

        if (!this.resource.match(/^([a-zA-Z0-9_\-])+$/)) {
            throw new Error(
                'Invalid resource naming. Please use a combination of lowercase letter, number, dash and underscore only'
            );
        }

        this.processField();
    }

    private processField() {
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

        throw new Error('Invalid field argument. Field does not support associative or non-trimmed string')
    }

    /**
     * @returns string
     */
    getResourceStr(): string {
        return this.resource;
    }

    /**
     * @returns {FieldAttribute}
     */
    getField(): FieldAttribute {
        return this.field;
    }

    /**
     * @returns boolean
     */
    allField(): boolean {
        return this.fieldType === FieldType.ALL;
    }

    /**
     * @param {FieldAttribute} field 
     * @returns boolean
     */
    matchField(field: FieldAttribute) {
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
                for(const itemField of field) {
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
            const result = ObjectDeepCompare.CompareValuesWithConflicts(this.field, field);
            return result.length === 0;
        }
    }

    isEqualWith(other: Resource) {
        if (other.getResourceStr() !== this.getResourceStr()) {
            return false;
        }

        if (other.getFieldType() !== this.getFieldType()) {
            return false;
        }

        switch(this.getFieldType()) {
            case FieldType.ALL:
                return true;
            case FieldType.SINGULAR_FIELD:
                return other.getField() == this.getField();
            case FieldType.OBJECT:
                return ObjectDeepCompare.CompareValuesWithConflicts(
                    this.getField(),
                    other.getField()
                ).length === 0;
            case FieldType.ARRAY:
                return isArrayEqual(
                    this.getField() as any[],
                    other.getField() as any[]
                )
        }
    }

    getFieldType(): FieldType {
        return this.fieldType;
    }

    /**
     * @returns bool
     */
    private isSingularField(field: FieldAttribute) {
        if(typeof field === 'string' || field instanceof String) {
            return true;
        }

        if(typeof field === 'number') {
            return true;
        }

        return false;
    }

    toString(): string {
        if (this.allField()) {
            return this.getResourceStr() + '/*';
        }

        if (this.fieldType === FieldType.SINGULAR_FIELD) {
            return this.getResourceStr() + "/" + this.getField();
        }

        return this.getResourceStr() + "/" + JSON.stringify(this.getField());
    }
}