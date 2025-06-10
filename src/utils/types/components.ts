// Definiciones de tipos para componentes genéricos

// CardTypes: define las propiedades (props) que recibirá un componente de tipo Card.
export type CardTypes = {
  /** Título principal que se mostrará en la tarjeta. */
  title: string;

  /** Fecha o indicador de inicio de la tarea (como cadena). */
  startTask: string;

  /** Fecha límite o fecha de entrega de la tarea (como cadena). */
  limitTask: string;

  /** Estado general de la tarjeta/tarea (como cadena). */
  statusCard: string;

  /** Lista de subtareas o elementos asociados a la tarjeta. */
  task: ArrayTask[];

  /** Función que se ejecuta al presionar la tarjeta. */
  onPress: () => void;
};

// ArrayTask: representa una sub-tarea o ítem con identificador y descripción.
type ArrayTask = {
  /** Identificador único de la sub-tarea (numérico). */
  id: number;

  /** Descripción detallada de la sub-tarea. */
  desc: string;
};

// FilterLabelTypes: define las props para un componente que muestra una etiqueta de filtro.
export type FilterLabelTypes = {
  /** Texto que mostrará el filtro activo. */
  label: string;

  /** Función que se ejecuta al cerrar/eliminar esa etiqueta de filtro. */
  onClose: () => void;
};

// SearchBarTypes: define las props de un componente de barra de búsqueda.
export type SearchBarTypes = {
  /** Texto actual en el input de búsqueda. */
  value: string;

  /** Función que se llama cada vez que cambia el texto de búsqueda. */
  onChangeText: (text: string) => void;

  /** Función que se ejecuta al activar una nueva búsqueda. */
  opNewSearch: () => void;

  /** Función para ir a la siguiente búsqueda o cerrar la actual (alternativa). */
  opNextCloseSearch: () => void;

  /** Función que se ejecuta al cerrar la función de búsqueda. */
  opCloseSearch: () => void;

  /** Indica si se deben mostrar opciones adicionales (por ejemplo, filtros). */
  showOptions: boolean;

  /** Función que cambia el estado de "showOptions". */
  setShowOptions: () => void;

  /** Función que se ejecuta cuando se confirma la búsqueda. */
  onSearch: () => void;
};
