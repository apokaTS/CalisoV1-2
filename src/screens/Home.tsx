import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterLabel from '../components/FilterLabel/FilterLabel';
import CardTask from '../components/CardTask/CardTask';
import { HomeTypes } from '../utils/types/HomeScreen';



const Home = ({ data }: HomeTypes) => {

    const [search, onSetSearch] = useState<string>('');
    const arrayFilters = [
        { id: 0, name: 'Nuevas', isActive: false, isChecked: false },
        { id: 1, name: 'Proxima a vencer', isActive: false, isChecked: false },
        { id: 2, name: 'Vencidas', isActive: false, isChecked: false },
    ];
    const [laberFilter, setLabelFilter] = useState(arrayFilters);
    const [showOptions, setShowOptions] = useState<boolean>(false);


    // Funcion para cerrar un label filter
    const toggleFilter = (filterId: any) => {
        setLabelFilter(prevFilters =>
            prevFilters.map(filter =>
                filter.id === filterId
                    ? { ...filter, isActive: !filter.isActive }
                    : filter,
            ),
        );
    };
    //FILTRO BUSQUEDA NOMBRE
    const filterSearch = () => {
        return data.filter(task =>
            task.title.toLowerCase().includes(search.toLowerCase()),
        );
    };

    // Funcion para agregar la opcion
    const handleFilterSelection = (filterName: string) => {
        setLabelFilter(prevFilters =>
            prevFilters.map(filter =>
                filter.name.toLowerCase() === filterName.toLowerCase()
                    ? { ...filter, isActive: true }
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
            return data;
        }
        return data.filter(task =>
            activeFilters.includes(task.filter.toLowerCase()),
        );
    };
    const filteredTask = search !== '' ? filterSearch() : getFilteredTask();


    return (
        <View style={styles.mainContainer}>
            <SearchBar
                onSearch={filterSearch}
                value={search}
                onChangeText={text => onSetSearch(text)}
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
                renderItem={({ item, index }) => (
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
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
