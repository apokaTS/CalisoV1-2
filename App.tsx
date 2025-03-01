import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import Home from './src/screens/Home';
import AddTask from './src/screens/AddTask';
import BottomBarNavigation from './src/components/BottomBarNavigation/BottomBarNavigation';
import CompletedTask from './src/screens/CompletedTask';
import TaskDetails from './src/screens/TaskDetails';

function App(): React.JSX.Element {
  const taskList = [
    {id: 0, desc: 'Hacer 20 planas'},
    {id: 1, desc: 'PROCRASTINAR'},
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

  const [itemIndexted, setItemIndexted] = useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.mainContainer}>
          <ImageBackground
            style={styles.backgroundContainer}
            source={require('./src/assets/calisobg.png')}>
            {navigate === 'Home' ? (
              <Home
                data={arrayTask}
                onPressItem={index => {
                  setNavigate('TaskDetails');
                  setItemIndexted(index);
                }}
              />
            ) : navigate === 'AddTask' ? (
              <AddTask />
            ) : navigate === 'CompletedTask' ? (
              <CompletedTask />
            ) : (
              <TaskDetails data={arrayTask} itemDetails={itemIndexted} />
            )}
          </ImageBackground>
        </View>
      </ScrollView>
      <View style={styles.buttonBottom}>
        <BottomBarNavigation
          onPressTask={() => setNavigate('CompletedTask')}
          onPressAdd={() => setNavigate('AddTask')}
          onPressHome={() => setNavigate('Home')}
        />
      </View>
    </SafeAreaView>
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
    width: '100%',
  },
});

export default App;
