import {Events, GridApi, GridOptions, ColDef} from 'ag-grid/main';
import {AgGridPolymer, CLIBehaviour} from 'ag-grid-polymer/main';

export class CLIRowSelectionBehaviour extends polymer.Base {

    static options:Array<any> = [];

    static OPTION_NAME_SELECT_ALL:string = 'select all rows';
    static OPTION_NAME_SELECT_NO:string = 'select no rows';
    static OPTION_NAME_CLEAR_SELECTION:string = 'clear selection';
    static OPTION_NAME_INVERT_SELECTION:string = 'invert selection';
    static OPTION_NAME_SELECT_ODD:string = 'select odd rows';
    static OPTION_NAME_SELECT_EVEN:string = 'select even rows';

    private lastStartFrom:number = -1;

    @listen(Events.EVENT_GRID_READY)
    onGridReadyCLIRowSelectionBehaviour(e:CustomEvent) {
        this.refreshOptionsCLIRowSelectionBehaviour();
    }

    @listen(CLIBehaviour.EVENT_ON_CHANGE)
    onCLIChangeCLIRowSelectionBehaviour(e:CustomEvent) {
        let txt:string = e.detail;

        // search the matching combination.
        for (let option of CLIRowSelectionBehaviour.options) {
            if (txt.indexOf(option.id) === 0) {
                this.lastStartFrom = option.id.length;
                this.fire(CLIBehaviour.EVENT_SET_START_FROM, option.id.length);
                this.fire(CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, option.options);
                return;
            }
        }
    }

    @listen(CLIBehaviour.EVENT_ON_ENTER_KEY)
    onEnterKeyCLIRowSelectionBehaviour(e:CustomEvent) {
        let gridApi:GridApi = (<GridOptions>this.fire(AgGridPolymer.EVENT_GET_GRID_OPTIONS).detail).api;
        let optionName:string = this.lastStartFrom > 0 ? e.detail.substr(0, this.lastStartFrom) : e.detail;

        if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_INVERT_SELECTION) {
            let selected:Array<any> = gridApi.getBestCostNodeSelection();
            gridApi.selectAll();
            for (let node of selected)
                node.setSelected(false);
        }
        if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ALL)
            gridApi.selectAll();
        if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_NO || optionName == CLIRowSelectionBehaviour.OPTION_NAME_CLEAR_SELECTION)
            gridApi.deselectAll();
        if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ODD || optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_EVEN) {
            gridApi.forEachNode(function(node:any):void {
                if (<number>(node.childIndex + 1) & 1) {
                    if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ODD)
                        node.setSelected(true);
                } else {
                    if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_EVEN)
                        node.setSelected(true);
                }
            });
        }


        this.refreshOptionsCLIRowSelectionBehaviour();
    }

    refreshOptionsCLIRowSelectionBehaviour() {
        CLIRowSelectionBehaviour.options = [];
        let option:any = {};
        option.id = '';
        option.options = [
            CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ALL,
            CLIRowSelectionBehaviour.OPTION_NAME_SELECT_NO,
            CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ODD,
            CLIRowSelectionBehaviour.OPTION_NAME_SELECT_EVEN,
            CLIRowSelectionBehaviour.OPTION_NAME_CLEAR_SELECTION,
            CLIRowSelectionBehaviour.OPTION_NAME_INVERT_SELECTION
        ];
        CLIRowSelectionBehaviour.options.push(option);
    }

}
