import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomBarNavigation = ({onPressHome, onPressAdd, onPressTask} : any) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onPressHome} >
        <Icon name="home" size={30} color={'#FFF'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.addTaskContainer} onPress={onPressAdd}>
        <Icon name="plus" size={50} color={'#FFF'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressTask} >
        <MaterialIcons name="task" size={30} color={'#FFF'}/>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBarNavigation;

const styles = StyleSheet.create({
  mainContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#0E2038',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
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
