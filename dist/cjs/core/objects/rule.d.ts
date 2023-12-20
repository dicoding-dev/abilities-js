import { Action } from "./action";
import { Resource } from "./resource";
import { Scope } from "./scope";
export declare class Rule {
    /**
     * @type {(number|null)}
     */
    private ruleId;
    /**
     * @type {Scope}
     */
    private scope;
    /**
     * @type {Resource}
     */
    private resource;
    /**
     * @type {Action}
     */
    private action;
    /**
     * @type {boolean}
     */
    private isInverted;
    /**
     *
     * @param {Scope} scope
     * @param {Resource} resource
     * @param {Action} action
     * @param {boolean} inverted
     */
    constructor(scope: Scope, resource: Resource, action: Action, inverted?: boolean);
    /**
     * Sets a rule with given rule ID
     * @param {number} id
     */
    setRuleId(id: number): void;
    /**
     * @throws Exception
     */
    getRuleId(): number;
    /**
     * Get the current scope of rule
     * @returns {Scope}
     */
    getScope(): Scope;
    /**
     * Get the current subject or resource of rule
     * @returns {Resource}
     */
    getResource(): Resource;
    /**
     * Get the current action of rule
     * @returns {Action}
     */
    getAction(): Action;
    /**
     * Is the rule inverted (negated) ?
     * @returns {boolean}
     */
    inverted(): boolean;
    toString(): string;
}
