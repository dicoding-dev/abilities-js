import { describe, it, test, expect } from "vitest";

import { RuleCompiler } from "./ruleCompiler";

describe("Compile a rule syntax", () => {
    it("must throw error if syntax is empty", () => {
        expect(() => RuleCompiler.compile("")).toThrowError('Syntax must not be empty');
    });

    it("must throw error if scope is empty", () => {
        expect(() => RuleCompiler.compile(':resource:action')).toThrowError('Scope must not be empty');
    });

    it("must throw error if resource is empty", () => {
        expect(() => RuleCompiler.compile('scope::action')).toThrowError('Resource must not be empty');
    });



    it("must throw error if action is empty", () => {
        expect(() => RuleCompiler.compile('scope:resource:')).toThrowError('Action must not be empty');
    });

    describe("must return expected", () => {
        test("when resource have no field", () => {
            const rule = RuleCompiler.compile('scope:resource:action');

            expect(rule.getScope().get()).toBe('scope');
            expect(rule.getResource().getResourceStr()).toBe('resource');
            expect(rule.getResource().getField()).toBe(null);
            expect(rule.getAction().get()).toBe('action');
        });

        test("when resource have single field", () => {
            const rule = RuleCompiler.compile('scope:resource/1:action');

            expect(rule.getScope().get()).toBe('scope');
            expect(rule.getResource().getResourceStr()).toBe('resource');
            expect(rule.getResource().getField()).toBe('1');
            expect(rule.getAction().get()).toBe('action');
        });

        test("when resource have object field", () => {
            const rule = RuleCompiler.compile('scope:resource/{ "fieldA": 2, "fieldB": 5 }:action');

            expect(rule.getScope().get()).toBe('scope');
            expect(rule.getResource().getResourceStr()).toBe('resource');
            expect(rule.getAction().get()).toBe('action');

            const field = rule.getResource().getField();
            expect(field.fieldA).toBe(2);
            expect(field.fieldB).toBe(5);
        });

        test("when resource have array field", () => {
            const rule = RuleCompiler.compile('scope:resource/[1, 2, 3]:action');

            expect(rule.getScope().get()).toBe('scope');
            expect(rule.getResource().getResourceStr()).toBe('resource');
            expect(rule.getAction().get()).toBe('action');

            const field = rule.getResource().getField();
            expect(field).toStrictEqual([1, 2, 3]);
        });
    });
});
