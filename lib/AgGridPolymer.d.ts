// ag-grid-polymer v0.0.5
/// <reference path="../../polymer-ts/polymer-ts.d.ts" />
import { GridOptions } from 'ag-grid/main';
export declare class AgGridPolymer extends polymer.Base {
    static UNIQUE_ID: string;
    static EVENT_GET_GRID_OPTIONS: string;
    protected gridOptions: GridOptions;
    private _initialised;
    constructor();
    apiGetGridOptions(e: CustomEvent): void;
    protected applyAttributesToGridOptions(a: any): void;
    protected createOptions(): GridOptions;
    protected getColumnDefinitions(): any[];
    protected createGrid(): void;
    private eventsReDispatcher(eventType, event);
    getAttributesObject(): any;
    detached(): void;
    attributeChanged(attrName: string, oldVal: any, newVal: any): void;
}
