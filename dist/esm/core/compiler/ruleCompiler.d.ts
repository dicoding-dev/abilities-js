import { Rule } from "../objects/rule";
export declare class RuleCompiler {
    /**
     * Compile the syntax rule to the corresponding @see {Rule} object.
     *
     * @param {string} ruleSyntax A string that contains a syntax of rule
     * @returns {Rule}
     */
    static compile(ruleSyntax: string): Rule;
}
