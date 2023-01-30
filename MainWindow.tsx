import { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Button, StyleSheet, ShadowPropTypesIOS } from 'react-native';
import { getConfig } from './config';
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
            const name = key;

            const value = NonNegativeNumber.get(this.values[name]);

            const iv = new IV(name, value);
            builder.addIV(iv);
        }

        const person = builder.build();
        const calculator = new VisCalculator(config);
        const result = calculator.calc(person);

        this.setState({
            showCalculation: true,
            calculation: result.valueOf()
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={{
                        flex: 1
                    }}>
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
                            alignItems: 'stretch'
                        }}>
                            <NumberInput title="Weight" apiName={"Weight"} onChange={(event) => {
                                this.weight = event.value;
                            }}></NumberInput>
                        </View>
                        {config.ivs.map((ivInput) => {
                            return (<View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'stretch'
                            }}>
                                <NumberInput key={ivInput.name} title={ivInput.label} apiName={ivInput.name} onChange={(event) => {
                                    this.values[event.name] = event.value;
                                }}></NumberInput>
                            </View>);
                        })}
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {this.state.showCalculation && <Text>{this.state.calculation}</Text>}
                        </View>
                        <Button title='Calculate' onPress={() => {
                            this.calculate();
                        }}></Button>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}