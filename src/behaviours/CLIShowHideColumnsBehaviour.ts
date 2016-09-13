import {Events, ColumnApi, GridOptions, ColDef} from 'ag-grid/main';
import {AgGridPolymer, CLIBehaviour} from 'ag-grid-polymer/main';

export class CLIShowHideColumnsBehaviour extends polymer.Base {

    static options:Array<any> = [];

    static OPTION_NAME_HIDE:string = 'hide column ';
    static OPTION_NAME_SHOW:string = 'show column ';

    private lastStartFrom:number;

    @listen(Events.EVENT_GRID_READY)
    @listen(Events.EVENT_COLUMN_PINNED)
    @listen(Events.EVENT_COLUMN_VISIBLE)
    @listen(Events.EVENT_NEW_COLUMNS_LOADED)
    onGridReadyShowHideColumnsFeature(e:CustomEvent) {
        this.refreshOptions();
    }

    @listen(CLIBehaviour.EVENT_ON_CHANGE)
    onCLIChangeShowHideColumnsFeature(e:CustomEvent) {
        let txt:string = e.detail;

        // search the matching combination.
        for (let option of CLIShowHideColumnsBehaviour.options) {
            if (txt.indexOf(option.id) === 0) {
                this.lastStartFrom = option.id.length;
                this.fire(CLIBehaviour.EVENT_SET_START_FROM, option.id.length);
                this.fire(CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, option.options);
                return;
            }
        }
    }

    @listen(CLIBehaviour.EVENT_ON_ENTER_KEY)
    onEnterKeyShowHideColumnsFeature(e:CustomEvent) {
        let columnApi:ColumnApi = (<GridOptions>this.fire(AgGridPolymer.EVENT_GET_GRID_OPTIONS).detail).columnApi;
        let optionName:string = e.detail.substr(0, this.lastStartFrom);
        let columnName:string = e.detail.substr(this.lastStartFrom);
        let column:ColDef = this.getColumnDefByColName(columnName, columnApi);

        if (optionName == CLIShowHideColumnsBehaviour.OPTION_NAME_HIDE)
            columnApi.setColumnVisible(column, false);

        if (optionName == CLIShowHideColumnsBehaviour.OPTION_NAME_SHOW)
            columnApi.setColumnVisible(column, true);

        this.refreshOptions();
    }

    refreshOptions() {
        let columnApi:ColumnApi = (<GridOptions>this.fire(AgGridPolymer.EVENT_GET_GRID_OPTIONS).detail).columnApi;

        CLIShowHideColumnsBehaviour.options = [];
        let option:any = {};
        option.id = CLIShowHideColumnsBehaviour.OPTION_NAME_HIDE;
        option.options = [];
        for (let column of columnApi.getAllDisplayedColumns())
            if (!column.isPinned())
                option.options.push(this.getColumnNameByColDef(column.getColDef()));
        CLIShowHideColumnsBehaviour.options.push(option);

        option = {};
        option.id = CLIShowHideColumnsBehaviour.OPTION_NAME_SHOW;
        option.options = [];
        for (let column of columnApi.getAllColumns()) {
            if (!column.isVisible())
                option.options.push(this.getColumnNameByColDef(column.getColDef()));
        }
        CLIShowHideColumnsBehaviour.options.push(option);

        option = {};
        option.id = '';
        option.options = [CLIShowHideColumnsBehaviour.OPTION_NAME_HIDE, CLIShowHideColumnsBehaviour.OPTION_NAME_SHOW];
        CLIShowHideColumnsBehaviour.options.push(option);
    }

    getColumnDefByColName(name:string, columnApi:ColumnApi):ColDef {
        let result:ColDef;

        for (let column of columnApi.getAllColumns())
            if (column.getColDef().headerName == name || column.getColDef().field == name)
                result = column.getColDef();

        return result;
    }

    getColumnNameByColDef(cdef:ColDef):string {
        let name:string = '';

        if (cdef.headerName.length > 0)
            name = cdef.headerName;

        if (name.length == 0)
            name = cdef.field;

        return name;
    }

}
