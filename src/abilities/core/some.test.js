import { expect, test } from "vitest";
import { someFunction } from "./some";

test('must return expected', () => {
    expect(someFunction()).toBe('haha');
});