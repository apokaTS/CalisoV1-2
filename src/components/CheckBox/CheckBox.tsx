import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

/**
 * Tipos de props para el componente CheckBox.
 * @property {boolean} [checked] - Estado actual del checkbox (marcado o no).
 * @property {boolean} [disabled] - Si el checkbox está deshabilitado.
 * @property {(checked: boolean) => void} [onChange] - Función que se ejecuta al cambiar el estado.
 */
type CheckBoxProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

/**
 * Componente CheckBox personalizado.
 * Permite marcar/desmarcar y notificar el cambio al padre.
 * @param {CheckBoxProps} props - Propiedades del checkbox.
 * @returns {JSX.Element}
 */
const CheckBox = ({ checked = false, disabled = false, onChange }: CheckBoxProps) => {
  // Estado interno para el checkbox
  const [checkbox, setCheckbox] = useState<boolean>(checked);

  /**
   * Maneja el evento de presionar el checkbox.
   * Cambia el estado y llama a la función onChange si existe.
   */
  function handlePressChecked() {
    if (disabled) {return;}
    setCheckbox(!checkbox);
    onChange && onChange(!checkbox);
  }

  // Sincroniza el estado interno si cambia la prop checked desde el padre
  React.useEffect(() => {
    setCheckbox(checked);
  }, [checked]);

  return (
    <TouchableOpacity
      onPress={handlePressChecked}
      disabled={disabled}
      style={[
        styles.checkContainer,
        checkbox ? styles.checkContainerCheck : null,
      ]}>
      {/* Si está marcado, muestra el check, si no, deja vacío */}
      {!checkbox ? (
        <Text style={styles.textFormat} />
      ) : (
        <Text style={styles.textFormatChecked}>✓</Text>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

// Estilos para el checkbox
const styles = StyleSheet.create({
  // Contenedor principal del checkbox (sin marcar)
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
  // Texto vacío (sin check)
  textFormat: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  // Texto del check (✓)
  textFormatChecked: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#FFF',
  },
  // Contenedor cuando está marcado (fondo negro)
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
