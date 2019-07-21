/**
 * @file test suites for strings 
 */
import {
    convertStringToCamelCase,
    convertStringToSnakeCase,
    convertStringToTitleCase
} from '../../utils';
describe('Utils files should run as expected, convert string to snake case ', () => {
    it('Should convert a camelcase element to a snake case element ', () => {
        expect(convertStringToSnakeCase('camelCase')).toBe('camel_case');
    });
    it('Should convert title case to snake case ', () => {
        expect(convertStringToSnakeCase('CamelCase')).toBe('camel_case');
    });
    it('Should convert a camelcase element to a snake case element ', () => {
        expect(convertStringToSnakeCase('camelCase')).toBe('camel_case');
    });
    it('Should convert title case to snake case ', () => {
        expect(convertStringToSnakeCase('CamelCase')).toBe('camel_case');
    });

})
describe('Utils files should run as expected , covert string to title case ', () => {
    it('Should convert a word  to a title case', () => {
        expect(convertStringToTitleCase('camelCase')).toBe('Camelcase');
    });
})
describe('Utils files should run as expected, covert string to Camel case ', () => {
    it('Should convert a camelcase element to a snake case element ', () => {
        expect(convertStringToCamelCase('camel_case')).toBe('camelCase');
    });
    it('Should convert title case to camel case ', () => {
        expect(convertStringToCamelCase('Camel_Case')).toBe('camelCase');
    });
    it('Should convert a camelcase element to camel case element ', () => {
        expect(convertStringToCamelCase('Camel')).toBe('camel');
    });
});