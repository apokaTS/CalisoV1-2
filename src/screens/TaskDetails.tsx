import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {TaskDetailsTypes} from '../utils/types/HomeScreen';
import IconTime from 'react-native-vector-icons/FontAwesome';
import BasicButton from '../components/BasicButton/BasicButton';
import CheckBox from '../components/CheckBox/CheckBox';

const TaskDetails = ({
  itemDetails,
  data,
}: TaskDetailsTypes & {onToggleComplete?: (id: string | number) => void}) => {
  const taskDetail = data?.[itemDetails];

  if (!taskDetail) {
    return (
      <View style={styles.mainContainer}>
        <Text>No details available</Text>
      </View>
    );
  }

  const {titleText, descText, final, inicio, status} = taskDetail;

  return (
    <View style={styles.mainContainer}>
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
            <Text style={styles.styleTextTime}>{inicio}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <IconTime name="clock-o" size={25} />
          <Text>Termina:</Text>
          <View style={styles.mientrasBorrame}>
            <Text style={styles.styleTextTime}>{final}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.styleText}>Completada:</Text>
          <CheckBox
            checked={status === 'Completada'}
          />
        </View>
        <View style={styles.bottomButtonEdit}>
          <BasicButton
            onPress={() => console.log('Funcionando')}
            text="Editar"
          />
        </View>
      </View>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    marginTop: 60,
    fontSize: 50,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  dataContainer: {
    marginTop: 60,
    borderRadius: 7,
    elevation: 10,
    width: 390,
    height: 490,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  },
  timeContainer: {
    marginTop: 4,
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
    elevation: 40,
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  bottomButtonEdit: {
    marginTop: 25,
  },
  styleTextTime: {
    textAlign: 'center',
    marginTop: 10,
  },

  styleText: {
    fontWeight: 'bold',
  },
});
