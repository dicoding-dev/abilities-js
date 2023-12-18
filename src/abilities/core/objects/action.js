export class Action {
    #action;
    /**
     * @param {string} action the action name. Cannot be empty or null
     */
    constructor(action = '*') {
        this.#action = action?.trim() ?? '';

        if (this.#action.length < 1) {
            throw new Error('Action must not be empty');
        }
    }

    /**
     * @returns string
     */
    get() {
        return this.#action;
    }

    toString() {
        return this.get();
    }
}