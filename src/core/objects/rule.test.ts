import { describe, it, test, expect } from "vitest";
import { Action } from "./action";
import { Resource } from "./resource";
import { Scope } from "./scope";
import { Rule } from "./rule";

function makeRule({
    resource,
    inverted
} = {resource: new Resource('resource'), inverted: false}) {
    return new Rule(
        new Scope('scope'),
        resource,
        new Action('action'),
        inverted
    );
}

describe("getRuleId function test", () => {
    it("must throw error when not calling setRuleId beforehand", () => {
        expect(() => makeRule().getRuleId()).toThrowError("Don't forget to call 'setRuleId()' before get the rule ID");
    });

    it("returns expected ruleId", () => {
        const rule = makeRule();
        rule.setRuleId(1);

        expect(rule.getRuleId()).toBe(1);
    });
});

describe("toString function test", () => {
    test("successfully encode inverted rules", () => {
        const rule = makeRule({
            resource: new Resource('resource'),
            inverted:  true
        });
        expect(`${rule}`).toEqual("!scope:resource/*:action");
    });
    test("successfully encode normal rules", () => {
        const rule = makeRule();
        expect(`${rule}`).toEqual("scope:resource/*:action");
    });
    test("successfully rule with custom resource", () => {
        // @ts-ignore
        // @todo fix this and make sure it's not ignoring ts checking
        const rule = makeRule({
            resource :   new Resource(
                'res',
                {
                    'param_1' : 22
                }
            )
            });
        expect(`${rule}`).toEqual("scope:res/{\"param_1\":22}:action");
    });
});
