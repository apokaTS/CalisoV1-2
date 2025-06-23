import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { FilterLabelTypes } from '../../utils/types/components';

/**
 * Componente para mostrar una etiqueta de filtro con opción de cerrar.
 * @param {FilterLabelTypes} props - Props del componente.
 * @property {string} label - Texto que se muestra en la etiqueta.
 * @property {() => void} onClose - Función que se ejecuta al presionar el botón de cerrar.
 * @returns {JSX.Element}
 */
const FilterLabel = ({label = 'default', onClose}: FilterLabelTypes) => {
  return (
    <View style={styles.mainContainer}>
      {/* Texto de la etiqueta */}
      <Text style={styles.textLabel}>{label}</Text>
      {/* Botón para cerrar/eliminar la etiqueta */}
      <TouchableOpacity onPress={onClose}>
        <Icon name="close" color={'#FFF'} size={32} />
      </TouchableOpacity>
    </View>
  );
};

export default FilterLabel;

const styles = StyleSheet.create({
  // Contenedor principal de la etiqueta
  mainContainer: {
    backgroundColor: '#2C2C2C',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 60,
    alignItems: 'center',
  },
  // Estilo del texto de la etiqueta
  textLabel: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFF',
    marginRight: 15,
  },
});
