import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Button } from 'react-native';
import { NumberInput } from './src/NumberInput';

export default function App() {
  const inputs = ['Dopamine (ug/kg/min)',
    'Dobutamine (ug/kg/min)', 
    'Epinephrine (ug/kg/min)', 
    'Norepinephrine (ug/kg/min)', 
    'Milrinone (ug/kg/min)', 
    'Vasopression (mU/kg/min)'];

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
            }}></NumberInput>
          </View>);
          })}
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text>123</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: 'column'
  },
});
