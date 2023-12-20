"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const scope_1 = require("./scope");
(0, vitest_1.it)("must throw error when passing empty/blank argument on 'scope' ", () => {
    (0, vitest_1.expect)(() => new scope_1.Scope('  ')).toThrowError('Scope must not be empty');
});
(0, vitest_1.test)("Must use 'global' when using default argument", () => {
    (0, vitest_1.expect)((new scope_1.Scope()).get()).toBe('global');
});
(0, vitest_1.test)("Successfully define specific action", () => {
    (0, vitest_1.expect)("" + (new scope_1.Scope('some_scope'))).toBe('some_scope');
});
