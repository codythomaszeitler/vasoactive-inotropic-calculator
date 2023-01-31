import React, { Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export function NumberInput(props) {
    const [number, setNumber] = useState('');
    return (<View style={{
        flex: 1
    }}>
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize : '12px'
            }} adjustsFontSizeToFit>{props.title}</Text>
        </View>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row'
        }}>
            <View style={{
                flex: .5
            }}></View>
            <View style={{
                flex: 1,
            }}>
                <TextInput style={{
                    backgroundColor: '#d1d1d1',
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    textAlign : 'center'
                }}
                    textAlign='center'
                    keyboardType='decimal-pad'
                    onChangeText={(valueAsString) => {
                        console.log(valueAsString);
                        const valueAsNumber = parseFloat(valueAsString);
                        setNumber(valueAsNumber);
                        if (props.onChange) {
                            props.onChange({
                                value: valueAsNumber,
                                name: props.apiName
                            });
                        }
                    }}
                ></TextInput>
            </View>
            <View style={{
                flex: .5
            }}></View>
        </View>

    </View>);
}