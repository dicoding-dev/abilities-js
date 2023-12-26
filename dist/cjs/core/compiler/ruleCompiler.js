"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleCompiler = void 0;
const action_1 = require("../objects/action");
const resource_1 = require("../objects/resource");
const rule_1 = require("../objects/rule");
const scope_1 = require("../objects/scope");
class RuleCompiler {
    /**
     * Compile the syntax rule to the corresponding @see {Rule} object.
     *
     * @param {string} ruleSyntax A string that contains a syntax of rule
     * @returns {Rule}
     */
    static compile(ruleSyntax) {
        var _a;
        if (!ruleSyntax || ((_a = ruleSyntax === null || ruleSyntax === void 0 ? void 0 : ruleSyntax.trim()) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            throw new Error('Syntax must not be empty');
        }
        let leftCursor = 0;
        let rightCursor = ruleSyntax.length - 1;
        let inverted = false;
        if (ruleSyntax[leftCursor] === '!') {
            inverted = true;
            leftCursor++;
        }
        let scope = '', resource = '', action = '', reachedEndScope = false, reachedEndAction = false;
        while (leftCursor <= rightCursor) {
            if (!reachedEndScope) {
                const left = ruleSyntax[leftCursor++];
                if (left !== ':') {
                    scope += left;
                }
                else {
                    reachedEndScope = true;
                }
            }
            if (!reachedEndAction) {
                const right = ruleSyntax[rightCursor--];
                if (right !== ':') {
                    action = right + action;
                }
                else {
                    reachedEndAction = true;
                }
            }
            if (reachedEndScope) {
                const left = ruleSyntax[leftCursor++];
                if (left !== '/' && left !== ':') {
                    resource += left;
                }
                else {
                    break;
                }
            }
        }
        if (scope.trim().length === 0) {
            throw new Error('Scope must not be empty');
        }
        if (resource.trim().length === 0) {
            throw new Error('Resource must not be empty');
        }
        if (action.trim().length === 0) {
            throw new Error('Action must not be empty');
        }
        const fieldLength = ++rightCursor - leftCursor;
        let field = null;
        if (fieldLength > 0) {
            const fieldStr = ruleSyntax.substring(leftCursor, rightCursor).trim();
            if (fieldStr[0] !== '[' && fieldStr[0] !== '{') {
                field = fieldStr;
            }
            else {
                field = JSON.parse(fieldStr);
            }
        }
        return new rule_1.Rule(new scope_1.Scope(scope), new resource_1.Resource(resource, field), new action_1.Action(action), inverted);
    }
}
exports.RuleCompiler = RuleCompiler;
