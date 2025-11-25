import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, ImageBackground} from 'react-native';
import Home from './src/screens/Home';
import AddTask from './src/screens/AddTask';
import BottomBarNavigation from './src/components/BottomBarNavigation/BottomBarNavigation';
import CompletedTask from './src/screens/CompletedTask';
import TaskDetails from './src/screens/TaskDetails';

/**
 * Constante base para llamadas a la API.
 * Ajusta la IP/host si es necesario para tu entorno.
 */
const API_BASE = 'http://192.168.3.107:3000';

function App(): React.JSX.Element {
  type TaskType = {
    id: string | number;
    titleText: string;
    descText: string;
    inicio: string;
    final: string;
    status: string;
    filter: string;
  };

  const [arrayTask, setArratyTask] = useState<TaskType[]>([]);
  const [navigate, setNavigate] = useState<string>('Home');
  const [itemIndexted, setItemIndexted] = useState<number>(0);

  // transforma datos del backend al formato interno y garantiza id
  const transformTasks = (tasksFromBackend: any[]) =>
    tasksFromBackend.map((task: any, index: number) => ({
      id: task._id ?? task.id ?? index,
      titleText: task.titleText ?? task.title ?? '',
      descText: task.descText ?? task.desc ?? '',
      // cadena legible para mostrar en UI
      inicio: task.createdAt
        ? new Date(task.createdAt).toLocaleDateString()
        : '',
      final: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
      // NUEVOS campos ISO para cálculo de fechas en la UI
      inicioISO: task.createdAt ? new Date(task.createdAt).toISOString() : null,
      finalISO: task.dueDate ? new Date(task.dueDate).toISOString() : null,
      status: task.isCompleted ? 'Completada' : 'Pendiente',
      filter: task.isCompleted ? 'Vencidas' : 'Nuevas',
    }));

  // obtiene tareas desde backend
  const getTask = async () => {
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
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
    // traer tareas al montar
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // toggle local del estado "Completada" por id + opcional sync con backend
  const onToggleComplete = async (id: string | number) => {
    setArratyTask(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'Completada' ? 'Pendiente' : 'Completada',
            }
          : t,
      ),
    );

    // Intento de sincronización al backend (no obligatorio, manejar errores según necesites)
    try {
      await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          isCompleted:
            arrayTask.find(t => t.id === id)?.status !== 'Completada',
        }),
      });
    } catch (err) {
      console.warn(
        'No se pudo sincronizar cambio de completado con el servidor:',
        err,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {navigate === 'CompletedTask' ? (
        // CompletedTask maneja su propio scroll (FlatList). Se pasa solo tareas completadas.
        <CompletedTask
          data={arrayTask.filter(t => t.status === 'Completada')}
        />
      ) : (
        // Resto de pantallas envueltas en ImageBackground sin ScrollView global
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
                onToggleComplete={onToggleComplete}
              />
            ) : navigate === 'AddTask' ? (
              <AddTask
                onCreated={() => {
                  // refrescar lista y volver a Home al crear una tarea nueva
                  getTask();
                  setNavigate('Home');
                }}
              />
            ) : (
              <TaskDetails
                data={arrayTask}
                itemDetails={itemIndexted}
                onToggleComplete={onToggleComplete}
              />
            )}
          </ImageBackground>
        </View>
      )}
      <View style={styles.buttonBottom}>
        <BottomBarNavigation
          onPressTask={() => setNavigate('CompletedTask')}
          onPressAdd={() => setNavigate('AddTask')}
          onPressHome={() => {
            setNavigate('Home');
            getTask();
          }}
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
  buttonBottom: {
    marginTop: 0,
    width: '100%',
  },
});

export default App;
