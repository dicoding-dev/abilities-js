"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const compiledRules_1 = require("./compiledRules");
(0, vitest_1.describe)("Compile and query rules", function () {
    const rules = [
        {
            'id': 1,
            'rule': 'scope1:resource1/666:*'
        },
        {
            'id': 2,
            'rule': 'scope1:resource1/5:read'
        },
        {
            'id': 3,
            'rule': 'scope1:resource1/[10,11,12]:read'
        },
        {
            'id': 4,
            'rule': 'scope1:resource1/{"expired":true}:read'
        },
        {
            'id': 5,
            'rule': 'scope2:resource1:read'
        },
        {
            'id': 6,
            'rule': 'scope1:resource2:update'
        },
        {
            'id': 7,
            'rule': 'scope2:resource1/666:read'
        },
    ];
    const compiledRules = new compiledRules_1.CompiledRules(rules);
    (0, vitest_1.it)('must return empty if scope does not found', () => {
        (0, vitest_1.expect)(compiledRules.queryRule('not_found_scope', '', '')).to.be.empty;
    });
    (0, vitest_1.it)('must return empty if resource does not found', () => {
        (0, vitest_1.expect)(compiledRules.queryRule('scope1', 'not_found_resource', '')).to.be.empty;
    });
    (0, vitest_1.it)('must return empty if action does not found', () => {
        (0, vitest_1.expect)(compiledRules.queryRule('scope1', 'resource1', 'delete')).to.be.empty;
    });
    (0, vitest_1.it)('must return expected rule id', () => {
        const rules1 = compiledRules.queryRule('scope1', 'resource1', 'read');
        (0, vitest_1.expect)(rules1.map((item) => item.getRuleId()))
            .toStrictEqual([2, 3, 4]);
        const rules2 = compiledRules.queryRule('scope1', 'resource1', '*');
        (0, vitest_1.expect)(rules2.map((item) => item.getRuleId()))
            .toStrictEqual([1]);
        const rules3 = compiledRules.queryRule('scope2', 'resource1', 'read');
        (0, vitest_1.expect)(rules3.map((item) => item.getRuleId()))
            .toStrictEqual([5, 7]);
    });
    (0, vitest_1.it)('can load as string array with readOnly basis', () => {
        const compiledRules = new compiledRules_1.CompiledRules([
            'scope1:resourceA:edit',
            'scope1:resourceB:read'
        ], true);
        const queried = compiledRules.queryRule('scope1', 'resourceB', 'read');
        (0, vitest_1.expect)(queried).to.not.empty;
        (0, vitest_1.expect)(queried.map((rule) => rule.toString())).toStrictEqual(['scope1:resourceB/*:read']);
    });
});
