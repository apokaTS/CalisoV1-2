import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import CardTask from './src/components/CardTask/CardTask';
import FilterLabel from './src/components/FilterLabel/FilterLabel';
import SearchBar from './src/components/SearchBar/SearchBar';
// import BasicButton from './src/components/BasicButton/BasicButton';

function App(): React.JSX.Element {
  const [search, onSetSearch] = useState<string>('');
  const arrayFilters = [
    {id: 0, name: 'Nuevas', isActive: false},
    {id: 1, name: 'Proxima a vencer', isActive: false},
    {id: 2, name: 'Vencidas', isActive: false},
  ];

  const [laberFilter, setLabelFilter] = useState(arrayFilters);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const taskList = [
    {id: 0, desc: 'Hacer 20 planas'},
    {id: 1, desc: 'PROCRASTINAR'},
    {id: 2, desc: 'Ensayo de algo'},
  ];

  const arrayTask = [
    {
      title: 'Tarea de Español',
      task: taskList,
      inicio: '9-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
    {
      title: 'Tarea de Filosofia',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
    {
      title: 'Tarea de Matematicas',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#FF9900',
      filter: 'Proxima a vencer',
    },
    {
      title: 'Tarea de Termodinamica',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
    {
      title: 'Tarea de Biologia',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#FF9900',
      filter: 'Proxima a vencer',
    },
    {
      title: 'Tarea de Fisica',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
    {
      title: 'Tarea de Programacion',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#FF0000',
      filter: 'Vencidas',
    },
    {
      title: 'Tarea de Aereonautica',
      task: taskList,
      inicio: '10-10-2024',
      final: '15-10-2024',
      status: '#04BB00',
      filter: 'Nuevas',
    },
  ];

  // Funcion para cerrar un label filter
  const toggleFilter = (filterId: any) => {
    setLabelFilter(prevFilters =>
      prevFilters.map(filter =>
        filter.id === filterId
          ? {...filter, isActive: !filter.isActive}
          : filter,
      ),
    );
  };
  //FILTRO BUSQUEDA NOMBRE
  const filterSearch = () => {
    return arrayTask.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
  };

  // Funcion para agregar la opcion
  const handleFilterSelection = (filterName: string) => {
    setLabelFilter(prevFilters =>
      prevFilters.map(filter =>
        filter.name.toLowerCase() === filterName.toLowerCase()
          ? {...filter, isActive: true}
          : filter,
      ),
    );
    setShowOptions(false);
  };

  const getFilteredTask = () => {
    const activeFilters = laberFilter
      .filter(filter => filter.isActive)
      .map(filter => filter.name.toLowerCase());
    if (activeFilters.length === 0) {
      return arrayTask;
    }
    return arrayTask.filter(task =>
      activeFilters.includes(task.filter.toLowerCase()),
    );
  };
  const filteredTask = search !== '' ? filterSearch() : getFilteredTask();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.mainContainer}>
          <ImageBackground
            style={styles.backgroundContainer}
            source={require('./src/assets/calisobg.png')}>
            <SearchBar
              onSearch={filterSearch}
              value={search}
              onChangeText={(text) => onSetSearch(text)}
              opCloseSearch={() => handleFilterSelection('Vencidas')}
              opNewSearch={() => handleFilterSelection('Nuevas')}
              opNextCloseSearch={() =>
                handleFilterSelection('Proxima a vencer')
              }
              showOptions={showOptions}
              setShowOptions={() => setShowOptions(!showOptions)}
            />
            <View style={styles.filterContainer}>
              {laberFilter.map(
                (item, index) =>
                  item.isActive && (
                    <FilterLabel
                      key={index}
                      label={item.name}
                      onClose={() => toggleFilter(item.id)}
                    />
                  ),
              )}
            </View>
            <FlatList
            scrollEnabled={false}
              data={filteredTask}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <CardTask
                title={item.title}
                limitTask={item.final}
                onPress={() => console.log(item.title)}
                startTask={item.inicio}
                statusCard={item.status}
                task={item.task}
                key={index}
              />
              )}
            />
            {/* {filteredTask.map((item, id) => (
              <CardTask
                title={item.title}
                limitTask={item.final}
                onPress={() => console.log(item.title)}
                startTask={item.inicio}
                statusCard={item.status}
                task={item.task}
                key={id}
              />
            ))} */}
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  backgroundContainer: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default App;
