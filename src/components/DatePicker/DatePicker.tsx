import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign';

/**
 * Componente DatePicker personalizado.
 * Permite seleccionar una fecha y notificar el cambio al padre.
 * @param {Object} props - Props del componente.
 * @param {(date: Date) => void} [props.onDateChange] - Función que se ejecuta al seleccionar una fecha.
 * @returns {JSX.Element}
 */
export default ({onDateChange}: {onDateChange?: (date: Date) => void}) => {
  // Estado para la fecha seleccionada
  const [dates, setDates] = useState(new Date());
  // Estado para controlar la apertura del modal
  const [open, setOpen] = useState(false);

  /**
   * Formatea la fecha a dd-mm-yy.
   * @param {Date} date - Fecha a formatear.
   * @returns {string} Fecha formateada.
   */
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  /**
   * Maneja la confirmación de la fecha seleccionada.
   * Actualiza el estado y notifica al padre si corresponde.
   * @param {Date} selectedDate - Fecha seleccionada.
   */
  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    setDates(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  };

  return (
    // Botón que muestra la fecha y abre el selector al presionar
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => setOpen(true)}>
      {/* Muestra la fecha seleccionada */}
      <Text style={styles.text}>{formatDate(dates)}</Text>
      {/* Icono de calendario */}
      <Icon name="calendar" size={32} />
      {/* Componente DatePicker modal */}
      <DatePicker
        modal
        open={open}
        date={dates}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        mode="date"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Contenedor principal del botón
  mainContainer: {
    height: 50,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginInline: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  // Estilo del texto de la fecha
  text: {
    fontSize: 20,
  },
});
