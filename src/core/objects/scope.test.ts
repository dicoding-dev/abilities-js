import { it, test, expect } from "vitest";
import { Scope } from "./scope";

it("must throw error when passing empty/blank argument on 'scope' ", () => {
    expect(() => new Scope('  ')).toThrowError('Scope must not be empty')
});

test("Must use 'global' when using default argument", () => {
    expect((new Scope()).get()).toBe('global');
});

test("Successfully define specific action", () => {
    expect("" + (new Scope('some_scope'))).toBe('some_scope');
});