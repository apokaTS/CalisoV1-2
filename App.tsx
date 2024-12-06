import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import Home from './src/screens/Home';
import AddTask from './src/screens/AddTask';
import ButtonNewTask from './src/components/ButtonNewTask/ButtonNewTask';

function App(): React.JSX.Element {

  const taskList = [
    { id: 0, desc: 'Hacer 20 planas' },
    { id: 1, desc: 'EL CUETE DEL TONA' },
    { id: 2, desc: 'Ensayo de algo' },
  ];

  const arrayTask = [
    {
      title: 'Tarea de Español',
      task: taskList,
      inicio: '9-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
    {
      title: 'Tarea de Filosofia',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
    {
      title: 'Tarea de Matematicas',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#FF9900',
      filter: 'Proxima a vencer',
    },
    {
      title: 'Tarea de Termodinamica',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
    {
      title: 'Tarea de Biologia',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#FF9900',
      filter: 'Proxima a vencer',
    },
    {
      title: 'Tarea de Fisica',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
    {
      title: 'Tarea de Programacion',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#FF0000',
      filter: 'Vencidas',
    },
    {
      title: 'Tarea de Aereonautica',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
  ];

  const [navigate, setNavigate] = useState<string>('Home');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.mainContainer}>
          <ImageBackground
            style={styles.backgroundContainer}
            source={require('./src/assets/calisobg.png')}>
            {navigate === 'Home' ? <Home data={arrayTask} /> : <AddTask text1='' text2=''/>}
          </ImageBackground>
        </View>
      </ScrollView>
        <View style={styles.buttonBottom}>
          <ButtonNewTask
            onPress={() => setNavigate('AddTask')}
          />
        </View>
    </SafeAreaView >
  );

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  backgroundContainer: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    marginBottom: 40,
  },
  buttonBottom: {
    marginTop: 0,
    backgroundColor: '#0E2038',
    alignItems: 'center',
  },
});

export default App;
