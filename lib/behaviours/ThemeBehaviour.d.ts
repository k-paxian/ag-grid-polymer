// ag-grid-polymer v0.0.5
export declare class ThemeBehaviour extends polymer.Base {
    static GRID_STYLES_PATH: string;
    static STYLE_GENERIC: string;
    static GRID_ID_PREFIX: string;
    static THEME_FILE_PREFIX: string;
    static THEME_CSS_CLASS_PREFIX: string;
    static DEFAULT_THEME: string;
    theme: String;
    styles: String;
    static styleTags: any[];
    onThemeBehaviourGridReady(e?: CustomEvent): void;
    onCellClicked(): void;
    onThemeBehaviour_stylesPathChanged(newValue: any, oldValue: any): void;
    onThemeBehaviour_themeChanged(newValue: any, oldValue: any): void;
    static _removeAllStyleTagsFromHead(): void;
    detached(): void;
    static addStyleSheetFile(id: string): void;
}
