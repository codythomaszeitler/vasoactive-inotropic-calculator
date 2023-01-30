import { VisCalcConfig } from "./src/config.schema";
import { multDoseCalculation } from './src/iv';
import { multDoseCalcWithWeight } from './src/person';
import { NonNegativeNumber } from './src/non.negative.number';

export function getConfig(): VisCalcConfig {
    return {
        ivs: [
            {
                name: 'Vasopressin',
                label: 'Vasopressin (U/kg/min)',
                term: multDoseCalcWithWeight(NonNegativeNumber.get(10000))
            },
            { name: 'Epinephrine', label: 'Epinephrine (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(100)) },
            { name: 'Norepinephrine', label: 'Norepinephrine (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(100)) },
            { name: 'Levosimendan', label: 'Levosimendan (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(50)) },
            { name: 'Olprinone', label: 'Olprinone (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(25)) },
            { name: 'Methylene blue', label: 'Methylene blue (mg/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(20)) },
            { name: 'Milrinone', label: 'Milrinone (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(10)) },
            { name: 'Phenylephrine', label: 'Phenylephrine (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(10)) },
            { name: 'Terlipressin', label: 'Terlipressin (ug/min)', term: multDoseCalculation(NonNegativeNumber.get(10)) },
            { name: 'Angiotensin II', label: 'Angiotensin II (ng/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(0.25)) },
            { name: 'Dobutamine', label: 'Dobutamine (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(1)) },
            { name: 'Dopamine', label: 'Dopamine (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(1)) },
            { name: 'Enoximone', label: 'Enoximone (ug/kg/min)', term: multDoseCalculation(NonNegativeNumber.get(1)) }
        ]
    }
}