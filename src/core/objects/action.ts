export class Action {
    private action: string;

    /**
     * @param {string} action the action name. Cannot be empty or null
     */
    constructor(action: string = '*') {
        this.action = action?.trim() ?? '';

        if (this.action.length < 1) {
            throw new Error('Action must not be empty');
        }
    }

    /**
     * @returns string
     */
    get(): string {
        return this.action;
    }

    toString(): string {
        return this.get();
    }
}
