import { RuleCompiler } from '../compiler/ruleCompiler.js';
export class CompiledRules {
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
        /**
         * @type {object}
         */
        this.compiledRules = {};
        this.readOnly = readOnly;
        this.rules = rules;
        this.compile();
    }
    /**
     * Query the compiled rule
     *
     * @param {string} scope The scope name
     * @param {string} resource The resource name
     * @param {string} action The action name
     */
    queryRule(scope, resource, action) {
        if (!(scope in this.compiledRules)) {
            return [];
        }
        // @ts-ignore
        if (!(resource in this.compiledRules[scope])) {
            return [];
        }
        if (action.trim().length === 0) {
            // @ts-ignore
            const unspecifiedActions = this.compiledRules[scope][resource];
            const result = [];
            for (const key in unspecifiedActions) {
                const rules = unspecifiedActions[key];
                for (const rule of rules) {
                    result.push(rule);
                }
            }
            return result;
        }
        // @ts-ignore
        if (!(action in this.compiledRules[scope][resource])) {
            return [];
        }
        // @ts-ignore
        return this.compiledRules[scope][resource][action];
    }
    compile() {
        this.compiledRules = {};
        for (const rule of this.rules) {
            let compiledRule;
            if (typeof rule === 'object') {
                // @ts-ignore
                compiledRule = RuleCompiler.compile(rule.rule);
            }
            else {
                compiledRule = RuleCompiler.compile(rule);
            }
            if (!this.readOnly) {
                // @ts-ignore
                compiledRule.setRuleId(rule.id);
            }
            const scope = compiledRule.getScope().get();
            const resource = compiledRule.getResource().getResourceStr();
            const action = compiledRule.getAction().get();
            // @ts-ignore
            if (!(scope in this.compiledRules)) {
                // @ts-ignore
                this.compiledRules[scope] = {};
            }
            // @ts-ignore
            if (!(resource in this.compiledRules[scope])) {
                // @ts-ignore
                this.compiledRules[scope][resource] = {};
            }
            // @ts-ignore
            if (!(action in this.compiledRules[scope][resource])) {
                // @ts-ignore
                this.compiledRules[scope][resource][action] = [];
            }
            if (compiledRule.getResource().allField()) {
                // @ts-ignore
                this.compiledRules[scope][resource][action].unshift(compiledRule);
            }
            else {
                // @ts-ignore
                this.compiledRules[scope][resource][action].push(compiledRule);
            }
        }
    }
}
