import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

type ButtonNewTaskTypes = {
  onPress: () => void
}
const ButtonNewTask = ({onPress} : ButtonNewTaskTypes) => {
  return (
    <TouchableOpacity style = {styles.mainContainer} onPress={onPress}>
      <Icon name="plus" size={38} color={'#FFF'}/>
    </TouchableOpacity>
  );
};

export default ButtonNewTask;

const styles = StyleSheet.create({
    mainContainer : {
        width : 67,
        height : 67,
        backgroundColor : '#768D9B',
        borderRadius : 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
});
