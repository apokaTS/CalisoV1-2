import React from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {TaskDetailsTypes} from '../utils/types/HomeScreen';
import IconTime from 'react-native-vector-icons/FontAwesome';
import BasicButton from '../components/BasicButton/BasicButton';
import CheckBox from '../components/CheckBox/CheckBox';

const TaskDetails = ({
  itemDetails,
  data,
  onToggleComplete,
}: TaskDetailsTypes & {onToggleComplete?: (id: string | number) => void}) => {
  const taskDetail = data?.[itemDetails];

  if (!taskDetail) {
    return (
      <View style={styles.mainContainer}>
        <Text>No details available</Text>
      </View>
    );
  }

  const {id, titleText, descText, final, inicio, status} = taskDetail;

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View>
        <Text style={styles.titleText}>Recordatorio</Text>
      </View>
      <View style={styles.dataContainer}>
        <TextInput
          style={styles.titleInput}
          value={titleText}
          editable={false}
        />
        <TextInput
          style={styles.descInput}
          value={descText}
          editable={false}
          multiline
        />
        <View style={styles.timeContainer}>
          <IconTime name="clock-o" size={25} />
          <Text>Inicio:</Text>
          <View style={styles.mientrasBorrame}>
            <Text style={styles.timeText}>{inicio}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <IconTime name="clock-o" size={25} />
          <Text>Termina:</Text>
          <View style={styles.mientrasBorrame}>
            <Text style={styles.timeText}>{final}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.boldText}>Completada:</Text>
          <CheckBox
            checked={status === 'Completada'}
            onChange={() => onToggleComplete && onToggleComplete(id)}
          />
        </View>
        <View style={styles.bottomButtonEdit}>
          <BasicButton onPress={() => console.log('Editar')} text="Editar" />
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

  bottomButtonEdit: {
    marginTop: 25,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
