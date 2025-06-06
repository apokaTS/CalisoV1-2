import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign';

export default ({onDateChange}: {onDateChange?: (date: Date) => void}) => {
  const [dates, setDates] = useState(new Date());
  const [open, setOpen] = useState(false);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    setDates(selectedDate);
    if (onDateChange) {
      onDateChange(selectedDate); // pasa la fecha al padre si lo necesita
    }
  };

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => setOpen(true)}>
      <Text style={styles.text}>{formatDate(dates)}</Text>
      <Icon name="calendar" size={32} />
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

  text: {
    fontSize: 20,
  },
});
