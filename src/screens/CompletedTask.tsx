import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import CheckBox from '../components/CheckBox/CheckBox';

const CompletedTask = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <CheckBox checked={true} disabled={true} />
      <Text style={styles.text}>{item.titleText}</Text>
    </View>
  );

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/calisobg.png')} // Ajusta la ruta si es necesario
      resizeMode="cover"
    >
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
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
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  text: { marginLeft: 12, fontSize: 16 },
});

export default CompletedTask;
