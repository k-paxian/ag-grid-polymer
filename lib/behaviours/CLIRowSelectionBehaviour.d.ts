// ag-grid-polymer v0.0.5
export declare class CLIRowSelectionBehaviour extends polymer.Base {
    static options: Array<any>;
    static OPTION_NAME_SELECT_ALL: string;
    static OPTION_NAME_SELECT_NO: string;
    static OPTION_NAME_CLEAR_SELECTION: string;
    static OPTION_NAME_INVERT_SELECTION: string;
    static OPTION_NAME_SELECT_ODD: string;
    static OPTION_NAME_SELECT_EVEN: string;
    private lastStartFrom;
    onGridReadyCLIRowSelectionBehaviour(e: CustomEvent): void;
    onCLIChangeCLIRowSelectionBehaviour(e: CustomEvent): void;
    onEnterKeyCLIRowSelectionBehaviour(e: CustomEvent): void;
    refreshOptionsCLIRowSelectionBehaviour(): void;
}
