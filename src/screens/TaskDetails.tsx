import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {TaskDetailsTypes} from '../utils/types/HomeScreen';
import IconTime from 'react-native-vector-icons/FontAwesome';
import BasicButton from '../components/BasicButton/BasicButton';
import CheckBox from '../components/CheckBox/CheckBox';
import DatePicker from '../components/DatePicker/DatePicker';

const API_BASE = 'http://192.168.3.107:3000';

const TaskDetails = ({
  itemDetails,
  data,
  onToggleComplete,
}: TaskDetailsTypes & {onToggleComplete?: (id: string | number) => void}) => {
  const taskDetail = data?.[itemDetails];

  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(taskDetail?.titleText || '');
  const [editDesc, setEditDesc] = useState(taskDetail?.descText || '');
  const [editFinal, setEditFinal] = useState(
    new Date(taskDetail?.final || new Date()),
  );
  const [isSaving, setIsSaving] = useState(false);

  if (!taskDetail) {
    return (
      <View style={styles.mainContainer}>
        <Text>No details available</Text>
      </View>
    );
  }

  const {id, titleText, descText, final, inicio, status} = taskDetail;

  /**
   * Activa el modo edición y sincroniza los estados con los valores actuales
   */
  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(titleText);
    setEditDesc(descText);
    setEditFinal(new Date(final));
  };

  /**
   * Cancela la edición y restaura los valores originales
   */
  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(titleText);
    setEditDesc(descText);
    setEditFinal(new Date(final));
  };

  /**
   * Guarda los cambios en el backend
   */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      console.log('=== INICIANDO GUARDADO ===');
      console.log('ID de tarea:', id);
      console.log('Datos a enviar:', {
        titleText: editTitle,
        descText: editDesc,
        dueDate: editFinal.toISOString(),
      });

      const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          titleText: editTitle,
          descText: editDesc,
          dueDate: editFinal.toISOString(),
        }),
      });

      console.log('Status de respuesta:', response.status);
      console.log('Headers de respuesta:', response.headers);

      // Obtener respuesta como texto primero
      const responseText = await response.text();
      console.log('Respuesta del servidor (texto):', responseText);

      // Parsear como JSON si no está vacío
      let data;
      if (responseText) {
        data = JSON.parse(responseText);
      }

      console.log('Respuesta del servidor (JSON):', data);

      if (response.ok) {
        console.log('✅ Tarea actualizada exitosamente');
        Alert.alert('Éxito', 'Tarea actualizada correctamente');
        setIsEditing(false);
        setIsSaving(false);
      } else {
        console.error('❌ Error en respuesta:', data);
        Alert.alert('Error', data?.message || `Error ${response.status}`);
        setIsSaving(false);
      }
    } catch (error) {
      console.error('❌ Error en la solicitud:', error);
      console.error('Stack:', error instanceof Error ? error.stack : 'N/A');
      Alert.alert('Error', 'Error: ' + String(error));
      setIsSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View>
        <Text style={styles.titleText}>Recordatorio</Text>
      </View>
      <View style={styles.dataContainer}>
        {/* Título editable */}
        <TextInput
          style={styles.titleInput}
          value={editTitle}
          onChangeText={setEditTitle}
          editable={isEditing}
          placeholder="Título de la tarea"
        />

        {/* Descripción editable */}
        <TextInput
          style={styles.descInput}
          value={editDesc}
          onChangeText={setEditDesc}
          editable={isEditing}
          multiline
          placeholder="Descripción de la tarea"
        />

        {/* Fecha de inicio (solo lectura) */}
        <View style={styles.timeContainer}>
          <IconTime name="clock-o" size={25} />
          <Text>Inicio:</Text>
          <View style={styles.mientrasBorrame}>
            <Text style={styles.timeText}>{inicio}</Text>
          </View>
        </View>

        {/* Fecha de término (editable si está en modo edición) */}
        <View style={styles.timeContainer}>
          <IconTime name="clock-o" size={25} />
          <Text>Termina:</Text>
          {isEditing ? (
            <DatePicker onDateChange={setEditFinal} />
          ) : (
            <View style={styles.mientrasBorrame}>
              <Text style={styles.timeText}>
                {editFinal.toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        {/* Checkbox de completado */}
        <View style={styles.timeContainer}>
          <Text style={styles.boldText}>Completada:</Text>
          <CheckBox
            checked={status === 'Completada'}
            onChange={() => onToggleComplete && onToggleComplete(id)}
          />
        </View>

        {/* Botones de acción */}
        <View style={styles.buttonContainer}>
          {!isEditing ? (
            <BasicButton onPress={handleEdit} text="Editar" variant={1} />
          ) : (
            <>
              <BasicButton
                onPress={handleSave}
                text={isSaving ? 'Guardando...' : 'Guardar'}
                variant={2}
              />
              <BasicButton onPress={handleCancel} text="Cancelar" variant={3} />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  titleText: {
    marginTop: 60,
    fontSize: 40,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#fff',
  },

  dataContainer: {
    marginTop: 40,
    borderRadius: 7,
    elevation: 10,
    width: 390,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 10,
  },

  titleInput: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 0.2,
    borderBottomColor: '#000',
    elevation: 20,
    borderRadius: 9,
    width: 350,
    height: 38,
    paddingHorizontal: 8,
    color: '#000',
    fontWeight: '600',
  },

  descInput: {
    textAlignVertical: 'top',
    marginTop: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 0.2,
    borderBottomColor: '#000',
    elevation: 20,
    borderRadius: 9,
    width: 350,
    height: 100,
    padding: 8,
    color: '#000',
  },

  timeContainer: {
    marginTop: 12,
    width: 350,
    height: 87.5,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },

  mientrasBorrame: {
    width: 200,
    height: 42,
    elevation: 4,
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  timeText: {
    textAlign: 'center',
    marginTop: 6,
    color: '#000',
  },

  buttonContainer: {
    marginTop: 25,
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    alignItems: 'center',
  },

  boldText: {
    fontWeight: 'bold',
  },
});
