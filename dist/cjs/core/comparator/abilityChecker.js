"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbilityChecker = void 0;
const ruleCompiler_1 = require("../compiler/ruleCompiler");
const rule_1 = require("../objects/rule");
class AbilityChecker {
    /**
     * @param {CompiledRules} compiledRules
     */
    constructor(compiledRules) {
        this.compiledRules = compiledRules;
    }
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
    can(...args) {
        const argumentLength = args.length;
        let scope = 'global'; // default scope
        let resource = '';
        let action = '';
        let field = null;
        if (argumentLength === 0) {
            throw new Error('Cannot pass with empty argument');
        }
        if (argumentLength === 1) {
            let rule = args[0];
            if (!(rule instanceof rule_1.Rule)) {
                rule = ruleCompiler_1.RuleCompiler.compile(rule);
            }
            scope = rule.getScope().get();
            resource = rule.getResource().getResourceStr();
            action = rule.getAction().get();
            field = rule.getResource().getField();
        }
        else {
            action = args[0];
            resource = args[1];
            scope = argumentLength >= 3 ? args[2] : scope;
            field = argumentLength >= 4 ? args[3] : null;
        }
        const specificActionRules = this.compiledRules.queryRule(scope, resource, action);
        const specificNormalRules = [];
        for (const specificActionRule of specificActionRules) {
            /** 1. Checking on specific inverted rules */
            if (specificActionRule.inverted()) {
                if (specificActionRule.getResource().matchField(field)) {
                    return false; // as the correspondent user is prohibited access resource
                }
            }
            else {
                specificNormalRules.push(specificActionRule);
            }
        }
        /** 2. Star-<action> rules */
        const starActionRules = this.compiledRules.queryRule(scope, resource, '*');
        for (const startActionRule of starActionRules) {
            if (startActionRule.getResource().matchField(field)) {
                return !startActionRule.inverted();
            }
        }
        /** 3. Other specific-<action> rules */
        for (const specificNormalRule of specificActionRules) {
            if (specificNormalRule.getResource().matchField(field)) {
                return true;
            }
        }
        return false;
    }
    /**
     * A negated approach for checking the user abilities.
     * See `can()` for more information.
     *
     * @return bool true if the current user does not have the capabilities for current rule
     */
    cannot(...args) {
        // @ts-ignore
        return !this.can(...args);
    }
    /**
     * Use the same approach as method `can()` does. But via customized syntax or rules.
     * Via Syntax :
     * scope:resource/field:action
     *
     *
     * @param {(Rule|string)} ruleOrSyntax A syntax (string) for defining rules or with using Rule
     * @return {boolean} true if the current user has the rule
     */
    hasRule(ruleOrSyntax) {
        return this.getRuleOf(ruleOrSyntax) !== null;
    }
    /**
     * Get the live rule from constructed rule.
     * @returns {(Rule|null)}
     */
    getRuleOf(ruleOrSyntax) {
        let rule = ruleOrSyntax;
        if (!(rule instanceof rule_1.Rule)) {
            rule = ruleCompiler_1.RuleCompiler.compile(rule);
        }
        const queriedRule = this.compiledRules.queryRule(rule.getScope().get(), rule.getResource().getResourceStr(), rule.getAction().get());
        for (const foundRule of queriedRule) {
            if (foundRule.getResource().matchField(rule.getResource().getField())
                && foundRule.inverted() === rule.inverted()) {
                return foundRule;
            }
        }
        return null;
    }
}
exports.AbilityChecker = AbilityChecker;
