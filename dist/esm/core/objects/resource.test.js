import { expect, it, test, describe } from "vitest";
import { Resource } from "./resource";
it("must throw error when passing empty/blank argument on 'resource' ", () => {
    expect(() => new Resource('  ')).toThrowError('Resource must not be empty');
});
describe("toString function test", () => {
    test("successfully encode without field", () => {
        expect("" + new Resource("some_resource")).toBe('some_resource/*');
    });
    test("successfully encode with array field", () => {
        expect("" + new Resource("some_resource", [1, 2]))
            .toBe('some_resource/[1,2]');
    });
    test("successfully encode with json object field", () => {
        expect("" + new Resource("some_resource", {
            'some_field': 'some_value'
        })).toBe('some_resource/{"some_field":"some_value"}');
    });
    test("successfully encode with non json field", () => {
        expect("" + new Resource("some_resource", 'non_json_field'))
            .toBe('some_resource/non_json_field');
    });
});
describe("allField() function test", () => {
    it('must return true when field property is empty', () => {
        expect((new Resource("some_resource")).allField()).toBe(true);
    });
    it('must return true when field property is star', () => {
        expect((new Resource("some_resource", '*')).allField()).toBe(true);
    });
    it('must return false when field property is neither star and empty', () => {
        expect((new Resource("some_resource", 'some_field')).allField()).toBe(false);
    });
});
/**
 * matchField() Precedence
 *  1. Star-<field> rules or Empty-<field> rules         --> jobs:vacancies/*:update or jobs:vacancies:update
 *  2. Single-<field> rules                              --> jobs:vacancies/2:update
 *  3. Array-<field> rules (OR method)                   --> jobs:vacancies/[4, 5, 6]:update
 *  4. Object-<field> rules (AND method per attributes)  --> jobs:vacancies/{"authoredBy": 22}:update
 */
describe('matchField() function test', () => {
    it('must return true if the resource rule has star field', () => {
        expect((new Resource('some_resource')).matchField('some_field')).toBe(true);
    });
    it('must return false if the argument is empty', () => {
        expect((new Resource('some_resource', 'some_field')).matchField(null)).toBe(false);
    });
    it('must return true if match the single field ', () => {
        expect((new Resource('some_resource', 'some_field')).matchField('some_field')).toBe(true);
    });
    it('must return false if fields does not contains the field argument ', () => {
        expect((new Resource('some_resource', [1, 2, 3, 4, 5])).matchField([4, 10, 3])).toBe(false);
    });
    it('must return true if fields contains the field argument ', () => {
        expect((new Resource('some_resource', [1, 2, 3, 4, 5])).matchField([2, 4])).toBe(true);
    });
    it('must return true if fields contains exactly one field argument ', () => {
        expect((new Resource('some_resource', [1, 2, 3, 4, 5])).matchField(5)).toBe(true);
    });
    it('must return true if field object match exactly with argument', () => {
        const t = {
            'author': 'john',
            'age': 5
        };
        expect((new Resource('some_resource', {
            'author': 'john',
            'age': 5
        })).matchField({
            'author': 'john',
            'age': 5
        })).toBe(true);
    });
    it('must return false if field object doesnt match exactly with argument', () => {
        expect((new Resource('some_resource', {
            'author': 'john',
            'age': 5
        })).matchField({
            'author': 'john',
            'age': 10
        })).toBe(false);
    });
});
