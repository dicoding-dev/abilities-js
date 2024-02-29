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

        if (!this.action.match(/^(([a-zA-Z0-9_\-])+|([*]){1})$/)) {
            throw new Error(
                'Invalid action naming. Please use a combination of lowercase letter, number, dash and underscore only or a single star (*) character'
            );
        }
    }

    /**
     * @returns string
     */
    get(): string {
        return this.action;
    }

    wholeAction(): boolean {
        return this.get() === '*';
    }

    toString(): string {
        return this.get();
    }

    match(action: string): boolean
    {
        if (this.wholeAction()) {
            return true;
        }

        return this.get() === action;
    }
}
