import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import BasicButton from '../components/BasicButton/BasicButton';
import DatePicker from '../components/DatePicker/DatePicker';

const AddTask = () => {
  //Cambio de variable para el titulo
  const [titleText, setTitleText] = useState<string>('');
  //Cambio de variable para el cambio de descripcion
  const [descText, setDescText] = useState<string>('');

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Agregar Recordatorios</Text>
      <View>
        <TextInput
          style={styles.textInput1}
          value={titleText}
          onChangeText={newTitleText => setTitleText(newTitleText)}
          numberOfLines={1}
          multiline={false}
          maxLength={30}
          placeholder="Titulo"
        />
      </View>
      <View>
        <TextInput
          style={styles.textInput2}
          value={descText}
          onChangeText={newDescText => setDescText(newDescText)}
          multiline={true}
          numberOfLines={5}
          placeholder="Descripcion"
        />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.staticTextOfDate}>Fecha Limite</Text>
        <DatePicker />
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
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlignVertical: 'top',
  },

  dateContainer: {
    height: 55,
    width: '100%',
    top: 30,
    paddingHorizontal: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  staticTextOfDate: {
    fontSize: 25,
    fontWeight: '500',
    color: 'white',
  },

  containerBottom: {
    marginTop: 340,
  },
});
