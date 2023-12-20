"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const resource_1 = require("./resource");
(0, vitest_1.it)("must throw error when passing empty/blank argument on 'resource' ", () => {
    (0, vitest_1.expect)(() => new resource_1.Resource('  ')).toThrowError('Resource must not be empty');
});
(0, vitest_1.describe)("toString function test", () => {
    (0, vitest_1.test)("successfully encode without field", () => {
        (0, vitest_1.expect)("" + new resource_1.Resource("some_resource")).toBe('some_resource/*');
    });
    (0, vitest_1.test)("successfully encode with array field", () => {
        (0, vitest_1.expect)("" + new resource_1.Resource("some_resource", [1, 2]))
            .toBe('some_resource/[1,2]');
    });
    (0, vitest_1.test)("successfully encode with json object field", () => {
        (0, vitest_1.expect)("" + new resource_1.Resource("some_resource", {
            'some_field': 'some_value'
        })).toBe('some_resource/{"some_field":"some_value"}');
    });
    (0, vitest_1.test)("successfully encode with non json field", () => {
        (0, vitest_1.expect)("" + new resource_1.Resource("some_resource", 'non_json_field'))
            .toBe('some_resource/non_json_field');
    });
});
(0, vitest_1.describe)("allField() function test", () => {
    (0, vitest_1.it)('must return true when field property is empty', () => {
        (0, vitest_1.expect)((new resource_1.Resource("some_resource")).allField()).toBe(true);
    });
    (0, vitest_1.it)('must return true when field property is star', () => {
        (0, vitest_1.expect)((new resource_1.Resource("some_resource", '*')).allField()).toBe(true);
    });
    (0, vitest_1.it)('must return false when field property is neither star and empty', () => {
        (0, vitest_1.expect)((new resource_1.Resource("some_resource", 'some_field')).allField()).toBe(false);
    });
});
/**
 * matchField() Precedence
 *  1. Star-<field> rules or Empty-<field> rules         --> jobs:vacancies/*:update or jobs:vacancies:update
 *  2. Single-<field> rules                              --> jobs:vacancies/2:update
 *  3. Array-<field> rules (OR method)                   --> jobs:vacancies/[4, 5, 6]:update
 *  4. Object-<field> rules (AND method per attributes)  --> jobs:vacancies/{"authoredBy": 22}:update
 */
(0, vitest_1.describe)('matchField() function test', () => {
    (0, vitest_1.it)('must return true if the resource rule has star field', () => {
        (0, vitest_1.expect)((new resource_1.Resource('some_resource')).matchField('some_field')).toBe(true);
    });
    (0, vitest_1.it)('must return false if the argument is empty', () => {
        (0, vitest_1.expect)((new resource_1.Resource('some_resource', 'some_field')).matchField(null)).toBe(false);
    });
    (0, vitest_1.it)('must return true if match the single field ', () => {
        (0, vitest_1.expect)((new resource_1.Resource('some_resource', 'some_field')).matchField('some_field')).toBe(true);
    });
    (0, vitest_1.it)('must return false if fields does not contains the field argument ', () => {
        (0, vitest_1.expect)((new resource_1.Resource('some_resource', [1, 2, 3, 4, 5])).matchField([4, 10, 3])).toBe(false);
    });
    (0, vitest_1.it)('must return true if fields contains the field argument ', () => {
        (0, vitest_1.expect)((new resource_1.Resource('some_resource', [1, 2, 3, 4, 5])).matchField([2, 4])).toBe(true);
    });
    (0, vitest_1.it)('must return true if fields contains exactly one field argument ', () => {
        (0, vitest_1.expect)((new resource_1.Resource('some_resource', [1, 2, 3, 4, 5])).matchField(5)).toBe(true);
    });
    (0, vitest_1.it)('must return true if field object match exactly with argument', () => {
        const t = {
            'author': 'john',
            'age': 5
        };
        (0, vitest_1.expect)((new resource_1.Resource('some_resource', {
            'author': 'john',
            'age': 5
        })).matchField({
            'author': 'john',
            'age': 5
        })).toBe(true);
    });
    (0, vitest_1.it)('must return false if field object doesnt match exactly with argument', () => {
        (0, vitest_1.expect)((new resource_1.Resource('some_resource', {
            'author': 'john',
            'age': 5
        })).matchField({
            'author': 'john',
            'age': 10
        })).toBe(false);
    });
});
