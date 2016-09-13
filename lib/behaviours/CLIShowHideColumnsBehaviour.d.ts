// ag-grid-polymer v0.0.5
import { ColumnApi, ColDef } from 'ag-grid/main';
export declare class CLIShowHideColumnsBehaviour extends polymer.Base {
    static options: Array<any>;
    static OPTION_NAME_HIDE: string;
    static OPTION_NAME_SHOW: string;
    private lastStartFrom;
    onGridReadyShowHideColumnsFeature(e: CustomEvent): void;
    onCLIChangeShowHideColumnsFeature(e: CustomEvent): void;
    onEnterKeyShowHideColumnsFeature(e: CustomEvent): void;
    refreshOptions(): void;
    getColumnDefByColName(name: string, columnApi: ColumnApi): ColDef;
    getColumnNameByColDef(cdef: ColDef): string;
}
