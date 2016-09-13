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
var CLIRowSelectionBehaviour = (function (_super) {
    __extends(CLIRowSelectionBehaviour, _super);
    function CLIRowSelectionBehaviour() {
        _super.apply(this, arguments);
        this.lastStartFrom = -1;
    }
    CLIRowSelectionBehaviour.prototype.onGridReadyCLIRowSelectionBehaviour = function (e) {
        this.refreshOptionsCLIRowSelectionBehaviour();
    };
    CLIRowSelectionBehaviour.prototype.onCLIChangeCLIRowSelectionBehaviour = function (e) {
        var txt = e.detail;
        for (var _i = 0, _a = CLIRowSelectionBehaviour.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (txt.indexOf(option.id) === 0) {
                this.lastStartFrom = option.id.length;
                this.fire(main_2.CLIBehaviour.EVENT_SET_START_FROM, option.id.length);
                this.fire(main_2.CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, option.options);
                return;
            }
        }
    };
    CLIRowSelectionBehaviour.prototype.onEnterKeyCLIRowSelectionBehaviour = function (e) {
        var gridApi = this.fire(main_2.AgGridPolymer.EVENT_GET_GRID_OPTIONS).detail.api;
        var optionName = this.lastStartFrom > 0 ? e.detail.substr(0, this.lastStartFrom) : e.detail;
        if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_INVERT_SELECTION) {
            var selected = gridApi.getBestCostNodeSelection();
            gridApi.selectAll();
            for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
                var node = selected_1[_i];
                node.setSelected(false);
            }
        }
        if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ALL)
            gridApi.selectAll();
        if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_NO || optionName == CLIRowSelectionBehaviour.OPTION_NAME_CLEAR_SELECTION)
            gridApi.deselectAll();
        if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ODD || optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_EVEN) {
            gridApi.forEachNode(function (node) {
                if ((node.childIndex + 1) & 1) {
                    if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ODD)
                        node.setSelected(true);
                }
                else {
                    if (optionName == CLIRowSelectionBehaviour.OPTION_NAME_SELECT_EVEN)
                        node.setSelected(true);
                }
            });
        }
        this.refreshOptionsCLIRowSelectionBehaviour();
    };
    CLIRowSelectionBehaviour.prototype.refreshOptionsCLIRowSelectionBehaviour = function () {
        CLIRowSelectionBehaviour.options = [];
        var option = {};
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
    };
    CLIRowSelectionBehaviour.options = [];
    CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ALL = 'select all rows';
    CLIRowSelectionBehaviour.OPTION_NAME_SELECT_NO = 'select no rows';
    CLIRowSelectionBehaviour.OPTION_NAME_CLEAR_SELECTION = 'clear selection';
    CLIRowSelectionBehaviour.OPTION_NAME_INVERT_SELECTION = 'invert selection';
    CLIRowSelectionBehaviour.OPTION_NAME_SELECT_ODD = 'select odd rows';
    CLIRowSelectionBehaviour.OPTION_NAME_SELECT_EVEN = 'select even rows';
    __decorate([
        listen(main_1.Events.EVENT_GRID_READY), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIRowSelectionBehaviour.prototype, "onGridReadyCLIRowSelectionBehaviour", null);
    __decorate([
        listen(main_2.CLIBehaviour.EVENT_ON_CHANGE), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIRowSelectionBehaviour.prototype, "onCLIChangeCLIRowSelectionBehaviour", null);
    __decorate([
        listen(main_2.CLIBehaviour.EVENT_ON_ENTER_KEY), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIRowSelectionBehaviour.prototype, "onEnterKeyCLIRowSelectionBehaviour", null);
    return CLIRowSelectionBehaviour;
}(polymer.Base));
exports.CLIRowSelectionBehaviour = CLIRowSelectionBehaviour;
