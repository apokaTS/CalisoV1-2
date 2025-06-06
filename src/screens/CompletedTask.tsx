import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from '../components/CheckBox/CheckBox';

// Datos de ejemplo (puedes reemplazarlos con datos reales)
const completedTasks = [
  { id: '1', title: 'Tarea 1', completed: true },
  { id: '2', title: 'Tarea 2', completed: true },
  { id: '3', title: 'Tarea 3', completed: true },
];

const CompletedTask = () => {
  const renderTask = ({ item }: { item: { id: string; title: string; completed: boolean } }) => (
    <View style={styles.taskContainer}>
      <CheckBox value={item.completed} disabled={true} />
      <Text style={styles.taskText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tareas Completadas</Text>
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </View>
  );
};

export default CompletedTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
