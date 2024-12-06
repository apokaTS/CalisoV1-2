import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import BasicButton from '../components/BasicButton/BasicButton';

const AddTask = () => {
  const [titleText, setTitleText] = useState<string>('');
  const [descText, setDescText] = useState<string>('');

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Agregar Recordatorios</Text>
      <View>
        <TextInput
          style={styles.textInput1}
          value={titleText}
          onChangeText={newTitleText => setTitleText(newTitleText)}
        />
      </View>
      <View>
        <TextInput style={styles.textInput2} value={descText} onChangeText={newDescText => setDescText(newDescText)} />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.textDate}>Fecha Limite</Text>
      </View>
      <View style={styles.containerBottom}>
        <BasicButton
          onPress={() => console.log('Funcionando')}
          text="Crear"
          variant={1}
        />
      </View>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 30,
    alignContent: 'center',
  },

  titleText: {
    fontSize: 34,
    color: 'white',
  },

  textInput1: {
    height: 40,
    width: 360,
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  textInput2: {
    height: 130,
    width: 360,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  dateContainer: {
    paddingTop: 25,
    flexDirection: 'row',
  },

  datePickerContainer: {
    width: 10,
    height: 10,
    backgroundColor: 'white',
  },

  textDate: {
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
  },

  containerBottom: {
    marginTop: 350,
  },
});
