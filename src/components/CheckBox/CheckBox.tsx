import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const CheckBox = () => {
  const [checkbox, setCheckbox] = useState<boolean>(false);

  function handlePressChecked() {
    setCheckbox(!checkbox);
  }

  return (
    <TouchableOpacity
      onPress={handlePressChecked}
      style={[
        styles.checkContainer,
        checkbox ? styles.checkContainerCheck : null,
      ]}>
      {!checkbox ? (
        <Text style={styles.textFormat} />
      ) : (
        <Text style={styles.textFormatChecked}>✓</Text>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkContainer: {
    borderWidth: 4,
    borderColor: '#000',
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFormat: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  textFormatChecked: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#FFF',
  },
  checkContainerCheck: {
    borderWidth: 4,
    borderColor: '#000',
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: 'black',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
