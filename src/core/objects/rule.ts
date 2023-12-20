import { Action } from "./action";
import { Resource } from "./resource";
import { Scope } from "./scope";

export class Rule
{
    /** 
     * @type {(number|null)}
     */
    private ruleId: (number|null) = null;

    /** 
     * @type {Scope}
     */
    private scope: Scope;

    /** 
     * @type {Resource}
     */
    private resource: Resource;

    /** 
     * @type {Action}
     */
    private action: Action;

    /** 
     * @type {boolean}
     */
    private isInverted: boolean;

    /**
     * 
     * @param {Scope} scope 
     * @param {Resource} resource 
     * @param {Action} action 
     * @param {boolean} inverted 
     */
    constructor(
        scope: Scope,
        resource: Resource,
        action: Action,
        inverted: boolean = false
    ) {
        this.scope = scope;
        this.resource = resource;
        this.action = action;
        this.isInverted = inverted;
    }

    /**
     * Sets a rule with given rule ID
     * @param {number} id 
     */
    setRuleId(id: number): void {
        this.ruleId = id;
    }

    /**
     * @throws Exception
     */
    getRuleId(): number {
        if (!this.ruleId){
            throw new Error("Don't forget to call 'setRuleId()' before get the rule ID");
        }

        return this.ruleId;
    }

    /**
     * Get the current scope of rule
     * @returns {Scope}
     */
    getScope(): Scope {
        return this.scope;
    }

    /**
     * Get the current subject or resource of rule
     * @returns {Resource}
     */
    getResource(): Resource {
        return this.resource;
    }

    /**
     * Get the current action of rule
     * @returns {Action}
     */
    getAction(): Action {
        return this.action;
    }

    /**
     * Is the rule inverted (negated) ?
     * @returns {boolean}
     */
    inverted(): boolean {
        return this.isInverted;
    }

    toString() {
        return (this.inverted() ? '!' : '') + this.getScope() + ':' + this.getResource() + ':' + this.getAction();
    }
}
