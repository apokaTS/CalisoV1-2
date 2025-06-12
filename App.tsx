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
  // Puedes dejar este array como fallback si el fetch falla
  const taskList = [
    {id: 0, desc: 'Hacer 20 planas'},
    {id: 1, desc: 'PROCRASTINAR'},
  ];

  const [arrayTask, setArratyTask] = useState(taskList);
  const [navigate, setNavigate] = useState<string>('Home');
  const [itemIndexted, setItemIndexted] = useState<number>(0);

  // Función para transformar los datos del backend al formato esperado por Home
  const transformTasks = (tasksFromBackend: any[]) => {
    return tasksFromBackend.map(task => ({
      titleText: task.titleText,
      descText: task.descText,
      inicio: task.createdAt ? new Date(task.createdAt).toLocaleDateString() : '',
      final: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
      status: task.isCompleted ? 'Completada' : 'Pendiente',
      filter: task.isCompleted ? 'Vencidas' : 'Nuevas', // Ajusta según tu lógica de filtros
    }));
  };

  const getTask = async () => {
    try {
      const response = await fetch('http://192.168.3.122:3000/tasks', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      const data = await response.json();
      const transformed = transformTasks(data);
      setArratyTask(transformed);
      return transformed;
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
      {navigate === 'CompletedTask' ? (
        <CompletedTask data={arrayTask.filter(t => t.status === 'Completada')} />
      ) : (
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
              ) : (
                <TaskDetails data={arrayTask} itemDetails={itemIndexted} />
              )}
            </ImageBackground>
          </View>
        </ScrollView>
      )}
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
