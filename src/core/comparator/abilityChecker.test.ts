import { describe, it, test, expect } from "vitest";
import { CompiledRules } from "../objects/compiledRules";
import { AbilityChecker } from "./abilityChecker";
import { RuleCompiler } from "../compiler/ruleCompiler";

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

describe('can() feature function test', function () {
    it('must return false when the user have inverted rule', function () {
        const compiledRules = new CompiledRules([
            {
                id : 1,
                rule : 'scope2:resource1:read'
            },
            {
                id : 2,
                rule : '!scope1:resource1/666:update'
            },
            {
                id : 3,
                rule : 'scope1:resource1/[6, 7, 8]:update'
            },
            {
                id : 4,
                rule : 'scope2:resource1/[6, 7, 8]:update'
            },
            {
                id : 5,
                rule : '!scope2:resource1/7:update'
            },
        ]);

        const abilityChecker = new AbilityChecker(compiledRules);
        expect(abilityChecker.can('update', 'resource1', 'scope2', 7))
            .toBe(false);
    });

    it('must return false when the user have inverted rule with whole (star) action', function () {
        const compiledRules = new CompiledRules([
            {
                id : 1,
                rule : 'scope2:resource1:read'
            },
            {
                id : 2,
                rule : '!scope1:resource1/666:update'
            },
            {
                id : 3,
                rule : 'scope1:resource1/[6, 7, 8]:update'
            },
            {
                id : 4,
                rule : 'scope2:resource1/[6, 7, 8]:update'
            },
            {
                id : 5,
                rule : 'scope2:resource1:*'
            },
            {
                id : 6,
                rule : '!scope2:resource1/7:*'
            },
            {
                id : 7,
                rule : 'scope2:resource1/7:update'
            },
        ]);

        const abilityChecker = new AbilityChecker(compiledRules);
        expect(abilityChecker.can('update', 'resource1', 'scope2', 7))
            .toBe(false);
    });

    it('must return true when user have rule with ALL action', function () {
        const compiledRules = new CompiledRules([
            {
                'id' : 1,
                'rule' : 'scope1:resource1:read'
            },
            {
                'id' : 2,
                'rule' : 'scope1:resource1:*'
            },
            {
                'id' : 3,
                'rule' : '!scope1:resource1/[6, 7, 8]:update'
            },
        ]);

        const abilityChecker = new AbilityChecker(compiledRules);
        expect(abilityChecker.can('update', 'resource1', 'scope1', 666))
            .toBe(true);
    });

    it('must return true when the rule is matched with user abilities', function () {
        const compiledRules = new CompiledRules([
            {
                'id' : 1,
                'rule' : 'scope2:resource1:read'
            },
            {
                'id' : 2,
                'rule' : '!scope1:resource1/666:update'
            },
            {
                'id' : 3,
                'rule' : 'scope1:resource1/[6, 7, 8]:update'
            },
            {
                'id' : 4,
                'rule' : 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);

        const abilityChecker = new AbilityChecker(compiledRules);
        expect(abilityChecker.can('update', 'resource1', 'scope2', 7))
            .toBeTruthy();
    });

    it('must return false when the rule is unmatched with user abilities', function () {
        const compiledRules = new CompiledRules([
            {
                'id' : 1,
                'rule' : 'scope2:resource1:read'
            },
            {
                'id' : 2,
                'rule' : '!scope1:resource1/666:update'
            },
            {
                'id' : 3,
                'rule' : 'scope1:resource1/{"author": 667}:update'
            },
            {
                'id' : 4,
                'rule' : 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);

        const abilityChecker = new AbilityChecker(compiledRules);
        expect(abilityChecker.can('update', 'resource1', 'scope1', {'author' : 666}))
            .toBeFalsy();
    });

    it('must return as expected when has inverted specific action and whole field rule compared with rule that has specific field with whole action', function () {
        const compiledRules = new CompiledRules([
            {
                'id' : 2,
                'rule' : '!scope1:resource1/*:review'
            },
            {
                'id' : 3,
                'rule' : 'scope1:resource1/{"author": 667}:*'
            }
        ]);

        const abilityChecker = new AbilityChecker(compiledRules);
        expect(abilityChecker.can('update', 'resource1', 'scope1', {'author' : 667}))
            .toBe(true);
        expect(abilityChecker.can('update', 'resource1', 'scope1'))
            .toBe(false);
        expect(abilityChecker.can('*', 'resource1', 'scope1'))
            .toBe(false);
        expect(abilityChecker.can('review', 'resource1', 'scope1', {'author' : 667}))
            .toBe(false);
        expect(abilityChecker.can('review', 'resource1', 'scope1'))
            .toBe(false);
        expect(abilityChecker.can('review', 'resource1', 'scope1', {'author' : 666}))
            .toBe(false);
    });
});

describe('cannot() feature function test', function () {
    it('must return true when the user cannot access the resource', function () {
        const compiledRules = new CompiledRules([
            {
                'id' : 1,
                'rule' : 'scope2:resource1:read'
            },
            {
                'id' : 2,
                'rule' : '!scope1:resource1/666:update'
            },
            {
                'id' : 3,
                'rule' : 'scope1:resource1/{"author": 667}:update'
            },
            {
                'id' : 4,
                'rule' : 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);

        const user = new AbilityChecker(compiledRules);
        expect(user.cannot('update', 'resource1', 'scope1', {'author' : 666}))
            .toBe(true);
    });
});

describe('hasExactRule() feature function test', function () {
    it('must return true when the rule exactly found on the user abilities', function () {
        const compiledRules = new CompiledRules([
            {
                'id' : 1,
                'rule' : 'scope2:resource1:read'
            },
            {
                'id' : 2,
                'rule' : '!scope1:resource1/666:update'
            },
            {
                'id' : 3,
                'rule' : 'scope1:resource1/{"author": 667}:update'
            },
            {
                'id' : 4,
                'rule' : 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);

        const user = new AbilityChecker(compiledRules);
        expect(user.hasExactRule(RuleCompiler.compile('scope2:resource1/[6, 7, 8]:update')))
            .toBe(true);
    });

    it('must return false when the rule is not found on the user abilities', function () {
        const compiledRules = new CompiledRules([
            {
                'id' : 1,
                'rule' : 'scope2:resource1:read'
            },
            {
                'id' : 2,
                'rule' : '!scope1:resource1/666:update'
            },
            {
                'id' : 3,
                'rule' : 'scope1:resource1/{"author": 667}:update'
            },
            {
                'id' : 4,
                'rule' : 'scope2:resource1/[6, 7, 8]:update'
            },
        ]);

        const user = new AbilityChecker(compiledRules);
        expect(user.hasExactRule(RuleCompiler.compile('scope2:resource1/[8, 9]:update')))
            .toBe(false);
    });
});
