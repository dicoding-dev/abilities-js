export class Scope {
    /**
     * @param {string} scopeName The name of scope
     */
    constructor(scopeName = 'global') {
        var _a;
        this.scope = (_a = scopeName === null || scopeName === void 0 ? void 0 : scopeName.trim()) !== null && _a !== void 0 ? _a : '';
        if (this.scope.length < 1) {
            throw new Error('Scope must not be empty');
        }
    }
    /**
     * @returns string
     */
    get() {
        return this.scope;
    }
    toString() {
        return this.get();
    }
}
