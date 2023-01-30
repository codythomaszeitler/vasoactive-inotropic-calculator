import { IvConfig, VisCalcConfig } from "./config.schema";
import { IV } from "./iv";
import { NonNegativeNumber } from "./non.negative.number";
import { Person } from "./person";

export class VisCalculator {

    private config : VisCalcConfig;

    public constructor(config : VisCalcConfig) {
        this.config = config;
    }

    public calc(person : Person) : NonNegativeNumber {
        let result = NonNegativeNumber.get(0);
        person.getIVs().forEach((iv : IV) => {
            const ivConfig = this.getIvConfigFor(iv.getName());
            const termScore = ivConfig.term(iv, person);
            result = result.add(termScore);
        });

        return result.ceil();
    }

    private getIvConfigFor(name : string) : IvConfig {
        let found = null;
        for (const ivConfig of this.config.ivs) {
            if (ivConfig.name === name) {
                found = ivConfig;
            }    
        } 
        return found;
    }
}
