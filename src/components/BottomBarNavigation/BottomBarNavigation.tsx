import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

/**
 * Props para la barra de navegación inferior.
 * @property {() => void} onPressHome - Función al presionar el botón de inicio.
 * @property {() => void} onPressAdd - Función al presionar el botón de agregar tarea.
 * @property {() => void} onPressTask - Función al presionar el botón de tareas.
 */
type BottomBarNavigationProps = {
  onPressHome: () => void;
  onPressAdd: () => void;
  onPressTask: () => void;
};

/**
 * Componente de barra de navegación inferior con tres botones:
 * Home, Add y Task.
 * @param {BottomBarNavigationProps} props - Funciones para cada botón.
 * @returns {JSX.Element}
 */
const BottomBarNavigation = ({onPressHome, onPressAdd, onPressTask}: BottomBarNavigationProps) => {
  return (
    <View style={styles.mainContainer}>
      {/* Botón Home */}
      <TouchableOpacity onPress={onPressHome} >
        <Icon name="home" size={30} color={'#FFF'} />
      </TouchableOpacity>
      {/* Botón Agregar Tarea */}
      <TouchableOpacity style={styles.addTaskContainer} onPress={onPressAdd}>
        <Icon name="plus" size={50} color={'#FFF'} />
      </TouchableOpacity>
      {/* Botón Tareas */}
      <TouchableOpacity onPress={onPressTask} >
        <MaterialIcons name="task" size={30} color={'#FFF'}/>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBarNavigation;

const styles = StyleSheet.create({
  // Contenedor principal de la barra
  mainContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#0E2038',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // Estilo para el botón central (Agregar Tarea)
  addTaskContainer: {
    bottom: 10,
    backgroundColor: '#768D9B',
    height: 67,
    width: 67,
    borderRadius: 100,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
