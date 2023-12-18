export class Scope {

    #scope
    /**
     * @param {string} scopeName The name of scope
     */
    constructor(scopeName = 'global') {
        this.#scope = scopeName?.trim() ?? '';

        if (this.#scope.length < 1) {
            throw new Error('Scope must not be empty');
        }
    }

    /**
     * @returns string
     */
    get() {
        return this.#scope;
    }

    toString() {
        return this.get();
    }
}