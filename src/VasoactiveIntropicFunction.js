export function vasocativeIntropicFunction(params) {
    const dopamine = params.dopamine;
    const dobutamine = params.dobutamine;
    const epinephrine = params.epinephrine;
    const norepinephrine = params.norepinephrine;
    const milrinone = params.milrinone;
    const vasopression = params.vasopression;

    return dopamine + dobutamine + (100 * epinephrine) + (10 * milrinone) + (10000 * vasopression) + (100 * norepinephrine);
}