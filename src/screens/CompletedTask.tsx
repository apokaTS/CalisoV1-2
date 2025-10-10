import React from 'react';
import {View, Text, FlatList, StyleSheet, ImageBackground} from 'react-native';
import CheckBox from '../components/CheckBox/CheckBox';

type TaskItem = {
  id: string | number;
  titleText: string;
  descText?: string;
  inicio?: string;
  final?: string;
  status?: string;
};

type CompletedTaskProps = {
  data: TaskItem[];
};

const CompletedTask: React.FC<CompletedTaskProps> = ({data}) => {
  const renderItem = ({item}: {item: TaskItem}) => (
    <View style={styles.row}>
      <CheckBox checked={true} disabled={true} />
      <Text style={styles.text}>{item.titleText}</Text>
    </View>
  );

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/calisobg.png')}
      resizeMode="cover">
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text style={styles.header}>Tareas Completadas</Text>
        }
        contentContainerStyle={styles.container}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {padding: 16, paddingBottom: 80},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#fff'},
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  text: {marginLeft: 12, fontSize: 16, color: '#fff'},
});

export default CompletedTask;
