import React, {useState, useEffect} from 'react';
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

  const [arrayTask, setArratyTask] = useState(taskList);

  const [navigate, setNavigate] = useState<string>('Home');

  const [itemIndexted, setItemIndexted] = useState<number>(0);

  const getTask = async () => {
    try {
      const response = await fetch('http://192.168.3.122:3000/tasks', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      const data = await response.json();
      console.log('Tareas obtenidas:', JSON.stringify(data, null, 2));
      setArratyTask(data);
      return data;
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      return [];
    }
  };

  useEffect(() => {
  if (navigate === 'Home') {
    getTask();
  }
}, [navigate]);

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
