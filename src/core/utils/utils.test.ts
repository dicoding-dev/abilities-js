import { describe, expect, it } from "vitest";
import { isArrayEqual } from './utils';

describe('isArrayEqual() function test', () => {
    it('must return false when the array is not have same length', () => {
        expect(isArrayEqual([1, 2, 3], [1, 2])).toBe(false);
    });
    
    it('must return false when found unmatched item in array', () => {
        expect(isArrayEqual([1, 2, 3], [1, 4, 2])).toBe(false);
    });

    it('must return true when all items is matched', () => {
        expect(isArrayEqual([1, 2, 3, 4, 5], [5, 2, 4, 3, 1])).toBe(true);
    })
});
