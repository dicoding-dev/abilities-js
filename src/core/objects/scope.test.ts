import { it, test, expect } from "vitest";
import { Scope } from "./scope";

it("must throw error when passing empty/blank argument on 'scope' ", () => {
    expect(() => new Scope('  ')).toThrowError('Scope must not be empty')
});

it("must throw error when passing invalid scope name", () => {
    expect(() => new Scope('scope!')).toThrowError(
        'Invalid scope naming. Please use a combination of lowercase letter, number, dash and underscore only'
    );
});

test("Must use 'global' when using default argument", () => {
    expect((new Scope()).get()).toBe('global');
});

test("Successfully define specific action", () => {
    expect("" + (new Scope('some_scope'))).toBe('some_scope');
});