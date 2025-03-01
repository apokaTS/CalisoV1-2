export type HomeTypes = {
    data: ArrayTaskTypes[];
    onPressItem?: (id: number) => void;
}

export type ArrayTaskTypes = {
    title: string;
    task: TaskTypes[];
    inicio: string;
    final: string;
    status: string;
    filter: string;
}

type TaskTypes = {
    id: number;
    desc: string;
}

export type TaskDetailsTypes = {
    data: ArrayTaskTypes[];
    itemDetails: number;
}
