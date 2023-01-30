import { describe, expect, it } from '@jest/globals';

import { MultDoseFactory } from '../src/mult.dose';
import { NonNegativeNumber } from '../src/non.negative.number';

describe('mult.dose', () => {
    it('should be able to create function that multiplies by an input', () => {
        const testObject = new MultDoseFactory();

        const func = testObject.generate(NonNegativeNumber.get(5.0));

        const result = func(NonNegativeNumber.get(3.0));
        expect(result.equals(NonNegativeNumber.get(15.0))).toBeTruthy();
    });
});