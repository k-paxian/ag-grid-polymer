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
var main_2 = require('ag-grid-enterprise/main');
var EnterpriseBehaviour = (function (_super) {
    __extends(EnterpriseBehaviour, _super);
    function EnterpriseBehaviour() {
        _super.apply(this, arguments);
    }
    EnterpriseBehaviour.prototype.onEnterpriseBehaviourGridReady = function () {
        main_1.Grid.setEnterpriseBeans([]);
        if (this.enterprise == true)
            main_1.Grid.setEnterpriseBeans(EnterpriseBehaviour.eBEANS);
    };
    EnterpriseBehaviour.eBEANS = [main_2.ToolPanel, main_2.EnterpriseMenuFactory, main_2.RowGroupPanel,
        main_2.ColumnSelectPanel, main_2.RangeController, main_2.ClipboardService,
        main_2.ContextMenuFactory, main_2.GroupStage, main_2.AggregationStage, main_2.EnterpriseBoot,
        main_2.StatusBar];
    __decorate([
        property({
            reflectToAttribute: true,
            type: Object
        }), 
        __metadata('design:type', Boolean)
    ], EnterpriseBehaviour.prototype, "enterprise", void 0);
    __decorate([
        listen(main_1.Events.EVENT_GRID_READY), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], EnterpriseBehaviour.prototype, "onEnterpriseBehaviourGridReady", null);
    return EnterpriseBehaviour;
}(polymer.Base));
exports.EnterpriseBehaviour = EnterpriseBehaviour;
