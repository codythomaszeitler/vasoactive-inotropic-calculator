import { describe, expect, it } from '@jest/globals';
import { IV, multDoseCalculation } from '../src/iv';
import { NonNegativeNumber } from '../src/non.negative.number';
import { multDoseCalcWithWeight, PersonBuilder } from '../src/person';
import { VisCalculator } from '../src/vis.calc';

describe('vis calc', () => {

    it('should be able to take config and view model and compute score', () => {
        const config = {
            ivs: [
                {
                    name: 'Vasopressin',
                    label: 'Vasopressin (ug/kg/min)',
                    term: multDoseCalcWithWeight(NonNegativeNumber.get(10000))
                },
                {
                    name: 'Epinephrine',
                    label: 'Epinephrine (ug/kg/min)',
                    term: multDoseCalculation(NonNegativeNumber.get(100))
                },
                {
                    name: 'Milrinone',
                    label: 'Milrinone (ug/kg/min)',
                    term: multDoseCalculation(NonNegativeNumber.get(10))
                }
            ]
        }

        const vasopressinIV = new IV('Vasopressin', NonNegativeNumber.get(.5));
        const epinephrineIV = new IV('Epinephrine', NonNegativeNumber.get(2));
        const milrinoneIV = new IV('Milrinone', NonNegativeNumber.get(3));

        const testObject = new VisCalculator(config);

        const builder = new PersonBuilder();
        builder.setWeight(NonNegativeNumber.get(82));
        builder.addIV(epinephrineIV);
        builder.addIV(milrinoneIV);
        builder.addIV(vasopressinIV);

        const person = builder.build();

        const result = testObject.calc(person);

        const expected = NonNegativeNumber.get(291);
        expect(result).toEqual(expected);
    });
});