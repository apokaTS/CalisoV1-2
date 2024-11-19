export type CardTypes = {
    title: string;
    startTask: string;
    limitTask: string;
    statusCard: string;
    task: ArrayTask[];
    onPress: () => void;
}

type ArrayTask = {
    id: number;
    desc: string;
}

export type FilterLabelTypes = {
    label : string;
    onClose : ()=> void;
}

export type SearchBarTypes = {
    value : string;
    onChangeText : (text: string)=> void;
    opNewSearch: ()=> void;
    opNextCloseSearch: ()=> void;
    opCloseSearch: ()=> void;
    showOptions : boolean;
    setShowOptions: () => void;
    onSearch: () => void;
}
