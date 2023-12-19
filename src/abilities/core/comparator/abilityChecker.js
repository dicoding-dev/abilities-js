import { Rule } from "../objects/rule";

/**
 * @abstract
 */
export class AbilityChecker {

    constructor() {
        if (this.constructor == AbilityChecker) {
            throw new Error('Abstract classes cannot be instantiated');
        }
    }
    
    /**
     * Check if the user has the special ability or not.
     *
     * @param {string} action The action for a given resource. Usually, this can be a CRUD model
     *                       like create, read, update, delete, or you can define your own model.
     *                       To allow all action for a given resource, you can pass star '*'.
     * @param {string} resource The object 'resource' to be accessed. Must be specific for a given scope.
     *                          A 'resource' is defined by domain expert on specific scope.
     * @param {string} scope The scope for given rules. Impacting on how the systems select the resource
     * @param {(int|string|array|object|'*')} field Can be an object, array, or a single string, int for defining specific area of resource
     * 
     * @returns {boolean} true if the current user has the capabilities for current rule
     */
    can(action, resource, scope, field = null){}

    /**
     * Check if the user has the special ability or not.
     *
     * @param {(Rule|string)} rule can be syntax string or rule object.
     * @returns {boolean} true if the current user has the capabilities for current rule
     */
    can(rule) {}

    /**
     * A negated approach for checking the user abilities.
     * See `can(action, resource, scope, field)` for more information.
     *
     * @return bool true if the current user does not have the capabilities for current rule
     */
    cannot(action, resource, scope, field = null){}

    /**
     * The simplified version of cannot(action, resource, scope, field)
     *
     * @param {(Rule|string)} rule 
     */
    cannot(rule){}
    
    /**
     * Use the same approach as method `can()` does. But via customized syntax or rules.
     * Via Syntax :
     * scope:resource/field:action
     *
     *
     * @param {(Rule|string)} $ruleOrSyntax A syntax (string) for defining rules or with using Rule
     * @return bool true if the current user has the rule
     */
    hasRule(ruleOrSyntax) {}

    /**
     * Get the live rule from constructed rule.
     */
    getRuleOf(ruleOrSyntax) {}
}