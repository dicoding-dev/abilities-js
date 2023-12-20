"use strict";
// @ts-nocheck
// @todo Please revise the design of function next!
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const compiledRules_1 = require("../objects/compiledRules");
const abilityChecker_1 = require("./abilityChecker");
const ruleCompiler_1 = require("../compiler/ruleCompiler");
/**
 * FIRST PRECEDENCE
 * 1. Specific negated rules         -> !jobs:vacancies/4:*
 * 2. Star-<action> rules            ->  jobs:vacancies/1:*
 * 3. Other specific-<action> rules  ->  jobs:vacancies:<other>
 *
 * SECOND (NESTED) PRECEDENCE
 * 1. Star-<field> rules or Empty-<field> rules         --> jobs:vacancies/*:update or jobs:vacancies:update
 * 2. Single-<field> rules                              --> jobs:vacancies/2:update
 * 3. Array-<field> rules (OR method)                   --> jobs:vacancies/[4, 5, 6]:update
 * 4. Object-<field> rules (AND method per attributes)  --> jobs:vacancies/{"authoredBy": 22}:update
 *
 */
(0, vitest_1.describe)('can() feature function test', function () {
    (0, vitest_1.it)('must return false when the user have inverted rule', function () {
        const compiledRules = new compiledRules_1.CompiledRules([
            {
                'id': 1,
                'rule': 'scope1:resource1:read'
            },
            {
                'id': 2,
                'rule': '!scope1:resource1/666:update'
            },
            {
                'id': 3,
                'rule': '!scope1:resource1/[6, 7, 8]:update'
            },
        ]);
        const abilityChecker = new abilityChecker_1.AbilityChecker(compiledRules);
        (0, vitest_1.expect)(abilityChecker.can('update', 'resource1', 'scope1', 666))
            .toBe(false);
    });
    (0, vitest_1.it)('must return true when user have rule with ALL action', function () {
        const compiledRules = new compiledRules_1.CompiledRules([
            {
                'id': 1,
                'rule': 'scope1:resource1:read'
            },
            {
                'id': 2,
                'rule': 'scope1:resource1:*'
            },
            {
                'id': 3,
                'rule': '!scope1:resource1/[6, 7, 8]:update'
            },
        ]);
        const abilityChecker = new abilityChecker_1.AbilityChecker(compiledRules);
        (0, vitest_1.expect)(abilityChecker.can('update', 'resource1', 'scope1', 666))
            .toBe(true);
    });
    (0, vitest_1.it)('must return true when the rule is matched with user abilities', function () {
        const compiledRules = new compiledRules_1.CompiledRules([
            {
                'id': 1,
                'rule': 'scope2:resource1:read'
            },
            {
                'id': 2,
                'rule': '!scope1:resource1/666:update'
            },
            {
                'id': 3,
                'rule': 'scope1:resource1/[6, 7, 8]:update'
            },
            {
                'id': 4,
                'rule': 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);
        const abilityChecker = new abilityChecker_1.AbilityChecker(compiledRules);
        (0, vitest_1.expect)(abilityChecker.can('update', 'resource1', 'scope2', 7))
            .toBeTruthy();
    });
    (0, vitest_1.it)('must return false when the rule is unmatched with user abilities', function () {
        const compiledRules = new compiledRules_1.CompiledRules([
            {
                'id': 1,
                'rule': 'scope2:resource1:read'
            },
            {
                'id': 2,
                'rule': '!scope1:resource1/666:update'
            },
            {
                'id': 3,
                'rule': 'scope1:resource1/{"author": 667}:update'
            },
            {
                'id': 4,
                'rule': 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);
        const abilityChecker = new abilityChecker_1.AbilityChecker(compiledRules);
        (0, vitest_1.expect)(abilityChecker.can('update', 'resource1', 'scope1', { 'author': 666 }))
            .toBeFalsy();
    });
});
(0, vitest_1.describe)('cannot() feature function test', function () {
    (0, vitest_1.it)('must return true when the user cannot access the resource', function () {
        const compiledRules = new compiledRules_1.CompiledRules([
            {
                'id': 1,
                'rule': 'scope2:resource1:read'
            },
            {
                'id': 2,
                'rule': '!scope1:resource1/666:update'
            },
            {
                'id': 3,
                'rule': 'scope1:resource1/{"author": 667}:update'
            },
            {
                'id': 4,
                'rule': 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);
        const user = new abilityChecker_1.AbilityChecker(compiledRules);
        (0, vitest_1.expect)(user.cannot('update', 'resource1', 'scope1', { 'author': 666 }))
            .toBeTruthy();
    });
});
(0, vitest_1.describe)('hasRule() feature function test', function () {
    (0, vitest_1.it)('must return true when the rule exactly found on the user abilities', function () {
        const compiledRules = new compiledRules_1.CompiledRules([
            {
                'id': 1,
                'rule': 'scope2:resource1:read'
            },
            {
                'id': 2,
                'rule': '!scope1:resource1/666:update'
            },
            {
                'id': 3,
                'rule': 'scope1:resource1/{"author": 667}:update'
            },
            {
                'id': 4,
                'rule': 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);
        const user = new abilityChecker_1.AbilityChecker(compiledRules);
        (0, vitest_1.expect)(user.hasRule(ruleCompiler_1.RuleCompiler.compile('scope2:resource1/[6, 7, 8]:update')))
            .toBeTruthy();
    });
    (0, vitest_1.it)('must return false when the rule is not found on the user abilities', function () {
        const compiledRules = new compiledRules_1.CompiledRules([
            {
                'id': 1,
                'rule': 'scope2:resource1:read'
            },
            {
                'id': 2,
                'rule': '!scope1:resource1/666:update'
            },
            {
                'id': 3,
                'rule': 'scope1:resource1/{"author": 667}:update'
            },
            {
                'id': 4,
                'rule': 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);
        const user = new abilityChecker_1.AbilityChecker(compiledRules);
        (0, vitest_1.expect)(user.hasRule(ruleCompiler_1.RuleCompiler.compile('scope2:resource1/[8, 9]:update')))
            .toBeFalsy();
    });
});
