// Definiciones de tipos para la pantalla principal (HomeScreen)

// HomeTypes: define las props que recibirá el componente HomeScreen.
export type HomeTypes = {
  /** Arreglo de secciones que agrupan tareas. */
  data: ArrayTaskTypes[];

  /** (Opcional) Función que se llama al presionar un ítem en la lista. */
  onPressItem?: (id: number) => void;
};

// ArrayTaskTypes: define cómo se agrupan las tareas en secciones.
export type ArrayTaskTypes = {
  /** Título de la sección o fase. */
  titleText: string;

  /** Descripción de la tarea (ahora string, no array). */
  descText: string;

  /** Fecha/hora de inicio de la sección. */
  inicio: string;

  /** Fecha/hora de finalización de la sección. */
  final: string;

  /** Estado general de las tareas en esta sección. */
  status: string;

  /** Etiqueta o clave de filtrado aplicada a esta sección. */
  filter: string;
};

// TaskDetailsTypes: define las props para un componente que muestra detalles de tareas.
export type TaskDetailsTypes = {
  /** Lista completa de secciones con sus respectivas tareas. */
  data: ArrayTaskTypes[];

  /** Índice o identificador numérico de la tarea específica para mostrar detalles. */
  itemDetails: number;
};
