import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,

 } from 'react-native';

import React from 'react';
 type BasicButtonTypes = {
    variant?: number;
    text : string;
    onPress: () => void;
}
const BasicButton = ({variant = 1, text, onPress} : BasicButtonTypes) => {

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
    <TouchableOpacity onPress={onPress}style = {[styles.mainContainer, selectVariant()]}>
      <Text style = {styles.textFormat}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BasicButton;

const{ width } = Dimensions.get('screen');


const styles = StyleSheet.create({
    mainContainer: {
        width : width * 0.9,
        height: 50,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 1,
    },
    textFormat : {
        color : '#fff',
        fontSize : 32,
        fontWeight : '200',
    },
    colorOne : {
        backgroundColor : '#2c2c2c',
    },
    colorTwo : {
        backgroundColor: '#768D9B',
    },
    colorTree : {
        backgroundColor: '#223A5C',
    },
});
