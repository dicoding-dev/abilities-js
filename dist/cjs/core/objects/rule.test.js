"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const action_1 = require("./action");
const resource_1 = require("./resource");
const scope_1 = require("./scope");
const rule_1 = require("./rule");
function makeRule({ resource, inverted } = { resource: new resource_1.Resource('resource'), inverted: false }) {
    return new rule_1.Rule(new scope_1.Scope('scope'), resource, new action_1.Action('action'), inverted);
}
(0, vitest_1.describe)("getRuleId function test", () => {
    (0, vitest_1.it)("must throw error when not calling setRuleId beforehand", () => {
        (0, vitest_1.expect)(() => makeRule().getRuleId()).toThrowError("Don't forget to call 'setRuleId()' before get the rule ID");
    });
    (0, vitest_1.it)("returns expected ruleId", () => {
        const rule = makeRule();
        rule.setRuleId(1);
        (0, vitest_1.expect)(rule.getRuleId()).toBe(1);
    });
});
(0, vitest_1.describe)("toString function test", () => {
    (0, vitest_1.test)("successfully encode inverted rules", () => {
        const rule = makeRule({
            resource: new resource_1.Resource('resource'),
            inverted: true
        });
        (0, vitest_1.expect)(`${rule}`).toEqual("!scope:resource/*:action");
    });
    (0, vitest_1.test)("successfully encode normal rules", () => {
        const rule = makeRule();
        (0, vitest_1.expect)(`${rule}`).toEqual("scope:resource/*:action");
    });
    (0, vitest_1.test)("successfully rule with custom resource", () => {
        // @ts-ignore
        // @todo fix this and make sure it's not ignoring ts checking
        const rule = makeRule({
            resource: new resource_1.Resource('res', {
                'param_1': 22
            })
        });
        (0, vitest_1.expect)(`${rule}`).toEqual("scope:res/{\"param_1\":22}:action");
    });
});
