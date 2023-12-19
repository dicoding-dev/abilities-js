import { Action } from "../objects/action";
import { Resource } from "../objects/resource";
import { Rule } from "../objects/rule";
import { Scope } from "../objects/scope";

export class RuleCompiler {

    /**
     * Compile the syntax rule to the corresponding @see {Rule} object.
     * 
     * @param {string} ruleSyntax A string that contains a syntax of rule
     * @returns {Rule}
     */
    static compile(ruleSyntax) {
        if (!ruleSyntax || ruleSyntax?.trim()?.length === 0) {
            throw new Error('Syntax must not be empty');
        }

        let leftCursor = 0;
        let rightCursor = ruleSyntax.length - 1;

        let inverted = false;
        if (ruleSyntax[leftCursor] === '!') {
            inverted = true;
        }

        let scope = '', 
            resource = '', 
            action = '',
            reachedEndScope = false,
            reachedEndAction = false;
        
        while (leftCursor <= rightCursor) {
            if (!reachedEndScope) {
                const left = ruleSyntax[leftCursor++];

                if (left !== ':') {
                    scope += left;
                } else {
                    reachedEndScope = true;
                }
            }

            if (!reachedEndAction) {
                const right = ruleSyntax[rightCursor--];

                if (right !== ':') {
                    action = right + action;
                } else {
                    reachedEndAction = true;
                }
            }

            if (reachedEndScope) {
                const left = ruleSyntax[leftCursor++];

                if (left !== '/' && left !== ':') {
                    resource += left;
                } else {
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
            const fieldStr = ruleSyntax.substring(leftCursor, rightCursor);
            if (fieldStr[0] !== '[' && fieldStr[0] !== '{') {
                field = fieldStr;
            } else {
                field = JSON.parse(fieldStr);
            }
        }

        return new Rule(
            new Scope(scope),
            new Resource(resource, field),
            new Action(action),
            inverted
        )
    }
}