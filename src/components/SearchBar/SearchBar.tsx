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

/**
 * Componente de barra de búsqueda con opciones de filtro.
 * Permite buscar por texto y seleccionar filtros rápidos.
 * @param {SearchBarTypes} props - Props del componente.
 * @property {string} value - Valor actual del input de búsqueda.
 * @property {(text: string) => void} onChangeText - Función para actualizar el texto de búsqueda.
 * @property {() => void} opCloseSearch - Acción para filtrar por "Vencidas".
 * @property {() => void} opNewSearch - Acción para filtrar por "Nuevas".
 * @property {() => void} opNextCloseSearch - Acción para filtrar por "Próxima a vencer".
 * @property {() => void} setShowOptions - Alterna la visibilidad de las opciones de filtro.
 * @property {boolean} showOptions - Indica si las opciones de filtro están visibles.
 * @property {() => void} onSearch - Acción al presionar el icono de búsqueda.
 * @returns {JSX.Element}
 */
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
  // Estado para saber si el input está enfocado
  const [onSearchFocus, setOnSearchFocus] = useState<boolean>(false);

  return (
    <View>
      {/* Contenedor de la barra de búsqueda */}
      <View style={styles.searchContainer}>
        {/* Botón de búsqueda */}
        <TouchableOpacity onPress={onSearch}>
          <Icon
            name={onSearchFocus ? 'search-circle' : 'search-circle-outline'}
            color={'Black'}
            size={32}
          />
        </TouchableOpacity>
        {/* Input de texto para búsqueda */}
        <View style={styles.TextBox}>
          <TextInput
            onFocus={() => setOnSearchFocus(true)}
            onBlur={() => setOnSearchFocus(false)}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
        {/* Botón para mostrar opciones de filtro */}
        <TouchableOpacity onPress={setShowOptions}>
          <Icons name="align-center" color={'black'} size={32} />
        </TouchableOpacity>
      </View>
      {/* Opciones de filtro rápidas */}
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
  // Contenedor principal de la barra de búsqueda
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
  // Caja de texto para el input
  TextBox: {
    backgroundColor: 'White',
    width: 300,
    height: 49,
  },
  // Contenedor de las opciones de filtro
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
  // Estilo del texto de las opciones
  textFormat: {
    fontSize: 20,
    color: '#000',
    paddingTop: 2,
    marginBottom: 10,
    marginTop: 8,
    paddingLeft: 40,
  },
  // Separador entre opciones
  separador: {
    height: 0.5,
    backgroundColor: '#2C2C2C',
    width: '90%',
    marginLeft: 20  },
});
