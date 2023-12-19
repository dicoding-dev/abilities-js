import { RuleCompiler } from "../compiler/ruleCompiler";

export class CompiledRules {

    #rules;

    /** 
     * @type {object[]}
     */
    #compiledRules;

    /** 
     * A flags that tell all of rules is not bind with its rule ID
     * This means that we couldn't use feature with rule update on specific user ID
     * 
     * @type {boolean}
     */
    #readOnly;

    /**
     * Compile a list of rules. There are 2 mode for this.
     * 1. Read Only methods
     * This means that we could not use the mutability methods (edit, delete of rule). Fo make the instance, you can pass : 
     * @var {rules} with : 
     * ```javascript
     *    new CompiledRules(['rules', ...rules], true);
     * ``` 
     * or with : 
     * ```javascript
     *    new CompiledRules([{id: ruleId, rule: 'rule'}, ...rules], true);
     * ```
     * 
     * 2. Mutable methods
     * For the use with mutability. To make the instance, you can : 
     * ```javascript
     *    new CompiledRules([{id: ruleId, rule: 'rule'}, ...rules]);
     * ```
     * 
     * @param {array} rules The list of rules. It can contained with its rule ID or not depends on @var {readOnly}
     * @param {boolean} readOnly
     */
    constructor(rules, readOnly = false) {
        this.#readOnly = readOnly;
        this.#rules = rules;

        this.#compile();
    }

    /**
     * Query the compiled rule
     * 
     * @param {string} scope The scope name
     * @param {string} resource The resource name
     * @param {string} action The action name
     */
    queryRule(scope, resource, action) {
        if (!(scope in this.#compiledRules)) {
            return [];
        }

        if (!(resource in this.#compiledRules[scope])) {
            return [];
        }

        if (!(action in this.#compiledRules[scope][resource])) {
            return [];
        }

        return this.#compiledRules[scope][resource][action];
    }

    #compile() {
        this.#compiledRules = {};

        for(const rule of this.#rules) {

            let compiledRule;
            if (typeof rule === 'object') {
                compiledRule = RuleCompiler.compile(rule.rule);
            } else {
                compiledRule = RuleCompiler.compile(rule);
            }

            if (!this.#readOnly) {
                compiledRule.setRuleId(rule.id);
            }

            const scope = compiledRule.getScope().get();
            const resource = compiledRule.getResource().getResourceStr();
            const action = compiledRule.getAction().get();

            if (!(scope in this.#compiledRules)) {
                this.#compiledRules[scope] = {};
            }

            if (!(resource in this.#compiledRules[scope])) {
                this.#compiledRules[scope][resource] = {};
            }

            if (!(action in this.#compiledRules[scope][resource])) {
                this.#compiledRules[scope][resource][action] = [];
            }

            if (compiledRule.getResource().allField()) {
                this.#compiledRules[scope][resource][action].unshift(compiledRule);
            } else {
                this.#compiledRules[scope][resource][action].push(compiledRule);
            }
        }
    }
}
