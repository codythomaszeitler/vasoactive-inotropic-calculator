import { NonNegativeNumber } from "./non.negative.number";

type Multiplier = (dose: NonNegativeNumber) => NonNegativeNumber;

export class MultDoseFactory {
    public generate(multiplier: NonNegativeNumber): Multiplier {
        return (dose: NonNegativeNumber) => {
            return multiplier.mult(dose);
        }
    }
}