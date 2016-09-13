/// <reference path="./../../polymer-ts/polymer-ts.d.ts" />
import {Grid, GridOptions, ComponentUtil, Events} from 'ag-grid/main';

@component("ag-grid-polymer")
export class AgGridPolymer extends polymer.Base {

    static UNIQUE_ID:string = 'id' + new Date().getTime();

    /* API Events */
    static EVENT_GET_GRID_OPTIONS:string = AgGridPolymer.UNIQUE_ID + 'getGridOptions';

    protected gridOptions:GridOptions = <GridOptions>{};

    // not intended for user to interact with. so putting _ in so if user gets reference
    // to this object, they kind'a know it's not part of the agreed interface
    private _initialised = false;

    constructor() {
        super();

        this.createGrid();
    }

    /* API */
    @listen(AgGridPolymer.EVENT_GET_GRID_OPTIONS)
    apiGetGridOptions(e:CustomEvent) {
        e.returnValue = true;
        e.detail = this.gridOptions;
    }

    protected applyAttributesToGridOptions(a:any) {
        for (let key of ComponentUtil.ARRAY_PROPERTIES
            .concat(ComponentUtil.STRING_PROPERTIES)
            .concat(ComponentUtil.OBJECT_PROPERTIES)
            .concat(ComponentUtil.FUNCTION_PROPERTIES)
            .concat(ComponentUtil.getEventCallbacks())
            ) {
            if (a.hasOwnProperty(key.toLowerCase()))
                (<any>this.gridOptions)[key] = <any>a[key.toLowerCase()].currentValue;
        }

        for (let key of ComponentUtil.BOOLEAN_PROPERTIES) {
            if (a.hasOwnProperty(key.toLowerCase()))
                (<any>this.gridOptions)[key] = ComponentUtil.toBoolean(a[key.toLowerCase()].currentValue);
        }

        for (let key of ComponentUtil.NUMBER_PROPERTIES) {
            if (a.hasOwnProperty(key.toLowerCase()))
                (<any>this.gridOptions)[key] = ComponentUtil.toNumber(a[key.toLowerCase()].currentValue);
        }

        if (this.gridOptions && this.gridOptions.api) {
            if (a.showtoolpanel)
                this.gridOptions.api.showToolPanel(ComponentUtil.toBoolean(a.showtoolpanel.currentValue));
            if (a.quickfiltertext)
                this.gridOptions.api.setQuickFilter(a.quickfiltertext.currentValue);
            if (a.rowdata)
                this.gridOptions.api.setRowData(a.rowdata.currentValue);
            if (a.floatingtoprowdata)
                this.gridOptions.api.setFloatingTopRowData(a.floatingtoprowdata.currentValue);
            if (a.floatingbottomrowdata)
                this.gridOptions.api.setFloatingBottomRowData(a.floatingbottomrowdata.currentValue);
            if (a.columndefs)
                this.gridOptions.api.setColumnDefs(a.columndefs.currentValue);
            if (a.datasource)
                this.gridOptions.api.setDatasource(a.datasource.currentValue);
            if (a.headerheight)
                this.gridOptions.api.setHeaderHeight(a.headerheight.currentValue);
        }
    }

    protected createOptions():GridOptions {
        this.applyAttributesToGridOptions(this.getAttributesObject());
        this.gridOptions.columnDefs = this.getColumnDefinitions();
        return this.gridOptions;
    }

    /* override this method to specify columns definitions array */
    protected getColumnDefinitions():any[] {
        return [];
    }

    protected createGrid() {
        this.gridOptions = this.createOptions();
        new Grid(this.root, this.gridOptions, this.eventsReDispatcher.bind(this));
        this._initialised = true;
    }

    private eventsReDispatcher(eventType:string, event:Event):void {
        this.fire(eventType,
            {
                event: event,
                grid: this
            }
        );
    }

    getAttributesObject():any {
        let result:any = {};

        if (this.attributes)
            for (let i:number = 0; i < this.attributes.length; i++) {
                let a:Attr = <Attr>this.attributes[i];
                result[a.name] = {
                    currentValue: a.value
                };
            }

        return result;
    }

    detached() {
        if (this._initialised) {
            this.gridOptions.api.destroy();
            this._initialised = false;
        }
    }

    attributeChanged(attrName:string, oldVal:any, newVal:any) {
        if (!this._initialised)
            return;

        let changes:any = {};
        changes[attrName] = {
            currentValue: newVal,
            oldValue: oldVal
        };

        this.applyAttributesToGridOptions(changes);
    }
}