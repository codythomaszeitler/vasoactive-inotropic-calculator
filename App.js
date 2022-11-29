import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, Button } from 'react-native';
import { NumberInput } from './src/NumberInput';

export default function App() {
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
            <NumberInput title={'Dopamine (ug/kg/min)'} onChange={(event) => {
              console.log(event);
            }}></NumberInput>
          </View>
          <View style={{
            flex: 1,
          }}>
            <NumberInput title={'Dobutamine (ug/kg/min)'}></NumberInput>
          </View>
          <View style={{
            flex: 1,
          }}>
            <NumberInput title={'Epinephrine (ug/kg/min)'}></NumberInput>
          </View>
          <View style={{
            flex: 1,
          }}>
            <NumberInput title={'Norepinephrine (ug/kg/min)'}></NumberInput>
          </View>
          <View style={{
            flex: 1,
          }}>
            <NumberInput title={'Milrinone (ug/kg/min)'}></NumberInput>
          </View>
          <View style={{
            flex: 1,
          }}>
            <NumberInput title={'Vasopression (mU/kg/min)'}></NumberInput>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent : 'center',
            alignItems : 'center'
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
