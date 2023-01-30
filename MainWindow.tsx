import { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Button, StyleSheet, ShadowPropTypesIOS } from 'react-native';
import { NumberInput } from './src/NumberInput';

import { vasocativeIntropicFunction } from './src/VasoactiveIntropicFunction';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: 'column'
    },
});

const inputs = 
[   'Dopamine (mcg/kg/min)',
    'Dobutamine (ug/kg/min)',
    'Epinephrine (ug/kg/min)',
    'Norepinephrine (ug/kg/min)',
    'Milrinone (ug/kg/min)',
    'Vasopression (mU/kg/min)'];

export class MainWindow extends Component {
    values;

    constructor() {
        super();
        this.values = {};

        this.state = {
            showCalculation: false,
            calculation: NaN
        }
    }

    canRunCalculation(values) {
        const currentlyInputtedNames = Object.keys(values);
        for (const input of inputs) {
            if (!currentlyInputtedNames.includes(input)) {
                console.log('The currently inputted names does not contain everything')
                return false;
            } else {
                if (values[input] === NaN) {
                    console.log('There was a nan somewhere');
                    return false;
                }
            }
        }
        return true;
    }

    convertToDomain(values) {
        const domain = {};

        for (const uiName of Object.keys(values)) {
            if (uiName === 'Dopamine (mcg/kg/min)') {
                domain.dopamine = values[uiName];
            } else if (uiName === 'Dobutamine (ug/kg/min)') {
                domain.dobutamine = values[uiName];
            } else if (uiName === 'Epinephrine (ug/kg/min)') {
                domain.epinephrine = values[uiName];
            } else if (uiName === 'Norepinephrine (ug/kg/min)') {
                domain.norepinephrine = values[uiName];
            } else if (uiName === 'Milrinone (ug/kg/min)') {
                domain.milrinone = values[uiName];
            } else if (uiName === 'Vasopression (mU/kg/min)') {
                domain.vasopression = values[uiName];
            } else {
                throw new Error(uiName + ' was not a supported domain value');
            }
        }
        return domain;
    }

    calculate(values) {
        console.log(values);
        if (!this.canRunCalculation(values)) {
            throw new Error('Should not have called calculate when all ui fields have not been filled out');
        }

        const domain = this.convertToDomain(values);
        return vasocativeIntropicFunction(domain);
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
                        {inputs.map((input) => {
                            return (<View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'stretch'
                            }}>
                                <NumberInput key={input} title={input} onChange={(event) => {
                                    this.values[event.name] = event.value;

                                    const canRunCalculation = this.canRunCalculation(this.values);

                                    if (canRunCalculation) {
                                        this.setState({
                                            showCalculation: canRunCalculation,
                                            calculation: this.calculate(this.values)
                                        });
                                    } else {
                                        this.setState({
                                            showCalculation: canRunCalculation,
                                            calculation: NaN
                                        });
                                    }
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
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}