import ObjectDeepCompare from 'object-deep-compare';

const FieldType = {
    ALL: 1,
    SINGULAR_FIELD: 2,
    ARRAY: 3,
    OBJECT: 4,
};

export class Resource {

    #resource;
    #field;
    #fieldType;

    /**
     * 
     * @param {string} resource A resource or subjectname
     * @param {int|string|array|object} field An attributes of a resource.
     */
    constructor(resource, field) {
        this.#resource = resource?.trim() ?? '';
        this.#field = field;

        if (this.#resource.length < 1) {
            throw new Error('Resource must not be empty');
        }

        this.#processField();
    }

    #processField() {
        if (!this.#field || this.#field === '*') {
            this.#fieldType = FieldType.ALL;
            return;
        }

        if (this.#isSingularField(this.#field)) {
            this.#fieldType = FieldType.SINGULAR_FIELD;
            return;
        }

        if (typeof this.#field === 'array' || this.#field instanceof Array) {
            this.#fieldType = FieldType.ARRAY;
            return;
        }

        if (typeof this.#field === 'object') {
            this.#fieldType = FieldType.OBJECT;
            return;
        }

        throw new Error('Invalid field argument. Field does not support associative or non-trimmed string')
    }

    /**
     * @returns string
     */
    getResourceStr() {
        return this.#resource;
    }

    /**
     * @returns {int|string|array|object}
     */
    getField() {
        return this.#field;
    }

    /**
     * @returns boolean
     */
    allField() {
        return this.#fieldType === FieldType.ALL;
    }

    /**
     * @param {int|string|array|object} field 
     * @returns boolean
     */
    matchField(field) {
        if (this.allField()) {
            return true;
        }

        if (!field) {
            return false;
        }

        if (this.#fieldType === FieldType.SINGULAR_FIELD) {
            if (!this.#isSingularField(field)) {
                return false;
            }

            return `${this.#field}` === `${field}`;
        }

        if (this.#fieldType === FieldType.ARRAY) {
            if (typeof field === 'array' || field instanceof Array) {
                console.log('dsdsd');
                for(const itemField of field) {
                    if (!this.#field.includes(itemField)) {
                        console.log('doesnt include : ' + itemField)
                        return false;
                    }
                }

                return true;
            }

            return this.#field.includes(field);
        }

        if (this.#fieldType === FieldType.OBJECT) {
            const result = ObjectDeepCompare.CompareValuesWithConflicts(this.#field, field);
            return result.length === 0;
        }
    }

    /**
     * @returns bool
     */
    #isSingularField(field) {
        if(typeof field === 'string' || field instanceof String) {
            return true;
        }

        if(typeof field === 'number') {
            return true;
        }

        return false;
    }

    toString() {
        if (this.allField()) {
            return this.getResourceStr() + '/*';
        }

        if (this.#fieldType === FieldType.SINGULAR_FIELD) {
            return this.getResourceStr() + "/" + this.getField();
        }

        return this.getResourceStr() + "/" + JSON.stringify(this.getField());
    }
}