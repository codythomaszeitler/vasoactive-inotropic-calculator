
export class NonNegativeNumber {

    private value : number;

    constructor(value : number) {
        this.value = value;
    }

    // This just has to be the point where an exception
    // would be thrown ? 
    public static get(value : number) : NonNegativeNumber {
        if (value < 0) {
            throw new TypeError(`Cannot construct non negative number with negative number [${value}].`);
        }
        return new NonNegativeNumber(value);
    }

    public equals (number : NonNegativeNumber) : boolean  {
        return this.value === number.value;
    }

    public add (number :NonNegativeNumber) : NonNegativeNumber {
        const result = this.value + number.value;
        return new NonNegativeNumber(result);
    }

    public mult(number : NonNegativeNumber) : NonNegativeNumber {
        const result = this.value * number.value;
        return new NonNegativeNumber(result);
    }
} 