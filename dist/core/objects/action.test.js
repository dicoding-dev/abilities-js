import { expect, it, test } from 'vitest';
import { Action } from "./action";
it('must fail when assigned with empty value', () => {
    expect(() => new Action('  ')).toThrowError('Action must not be empty');
});
test("Must use star symbol when using default argument", function () {
    expect((new Action()).get()).toBe('*');
});
test("Successfully define specific action", function () {
    expect("" + (new Action('read'))).toBe('read');
});
