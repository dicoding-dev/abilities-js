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

        if (!this.scope.match(/^([a-zA-Z0-9_\-])+$/)) {
            throw new Error(
                'Invalid scope naming. Please use a combination of lowercase letter, number, dash and underscore only'
            );
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