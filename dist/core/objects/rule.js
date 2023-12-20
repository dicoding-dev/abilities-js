export class Rule {
    /**
     *
     * @param {Scope} scope
     * @param {Resource} resource
     * @param {Action} action
     * @param {boolean} inverted
     */
    constructor(scope, resource, action, inverted = false) {
        /**
         * @type {(number|null)}
         */
        this.ruleId = null;
        this.scope = scope;
        this.resource = resource;
        this.action = action;
        this.isInverted = inverted;
    }
    /**
     * Sets a rule with given rule ID
     * @param {number} id
     */
    setRuleId(id) {
        this.ruleId = id;
    }
    /**
     * @throws Exception
     */
    getRuleId() {
        if (!this.ruleId) {
            throw new Error("Don't forget to call 'setRuleId()' before get the rule ID");
        }
        return this.ruleId;
    }
    /**
     * Get the current scope of rule
     * @returns {Scope}
     */
    getScope() {
        return this.scope;
    }
    /**
     * Get the current subject or resource of rule
     * @returns {Resource}
     */
    getResource() {
        return this.resource;
    }
    /**
     * Get the current action of rule
     * @returns {Action}
     */
    getAction() {
        return this.action;
    }
    /**
     * Is the rule inverted (negated) ?
     * @returns {boolean}
     */
    inverted() {
        return this.isInverted;
    }
    toString() {
        return (this.inverted() ? '!' : '') + this.getScope() + ':' + this.getResource() + ':' + this.getAction();
    }
}
