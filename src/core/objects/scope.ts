export class Scope {

    private scope: string;
    /**
     * @param {string} scopeName The name of scope
     */
    constructor(scopeName: string = 'global') {
        this.scope = scopeName?.trim() ?? '';

        if (this.scope.length < 1) {
            throw new Error('Scope must not be empty');
        }
    }

    /**
     * @returns string
     */
    get(): string {
        return this.scope;
    }

    toString(): string {
        return this.get();
    }
}