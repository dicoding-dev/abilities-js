import { expect, it, test } from 'vitest';
import { Action } from "./action";

it('must fail when assigned with empty value', () => {
    expect(() => new Action('  ')).toThrowError('Action must not be empty');
});

it('must throw error when passing invalid action name', () => {
    expect(() => new Action('read!')).toThrowError(
        'Invalid action naming. Please use a combination of lowercase letter, number, dash and underscore only or a single star (*) character'
    );
});

it("must throw error when passing more than one star action", () => {

    expect(() => new Action('**')).toThrowError(
        'Invalid action naming. Please use a combination of lowercase letter, number, dash and underscore only or a single star (*) character'
    );
});

test("Must use star symbol when using default argument", function () {
    expect((new Action()).get()).toBe('*');
});

test("Successfully define specific action", function () {
    expect("" + (new Action('read'))).toBe('read');
});

it('can know if the action is whole action (star)', function () {
    expect((new Action('*')).wholeAction()).toBe(true);
});