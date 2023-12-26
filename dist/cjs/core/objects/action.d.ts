export declare class Action {
    private action;
    /**
     * @param {string} action the action name. Cannot be empty or null
     */
    constructor(action?: string);
    /**
     * @returns string
     */
    get(): string;
    wholeAction(): boolean;
    toString(): string;
}
