// ag-grid-polymer v0.0.5
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var main_1 = require('ag-grid/main');
var AgGridPolymer = (function (_super) {
    __extends(AgGridPolymer, _super);
    function AgGridPolymer() {
        _super.call(this);
        this.gridOptions = {};
        this._initialised = false;
        this.createGrid();
    }
    AgGridPolymer.prototype.apiGetGridOptions = function (e) {
        e.returnValue = true;
        e.detail = this.gridOptions;
    };
    AgGridPolymer.prototype.applyAttributesToGridOptions = function (a) {
        for (var _i = 0, _a = main_1.ComponentUtil.ARRAY_PROPERTIES
            .concat(main_1.ComponentUtil.STRING_PROPERTIES)
            .concat(main_1.ComponentUtil.OBJECT_PROPERTIES)
            .concat(main_1.ComponentUtil.FUNCTION_PROPERTIES)
            .concat(main_1.ComponentUtil.getEventCallbacks()); _i < _a.length; _i++) {
            var key = _a[_i];
            if (a.hasOwnProperty(key.toLowerCase()))
                this.gridOptions[key] = a[key.toLowerCase()].currentValue;
        }
        for (var _b = 0, _c = main_1.ComponentUtil.BOOLEAN_PROPERTIES; _b < _c.length; _b++) {
            var key = _c[_b];
            if (a.hasOwnProperty(key.toLowerCase()))
                this.gridOptions[key] = main_1.ComponentUtil.toBoolean(a[key.toLowerCase()].currentValue);
        }
        for (var _d = 0, _e = main_1.ComponentUtil.NUMBER_PROPERTIES; _d < _e.length; _d++) {
            var key = _e[_d];
            if (a.hasOwnProperty(key.toLowerCase()))
                this.gridOptions[key] = main_1.ComponentUtil.toNumber(a[key.toLowerCase()].currentValue);
        }
        if (this.gridOptions && this.gridOptions.api) {
            if (a.showtoolpanel)
                this.gridOptions.api.showToolPanel(main_1.ComponentUtil.toBoolean(a.showtoolpanel.currentValue));
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
    };
    AgGridPolymer.prototype.createOptions = function () {
        this.applyAttributesToGridOptions(this.getAttributesObject());
        this.gridOptions.columnDefs = this.getColumnDefinitions();
        return this.gridOptions;
    };
    AgGridPolymer.prototype.getColumnDefinitions = function () {
        return [];
    };
    AgGridPolymer.prototype.createGrid = function () {
        this.gridOptions = this.createOptions();
        new main_1.Grid(this.root, this.gridOptions, this.eventsReDispatcher.bind(this));
        this._initialised = true;
    };
    AgGridPolymer.prototype.eventsReDispatcher = function (eventType, event) {
        this.fire(eventType, {
            event: event,
            grid: this
        });
    };
    AgGridPolymer.prototype.getAttributesObject = function () {
        var result = {};
        if (this.attributes)
            for (var i = 0; i < this.attributes.length; i++) {
                var a = this.attributes[i];
                result[a.name] = {
                    currentValue: a.value
                };
            }
        return result;
    };
    AgGridPolymer.prototype.detached = function () {
        if (this._initialised) {
            this.gridOptions.api.destroy();
            this._initialised = false;
        }
    };
    AgGridPolymer.prototype.attributeChanged = function (attrName, oldVal, newVal) {
        if (!this._initialised)
            return;
        var changes = {};
        changes[attrName] = {
            currentValue: newVal,
            oldValue: oldVal
        };
        this.applyAttributesToGridOptions(changes);
    };
    AgGridPolymer.UNIQUE_ID = 'id' + new Date().getTime();
    AgGridPolymer.EVENT_GET_GRID_OPTIONS = AgGridPolymer.UNIQUE_ID + 'getGridOptions';
    __decorate([
        listen(AgGridPolymer.EVENT_GET_GRID_OPTIONS), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], AgGridPolymer.prototype, "apiGetGridOptions", null);
    AgGridPolymer = __decorate([
        component("ag-grid-polymer"), 
        __metadata('design:paramtypes', [])
    ], AgGridPolymer);
    return AgGridPolymer;
}(polymer.Base));
exports.AgGridPolymer = AgGridPolymer;
