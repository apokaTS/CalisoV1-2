import React, {useState, useMemo} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterLabel from '../components/FilterLabel/FilterLabel';
import CardTask from '../components/CardTask/CardTask';
import {HomeTypes} from '../utils/types/HomeScreen';

const Home = ({
  data,
  onPressItem,
  onToggleComplete,
}: HomeTypes & {onToggleComplete?: (id: string | number) => void}) => {
  const [search, setSearch] = useState<string>('');
  const initialFilters = [
    {id: 0, name: 'Nuevas', isActive: false},
    {id: 1, name: 'Proxima a vencer', isActive: false},
    {id: 2, name: 'Vencidas', isActive: false},
  ];
  const [labelFilter, setLabelFilter] = useState(initialFilters);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  // Umbrales (sincronizar con CardTask)
  const SOON_THRESHOLD = 48 * 60 * 60 * 1000; // 48 horas
  const NEW_THRESHOLD = 7 * 24 * 60 * 60 * 1000; // 7 días

  const parseDateSafe = (iso?: string | null, fallback?: string) => {
    if (iso) {
      const d = new Date(iso);
      if (!isNaN(d.getTime())) return d;
    }
    if (fallback) {
      const d2 = new Date(fallback);
      if (!isNaN(d2.getTime())) return d2;
    }
    return null;
  };

  const statusLabelFromDates = (
    startIso?: string | null,
    dueIso?: string | null,
    startStr?: string,
    dueStr?: string,
  ) => {
    const now = new Date();
    const startDate = parseDateSafe(startIso, startStr);
    const dueDate = parseDateSafe(dueIso, dueStr);

    if (!dueDate) return 'Sin fecha';

    const diffToDue = dueDate.getTime() - now.getTime();
    const diffFromStart = startDate
      ? now.getTime() - startDate.getTime()
      : Number.POSITIVE_INFINITY;

    if (diffToDue < 0) return 'Vencidas'; // <-- CORREGIDO: plural para coincidir con filtro
    if (diffToDue <= SOON_THRESHOLD) return 'Proxima a vencer';
    if (diffFromStart <= NEW_THRESHOLD) return 'Nuevas';
    return 'Activa';
  };

  const toggleFilter = (filterId: number) => {
    setLabelFilter(prev =>
      prev.map(f => (f.id === filterId ? {...f, isActive: !f.isActive} : f)),
    );
  };

  const handleFilterSelection = (filterName: string) => {
    setLabelFilter(prev =>
      prev.map(f => ({...f, isActive: f.name === filterName})),
    );
    setShowOptions(false);
  };

  // Lista filtrada por filtros activos y texto de búsqueda
  const filteredTask = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const activeFilters = labelFilter
      .filter(f => f.isActive)
      .map(f => f.name.toLowerCase());
    return data.filter(item => {
      // comprobar búsqueda
      if (search) {
        const text = `${item.titleText ?? ''} ${
          item.descText ?? ''
        }`.toLowerCase();
        if (!text.includes(search.toLowerCase())) return false;
      }

      // si no hay filtros activos devolvemos todas las que pasaron búsqueda
      if (activeFilters.length === 0) return true;

      const label = statusLabelFromDates(
        (item as any).inicioISO ?? null,
        (item as any).finalISO ?? null,
        item.inicio,
        item.final,
      ).toLowerCase();

      return activeFilters.includes(label);
    });
  }, [data, labelFilter, search]);

  // handlers expuestos al SearchBar
  const opNewSearch = () => handleFilterSelection('Nuevas');
  const opNextCloseSearch = () => handleFilterSelection('Proxima a vencer');
  const opCloseSearch = () => handleFilterSelection('Vencidas');

  return (
    <View style={styles.mainContainer}>
      <SearchBar
        onSearch={() => {
          // al presionar icono de búsqueda limpia filtros rápidos
          setLabelFilter(initialFilters);
          setShowOptions(false);
        }}
        value={search}
        onChangeText={text => setSearch(text)}
        opCloseSearch={opCloseSearch}
        opNewSearch={opNewSearch}
        opNextCloseSearch={opNextCloseSearch}
        showOptions={showOptions}
        setShowOptions={() => setShowOptions(!showOptions)}
      />

      <View style={styles.filterContainer}>
        {labelFilter.map(
          item =>
            item.isActive && (
              <FilterLabel
                key={item.id}
                label={item.name}
                onClose={() => toggleFilter(item.id)}
              />
            ),
        )}
      </View>

      <FlatList
        data={filteredTask}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <CardTask
            id={item.id}
            title={item.titleText}
            startTask={item.inicio}
            limitTask={item.final}
            startTaskISO={(item as any).inicioISO}
            limitTaskISO={(item as any).finalISO}
            onPress={() => onPressItem && onPressItem(index)}
            statusCard={item.status}
            desc={item.descText}
            checked={item.status === 'Completada'}
            onCheck={id => onToggleComplete && onToggleComplete(id)}
          />
        )}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
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
    marginVertical: 8,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  flatListContent: {
    paddingBottom: 80,
  },
});
