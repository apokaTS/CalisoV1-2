import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';

/**
 * Tipos de props para el botón básico.
 * @property {number} [variant] - Variante de color del botón (1, 2 o 3).
 * @property {string} text - Texto que se mostrará en el botón.
 * @property {() => void} onPress - Función que se ejecuta al presionar el botón.
 */
type BasicButtonTypes = {
  variant?: number;
  text: string;
  onPress: () => void;
};

/**
 * Componente de botón reutilizable con variantes de color.
 * @param {BasicButtonTypes} props - Props del botón.
 * @returns {JSX.Element}
 */
const BasicButton = ({variant = 1, text, onPress}: BasicButtonTypes) => {
  /**
   * Selecciona el estilo de color según la variante.
   * @returns {object} Estilo correspondiente a la variante.
   */
  const selectVariant = () => {
    switch (variant) {
      case 2:
        return styles.colorTwo;
      case 3:
        return styles.colorTree;
      default:
        return styles.colorOne;
    }
  };

  return (
    // Botón principal con el estilo y función de presionado
    <TouchableOpacity
      onPress={onPress}
      style={[styles.mainContainer, selectVariant()]}>
      {/* Texto del botón */}
      <Text style={styles.textFormat}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BasicButton;

// Obtiene el ancho de la pantalla para el tamaño del botón
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  // Estilo principal del botón
  mainContainer: {
    width: width * 0.9,
    height: 60,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  // Estilo del texto del botón
  textFormat: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  // Variante 1: color por defecto
  colorOne: {
    backgroundColor: '#2c2c2c',
  },
  // Variante 2: color alternativo
  colorTwo: {
    backgroundColor: '#768D9B',
  },
  // Variante 3: otro color alternativo
  colorTree: {
    backgroundColor: '#223A5C',
  },
});
