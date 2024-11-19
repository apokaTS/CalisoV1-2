import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { FilterLabelTypes } from '../../utils/types/components';

const FilterLabel = ({label = 'default' , onClose} : FilterLabelTypes) => {
  return (
    <View style = {styles.mainContainer}>
      <Text style = {styles.textLabel}>{label}</Text>
      <TouchableOpacity onPress={onClose}>
        <Icon name = "close" color={'#FFF'} size= {32} />
      </TouchableOpacity>
    </View>
  );
};

export default FilterLabel;

const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor : '#2C2C2C',
        flexDirection : 'row',
        paddingVertical : 5,
        paddingHorizontal:20,
        borderRadius : 60,
        alignItems : 'center',
    },
    textLabel:{
        fontSize:24,
        fontWeight: '500',
        color: '#FFF',
        marginRight : 15,
    },
});
