import { CompiledRules } from "../objects/compiledRules";
import { Rule } from "../objects/rule";
export declare class AbilityChecker {
    private compiledRules;
    /**
     * @param {CompiledRules} compiledRules
     */
    constructor(compiledRules: CompiledRules);
    /**
     * @function can
     * Check if the user has the special ability or not. This function can be called with following scheme :
     *
     * 1. Using rule syntax or composed rule \
     *    Pass with one argument string, or with object Rule \
     *    Example :
     *    ```javascript
     *       user.can('scope:resource:action'); // or
     *       user.can(Rule);
     *    ```
     *
     * 2. Using builder \
     *    Pass with at least 2 argument with the following order : action, resource, scope (default: global), and field (optional)
     *    Parameters :
     *       - **action**    -> A string that denotes the action for a given resource. Usually, this can be a CRUD model
     *                          like create, read, update, delete, or you can define your own model.
     *                          To allow all action for a given resource, you can pass star '*'.
     *       - **resource**  -> A string that denotes the object 'resource' to be accessed.
     *                          Must be specific for a given scope. A 'resource' is defined by domain expert on specific scope.
     *       - **scope**     -> A string that denotes the scope for given rules.
     *                          Impacting on how the systems select the resource.
     *       - **field**     -> *(Optional)*. A one of int, string, array, object, or '*' (star) that defines which resource's attrbutes
     *                          for a given user can access. \
     *                          int or string -> the user can access only for specific identification of resource \
     *                          array         -> the user can access a multiple identification of resource \
     *                          object        -> the user can only access the resource when the object properties condition are equal.
     *
     * @returns {boolean} true if the current user has the capabilities for current rule
     */
    can(...args: any[]): boolean;
    /**
     * A negated approach for checking the user abilities.
     * See `can()` for more information.
     *
     * @return bool true if the current user does not have the capabilities for current rule
     */
    cannot(...args: any[]): boolean;
    /**
     * Use the same approach as method `can()` does. But via customized syntax or rules.
     * Via Syntax :
     * scope:resource/field:action
     *
     *
     * @param {(Rule|string)} ruleOrSyntax A syntax (string) for defining rules or with using Rule
     * @return {boolean} true if the current user has the rule
     */
    hasRule(ruleOrSyntax: (Rule | string)): boolean;
    /**
     * Get the live rule from constructed rule.
     * @returns {(Rule|null)}
     */
    getRuleOf(ruleOrSyntax: (Rule | string)): (Rule | null);
}
