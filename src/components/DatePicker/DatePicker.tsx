import React, {useState} from 'react';
import {StyleSheet,TouchableOpacity, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign';

export default () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={()=> setOpen(true)}>
      <Text style={styles.text}>DD-MM-YY</Text>
      <Icon name="calendar" size={32}/>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    height: 50,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginInline: 8,
    justifyContent: 'space-between',
  },

  text:{
    fontSize: 20,
    marginHorizontal: 4,
  },
});
