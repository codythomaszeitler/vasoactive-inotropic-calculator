import { IV } from "./iv";
import { NonNegativeNumber } from "./non.negative.number";

export class Person {
    private readonly weight: NonNegativeNumber;
    private readonly ivs: Array<IV>;

    constructor(weight: NonNegativeNumber, ivs: Array<IV>) {
        this.weight = weight;
        this.ivs = ivs;
    }

    public getIVs(): Array<IV> {
        return [...this.ivs];
    }

    public getWeight(): NonNegativeNumber {
        return this.weight;
    }
}

export class PersonBuilder {

    private weight: NonNegativeNumber;
    private ivs: Array<IV>;

    constructor() {
        this.weight = NonNegativeNumber.get(0);
        this.ivs = [];
    }

    public setWeight(weight: NonNegativeNumber) {
        this.weight = weight;
    }

    public addIV(iv: IV) {
        this.ivs.push(iv.copy());
    }

    public build(): Person {
        return new Person(this.weight, this.ivs);
    }
}

type PersonIVMultiplier = (iv : IV, person : Person) => NonNegativeNumber;
export function multDoseCalcWithWeight(multiplier : NonNegativeNumber) : PersonIVMultiplier {
    return (iv: IV, person : Person) => {
        const weight = person.getWeight();
        const umin = iv.getValue().div(weight);
        return umin.mult(multiplier);
    }
}