import { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Button, StyleSheet, ShadowPropTypesIOS } from 'react-native';
import { getConfig } from './config';
import { IvConfig } from './src/config.schema';
import { IV } from './src/iv';
import { NonNegativeNumber } from './src/non.negative.number';
import { NumberInput } from './src/NumberInput';
import { PersonBuilder } from './src/person';
import { VisCalculator } from './src/vis.calc';

const config = getConfig();
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: 'column'
    },
});

interface IState {
    showCalculation: boolean,
    calculation: number
}

export class MainWindow extends Component<IState> {
    values;
    weight;

    constructor(props) {
        super(props);
        this.values = {};

        this.state = {
            showCalculation: false,
            calculation: NaN
        }
    }

    calculate() {
        const builder = new PersonBuilder();

        if (this.weight) {
            builder.setWeight(NonNegativeNumber.get(this.weight));
        }

        for (const key of Object.keys(this.values)) {
            if (!Number.isNaN(this.values[key])) {
                if (key === 'Vasopressin' && this.weight && !Number.isNaN(this.weight)) {
                    const name = key;
                    const value = NonNegativeNumber.get(this.values[name]);

                    const iv = new IV(name, value);
                    builder.addIV(iv);
                } else if (key !== 'Vasopressin') {
                    const name = key;
                    const value = NonNegativeNumber.get(this.values[name]);

                    const iv = new IV(name, value);
                    builder.addIV(iv);
                }
            }
        }

        const person = builder.build();
        const calculator = new VisCalculator(config);
        const result = calculator.calc(person);

        this.setState({
            showCalculation: true,
            calculation: result.valueOf()
        });
    }

    getPairs() {
        const pairs = [];

        const getNonVasopressin = () => {
            return config.ivs.filter((ivConfig: IvConfig) => {
                return ivConfig.name !== 'Vasopressin'
            });
        }

        const ivs = getNonVasopressin();
        for (let i = 0; i < ivs.length; i = i + 2) {
            const firstIvConfig = ivs[i];
            const secondIvConfig = ivs[i + 1];

            pairs.push((<View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'stretch',
                flexDirection: 'row'
            }}>
                {this.genNumberInput(firstIvConfig)}
                {secondIvConfig && this.genNumberInput(secondIvConfig)}
            </View>));
        }
        return pairs;
    }

    genNumberInput(ivInput: IvConfig) {
        return (<NumberInput key={ivInput.name} title={ivInput.label} apiName={ivInput.name} onChange={(event) => {
            this.values[event.name] = event.value;
        }}></NumberInput>);
    }

    render() {
        const getVasopressin = () => {
            let found = null;
            for (let ivConfig of config.ivs) {
                if (ivConfig.name === 'Vasopressin') {
                    found = ivConfig;
                    break;
                }
            }
            return found;
        }

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{
                    flex: 1
                }} >
                    <View style={{
                        flex: .75
                    }}></View>
                    <View style={{
                        flex: .5,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: '20',
                            fontWeight: 'bold'
                        }}>Vasoactive-inotropic Calculator</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        flexDirection: 'row'
                    }}>
                        <NumberInput title="Weight" apiName={"Weight"} onChange={(event) => {
                            this.weight = event.value;
                        }}></NumberInput>
                        {this.genNumberInput(getVasopressin())}
                    </View>
                    {this.getPairs()}

                    <View style={{
                        flex: .25
                    }}></View>
                    <View style={{
                        flex: .5,
                        width: '30%',
                        alignSelf: 'center'
                    }}>
                        <Button color='#00aeef' title='Calculate' onPress={() => {
                            this.calculate();
                        }}></Button>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {this.state.showCalculation && <Text>{this.state.calculation}</Text>}
                    </View>
                </View>
            </KeyboardAvoidingView >
        );
    }
}