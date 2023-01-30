
import {describe, expect, it} from '@jest/globals';
import { NonNegativeNumber } from '../src/non.negative.number';

describe('non.negative.number', () => {
    it('should be able to get and compare two non neg numbers', () => {
        const a = NonNegativeNumber.get(1);
        const b = NonNegativeNumber.get(1);

        expect(a.equals(b)).toBeTruthy();
    });

    it('should be able to get and compare two non neg numbers not equals', () => {
        const a = NonNegativeNumber.get(1);
        const b = NonNegativeNumber.get(2);

        expect(a.equals(b)).toBeFalsy();
    });

    it('should throw type error if given negative number', () => {

        let caughtException = new Error();
        try {
            NonNegativeNumber.get(-1); 
        } catch (e) {
            caughtException = (e as Error);
        }
        expect(caughtException.message).toBe('Cannot construct non negative number with negative number [-1].');
    });

    it('should be able to add two non negative numbers', () => {
        const a = NonNegativeNumber.get(1);
        const b = NonNegativeNumber.get(2);

        const result = a.add(b); 
        expect(result.equals(NonNegativeNumber.get(3))).toBeTruthy();
    });

    it('should be able to be multiplied', () => {
        const a = NonNegativeNumber.get(3);
        const b = NonNegativeNumber.get(4);

        const result = a.mult(b); 
        expect(result.equals(NonNegativeNumber.get(12))).toBeTruthy();
    });
});