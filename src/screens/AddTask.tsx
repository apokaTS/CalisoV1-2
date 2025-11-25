import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import BasicButton from '../components/BasicButton/BasicButton';
import DatePicker from '../components/DatePicker/DatePicker';

type AddTaskProps = {
  onCreated?: () => void;
};

const API_BASE = 'http://192.168.3.107:3000';

const AddTask = ({onCreated}: AddTaskProps) => {
  // Título de la tarea
  const [titleText, setTitleText] = useState<string>('');
  // Descripción de la tarea
  const [descText, setDescText] = useState<string>('');
  // Fecha límite (Date)
  const [dueDate, setDueDate] = useState<Date>(new Date());

  const saveTask = async () => {
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          titleText,
          descText,
          dueDate: dueDate.toISOString(),
          isCompleted: false,
          createdAt: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      console.log('Guardado:', data);
      // Limpiar campos
      setTitleText('');
      setDescText('');
      setDueDate(new Date());
      // Llamar callback para refrescar en App
      if (onCreated) onCreated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Agregar Recordatorios</Text>
      <View>
        <TextInput
          style={styles.textInput1}
          value={titleText}
          onChangeText={setTitleText}
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
          onChangeText={setDescText}
          multiline={true}
          numberOfLines={5}
          placeholder="Descripcion"
        />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.staticTextOfDate}>Fecha Limite</Text>
        <DatePicker onDateChange={setDueDate} />
      </View>
      <View style={styles.containerBottom} />
      <BasicButton onPress={saveTask} text="Crear" variant={1} />
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
    paddingHorizontal: 8,
  },

  textInput2: {
    textAlignVertical: 'top',
    height: 130,
    width: 360,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
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
