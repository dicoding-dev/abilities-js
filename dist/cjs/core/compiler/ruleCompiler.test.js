"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ruleCompiler_1 = require("./ruleCompiler");
(0, vitest_1.describe)("Compile a rule syntax", () => {
    (0, vitest_1.it)("must throw error if syntax is empty", () => {
        (0, vitest_1.expect)(() => ruleCompiler_1.RuleCompiler.compile("")).toThrowError('Syntax must not be empty');
    });
    (0, vitest_1.it)("must throw error if scope is empty", () => {
        (0, vitest_1.expect)(() => ruleCompiler_1.RuleCompiler.compile(':resource:action')).toThrowError('Scope must not be empty');
    });
    (0, vitest_1.it)("must throw error if resource is empty", () => {
        (0, vitest_1.expect)(() => ruleCompiler_1.RuleCompiler.compile('scope::action')).toThrowError('Resource must not be empty');
    });
    (0, vitest_1.it)("must throw error if action is empty", () => {
        (0, vitest_1.expect)(() => ruleCompiler_1.RuleCompiler.compile('scope:resource:')).toThrowError('Action must not be empty');
    });
    (0, vitest_1.describe)("must return expected", () => {
        (0, vitest_1.test)("when resource have no field", () => {
            const rule = ruleCompiler_1.RuleCompiler.compile('scope:resource:action');
            (0, vitest_1.expect)(rule.getScope().get()).toBe('scope');
            (0, vitest_1.expect)(rule.getResource().getResourceStr()).toBe('resource');
            (0, vitest_1.expect)(rule.getResource().getField()).toBe(null);
            (0, vitest_1.expect)(rule.getAction().get()).toBe('action');
        });
        (0, vitest_1.test)("when resource have single field", () => {
            const rule = ruleCompiler_1.RuleCompiler.compile('scope:resource/1:action');
            (0, vitest_1.expect)(rule.getScope().get()).toBe('scope');
            (0, vitest_1.expect)(rule.getResource().getResourceStr()).toBe('resource');
            (0, vitest_1.expect)(rule.getResource().getField()).toBe('1');
            (0, vitest_1.expect)(rule.getAction().get()).toBe('action');
        });
        (0, vitest_1.test)("when resource have object field", () => {
            const rule = ruleCompiler_1.RuleCompiler.compile('scope:resource/{ "fieldA": 2, "fieldB": 5 }:action');
            (0, vitest_1.expect)(rule.getScope().get()).toBe('scope');
            (0, vitest_1.expect)(rule.getResource().getResourceStr()).toBe('resource');
            (0, vitest_1.expect)(rule.getAction().get()).toBe('action');
            const field = rule.getResource().getField();
            //@ts-ignore
            (0, vitest_1.expect)(field === null || field === void 0 ? void 0 : field.fieldA).toBe(2);
            //@ts-ignore
            (0, vitest_1.expect)(field === null || field === void 0 ? void 0 : field.fieldB).toBe(5);
        });
        (0, vitest_1.test)("when resource have array field", () => {
            const rule = ruleCompiler_1.RuleCompiler.compile('scope:resource/[1, 2, 3]:action');
            (0, vitest_1.expect)(rule.getScope().get()).toBe('scope');
            (0, vitest_1.expect)(rule.getResource().getResourceStr()).toBe('resource');
            (0, vitest_1.expect)(rule.getAction().get()).toBe('action');
            const field = rule.getResource().getField();
            (0, vitest_1.expect)(field).toStrictEqual([1, 2, 3]);
        });
    });
});
