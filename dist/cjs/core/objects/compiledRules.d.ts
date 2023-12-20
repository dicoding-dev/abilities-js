export declare class CompiledRules {
    private rules;
    /**
     * @type {object}
     */
    private compiledRules;
    /**
     * A flags that tell all of rules is not bind with its rule ID
     * This means that we couldn't use feature with rule update on specific user ID
     *
     * @type {boolean}
     */
    private readOnly;
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
    constructor(rules: string[] | object[], readOnly?: boolean);
    /**
     * Query the compiled rule
     *
     * @param {string} scope The scope name
     * @param {string} resource The resource name
     * @param {string} action The action name
     */
    queryRule(scope: string, resource: string, action: string): any;
    compile(): void;
}
