import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from '../CheckBox/CheckBox';
import { CardTypes } from '../../utils/types/components';

/**
 * Tipos de props para CardTask.
 * Extiende CardTypes y agrega control de checkbox.
 * @property {boolean} checked - Indica si la tarea está completada.
 * @property {() => void} onCheck - Función para cambiar el estado del checkbox.
 */
type CardTaskProps = CardTypes & {
  id?: string | number;
  checked?: boolean;
  onCheck?: (id?: string | number) => void;
};

/**
 * Componente de tarjeta de tarea.
 * Muestra información de la tarea y permite marcarla como completada.
 * @param {CardTaskProps} props - Propiedades de la tarjeta.
 * @returns {JSX.Element}
 */
const CardTask = ({
  id,
  title,
  startTask,
  limitTask,
  statusCard,
  desc,
  onPress,
  checked = false,
  onCheck,
}: CardTaskProps) => {
  const statusColor = (status: string | undefined) => {
    if (!status) return '#f1c40f';
    const s = status.toLowerCase();
    if (s.includes('complet')) return '#2ecc71';
    if (s.includes('venc')) return '#e74c3c';
    return '#f1c40f';
  };

  return (
    // Tarjeta principal, presionable para ver detalles
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      {/* Encabezado: título y estado visual */}
      <View style={styles.basicContainer}>
        <Text style={styles.titleCard}>{title}</Text>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor(statusCard) }]} />
      </View>
      {/* Descripción de la tarea */}
      <View style={styles.basicViewColumn}>
        <View style={styles.viewListElement}>
          <Text style={styles.textDots}>{'• '}</Text>
          <Text style={styles.textFormat}>{desc}</Text>
        </View>
      </View>
      {/* Fechas y checkbox de finalización */}
      <View style={styles.basicContainer}>
        {/* Fecha de inicio */}
        <View style={[styles.basicViewColumn, styles.centerView]}>
          <View style={styles.viewListElement}>
            <Icon name="clock-o" color={'#000'} size={24} />
            <Text style={styles.textSemiBold}>{' Iniciada:'}</Text>
          </View>
          <Text style={styles.textDate}>{startTask}</Text>
        </View>
        {/* Fecha de vencimiento */}
        <View style={[styles.basicViewColumn, styles.centerView]}>
          <View style={styles.viewListElement}>
            <Icon name="clock-o" color={'#000'} size={24} />
            <Text style={styles.textSemiBold}>{' Vence:'}</Text>
          </View>
          <Text style={styles.textDate}>{limitTask}</Text>
        </View>
        {/* Checkbox para marcar como completada */}
        <View style={[styles.basicViewColumn, styles.centerView]}>
          <Text style={styles.textSemiBold}>{'Finalizar'}</Text>
          <Checkbox checked={checked} onChange={() => onCheck && onCheck(id)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardTask;

// Obtiene el ancho de la pantalla para el tamaño de la tarjeta
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  // Contenedor principal de la tarjeta
  mainContainer: {
    width: width * 0.9,
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    elevation: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  // Título de la tarjeta
  titleCard: {
    color: '#000',
    fontSize: 28,
    fontWeight: '600',
  },
  // Centrado de elementos
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Texto de descripción
  textFormat: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
  },
  // Texto seminegrita (fechas y labels)
  textSemiBold: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  // Punto de lista para la descripción
  textDots: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
  },
  // Fecha (inicio/vencimiento)
  textDate: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
  },
  // Contenedor de filas principales
  basicContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginVertical: 4,
  },
  // Contenedor de columnas
  basicViewColumn: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  // Indicador visual de estado
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  // Elementos de lista en fila
  viewListElement: {
    flexDirection: 'row',
  },
});
