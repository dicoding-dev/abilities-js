"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const action_1 = require("./action");
(0, vitest_1.it)('must fail when assigned with empty value', () => {
    (0, vitest_1.expect)(() => new action_1.Action('  ')).toThrowError('Action must not be empty');
});
(0, vitest_1.test)("Must use star symbol when using default argument", function () {
    (0, vitest_1.expect)((new action_1.Action()).get()).toBe('*');
});
(0, vitest_1.test)("Successfully define specific action", function () {
    (0, vitest_1.expect)("" + (new action_1.Action('read'))).toBe('read');
});
