export type HomeTypes = {
    data: ArrayTaskTypes[];
}

export type ArrayTaskTypes = {
    title: string;
    task: TastTypes[];
    inicio: string;
    final: string;
    status: string;
    filter: string;
}

type TastTypes = {
    id: number;
    desc: string;
}
