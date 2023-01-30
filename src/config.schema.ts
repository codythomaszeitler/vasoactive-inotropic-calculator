import { IV } from "./iv";
import { NonNegativeNumber } from "./non.negative.number";
import { Person } from "./person";

type IvScoreCalc = (iv : IV, person? : Person) => NonNegativeNumber;

export type IvConfig = {
    readonly name: string;
    readonly label: string;
    readonly term: IvScoreCalc;
}

export type VisCalcConfig = {
    ivs: Array<IvConfig>;
}