import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Feather';
import {SearchBarTypes} from '../../utils/types/components';

const SearchPad = ({
  value,
  onChangeText,
  opCloseSearch,
  opNewSearch,
  opNextCloseSearch,
  setShowOptions,
  showOptions,
  onSearch,
}: SearchBarTypes) => {
  const [onSearchFocus, setOnSearchFocus] = useState<boolean>(false);
  return (
    <View>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={onSearch}>
          <Icon
            name={onSearchFocus ? 'search-circle' : 'search-circle-outline'}
            color={'Black'}
            size={32}
          />
        </TouchableOpacity>
        <View style={styles.TextBox}>
          <TextInput
            onFocus={() => setOnSearchFocus(true)}
            onBlur={() => setOnSearchFocus(false)}
            value={value}
            onChangeText={onChangeText}
            //value={search}
            //onChangeText={(text) => onSetSearch(text)}
          />
        </View>
        <TouchableOpacity onPress={setShowOptions}>
          <Icons name="align-center" color={'black'} size={32} />
        </TouchableOpacity>
      </View>
      {showOptions && (
        <View style={styles.mainContainer}>
          <View>
            <TouchableOpacity onPress={opNewSearch}>
              <Text style={styles.textFormat}>Nuevas</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separador} />
          <View>
            <TouchableOpacity onPress={opNextCloseSearch}>
              <Text style={styles.textFormat}>Proxima a vencer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separador} />
          <View>
            <TouchableOpacity onPress={opCloseSearch}>
              <Text style={styles.textFormat}>Vencidas</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SearchPad;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'white',
    width: 400,
    height: 57,
    borderRadius: 11.5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    justifyContent: 'space-between',
    marginTop: 5.5,
  },
  TextBox: {
    backgroundColor: 'White',
    width: 300,
    height: 49,
  },
  mainContainer: {
    height: 150,
    width: 400,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginTop: 5.5,
  },
  textFormat: {
    fontSize: 20,
    color: '#000',
    paddingTop: 2,
    marginBottom: 10,
    marginTop: 8,
    paddingLeft: 40,
  },
  separador: {
    height: 0.5,
    backgroundColor: '#2C2C2C',
    width: '90%',
    marginLeft: 20,
  },
});
