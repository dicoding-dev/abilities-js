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
        this.#resource = resource;
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

        if (typeof this.#field === 'array') {
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