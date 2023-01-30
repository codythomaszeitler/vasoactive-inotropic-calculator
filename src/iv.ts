import { NonNegativeNumber } from "./non.negative.number";


export class IV {
    private name: string;
    private value: NonNegativeNumber;

    constructor(name: string, value: NonNegativeNumber) {
        this.name = name;
        this.value = value;
    }

    public getName(): string {
        return this.name;
    }

    public getValue(): NonNegativeNumber {
        return this.value;
    }

    public copy() : IV {
        return new IV(this.getName(), this.getValue()); 
    }
}

type IVMultiplier = (iv : IV) => NonNegativeNumber;

export function multDoseCalculation(value : NonNegativeNumber) : IVMultiplier {
    return (iv : IV) => {
        return iv.getValue().mult(value);
    }
}