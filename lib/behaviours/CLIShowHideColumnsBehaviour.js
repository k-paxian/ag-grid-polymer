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
var main_2 = require('ag-grid-polymer/main');
var CLIShowHideColumnsBehaviour = (function (_super) {
    __extends(CLIShowHideColumnsBehaviour, _super);
    function CLIShowHideColumnsBehaviour() {
        _super.apply(this, arguments);
    }
    CLIShowHideColumnsBehaviour.prototype.onGridReadyShowHideColumnsFeature = function (e) {
        this.refreshOptions();
    };
    CLIShowHideColumnsBehaviour.prototype.onCLIChangeShowHideColumnsFeature = function (e) {
        var txt = e.detail;
        for (var _i = 0, _a = CLIShowHideColumnsBehaviour.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (txt.indexOf(option.id) === 0) {
                this.lastStartFrom = option.id.length;
                this.fire(main_2.CLIBehaviour.EVENT_SET_START_FROM, option.id.length);
                this.fire(main_2.CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, option.options);
                return;
            }
        }
    };
    CLIShowHideColumnsBehaviour.prototype.onEnterKeyShowHideColumnsFeature = function (e) {
        var columnApi = this.fire(main_2.AgGridPolymer.EVENT_GET_GRID_OPTIONS).detail.columnApi;
        var optionName = e.detail.substr(0, this.lastStartFrom);
        var columnName = e.detail.substr(this.lastStartFrom);
        var column = this.getColumnDefByColName(columnName, columnApi);
        if (optionName == CLIShowHideColumnsBehaviour.OPTION_NAME_HIDE)
            columnApi.setColumnVisible(column, false);
        if (optionName == CLIShowHideColumnsBehaviour.OPTION_NAME_SHOW)
            columnApi.setColumnVisible(column, true);
        this.refreshOptions();
    };
    CLIShowHideColumnsBehaviour.prototype.refreshOptions = function () {
        var columnApi = this.fire(main_2.AgGridPolymer.EVENT_GET_GRID_OPTIONS).detail.columnApi;
        CLIShowHideColumnsBehaviour.options = [];
        var option = {};
        option.id = CLIShowHideColumnsBehaviour.OPTION_NAME_HIDE;
        option.options = [];
        for (var _i = 0, _a = columnApi.getAllDisplayedColumns(); _i < _a.length; _i++) {
            var column = _a[_i];
            if (!column.isPinned())
                option.options.push(this.getColumnNameByColDef(column.getColDef()));
        }
        CLIShowHideColumnsBehaviour.options.push(option);
        option = {};
        option.id = CLIShowHideColumnsBehaviour.OPTION_NAME_SHOW;
        option.options = [];
        for (var _b = 0, _c = columnApi.getAllColumns(); _b < _c.length; _b++) {
            var column = _c[_b];
            if (!column.isVisible())
                option.options.push(this.getColumnNameByColDef(column.getColDef()));
        }
        CLIShowHideColumnsBehaviour.options.push(option);
        option = {};
        option.id = '';
        option.options = [CLIShowHideColumnsBehaviour.OPTION_NAME_HIDE, CLIShowHideColumnsBehaviour.OPTION_NAME_SHOW];
        CLIShowHideColumnsBehaviour.options.push(option);
    };
    CLIShowHideColumnsBehaviour.prototype.getColumnDefByColName = function (name, columnApi) {
        var result;
        for (var _i = 0, _a = columnApi.getAllColumns(); _i < _a.length; _i++) {
            var column = _a[_i];
            if (column.getColDef().headerName == name || column.getColDef().field == name)
                result = column.getColDef();
        }
        return result;
    };
    CLIShowHideColumnsBehaviour.prototype.getColumnNameByColDef = function (cdef) {
        var name = '';
        if (cdef.headerName.length > 0)
            name = cdef.headerName;
        if (name.length == 0)
            name = cdef.field;
        return name;
    };
    CLIShowHideColumnsBehaviour.options = [];
    CLIShowHideColumnsBehaviour.OPTION_NAME_HIDE = 'hide column ';
    CLIShowHideColumnsBehaviour.OPTION_NAME_SHOW = 'show column ';
    __decorate([
        listen(main_1.Events.EVENT_GRID_READY),
        listen(main_1.Events.EVENT_COLUMN_PINNED),
        listen(main_1.Events.EVENT_COLUMN_VISIBLE),
        listen(main_1.Events.EVENT_NEW_COLUMNS_LOADED), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIShowHideColumnsBehaviour.prototype, "onGridReadyShowHideColumnsFeature", null);
    __decorate([
        listen(main_2.CLIBehaviour.EVENT_ON_CHANGE), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIShowHideColumnsBehaviour.prototype, "onCLIChangeShowHideColumnsFeature", null);
    __decorate([
        listen(main_2.CLIBehaviour.EVENT_ON_ENTER_KEY), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIShowHideColumnsBehaviour.prototype, "onEnterKeyShowHideColumnsFeature", null);
    return CLIShowHideColumnsBehaviour;
}(polymer.Base));
exports.CLIShowHideColumnsBehaviour = CLIShowHideColumnsBehaviour;
