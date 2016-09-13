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
var main_1 = require('ag-grid-polymer/main');
var dummyData_1 = require('./dummyData');
var myGrid = (function (_super) {
    __extends(myGrid, _super);
    function myGrid() {
        _super.apply(this, arguments);
    }
    myGrid.prototype.createOptions = function () {
        var result = _super.prototype.createOptions.call(this);
        result.rowData = dummyData_1.RefData.FundData;
        return result;
    };
    myGrid.prototype.getColumnDefinitions = function () {
        return [
            {
                headerName: '#',
                width: 30,
                checkboxSelection: true,
                suppressSorting: true,
                suppressSizeToFit: true,
                suppressMenu: true,
                pinned: true
            },
            {
                headerName: '',
                field: "flagged"
            },
            {
                headerName: 'Notification Date',
                field: "notificationDate"
            },
            {
                headerName: 'SSI ID',
                field: "ssiId"
            },
            {
                headerName: 'MP ID',
                field: "mpId"
            }, {
                headerName: 'Bulk ID',
                field: "bulkId"
            },
            {
                headerName: 'Parent',
                field: "parent"
            },
            {
                headerName: 'LegalEntity',
                field: "legalEntity"
            },
            {
                headerName: 'Product',
                field: "product"
            },
            {
                headerName: 'CCY',
                field: "ccy"
            },
            {
                headerName: 'Effective Date',
                field: "effectiveDate"
            },
            {
                headerName: 'Intermediary Bank',
                field: "intermediaryBank"
            },
            {
                headerName: 'Beneficiary Bank',
                field: "beneficiaryBank"
            },
            {
                headerName: 'Final Beneficiary Bank',
                field: "finalBeneficiaryBank"
            },
        ];
    };
    myGrid = __decorate([
        behavior(main_1.EnterpriseBehaviour),
        behavior(main_1.ThemeBehaviour),
        behavior(main_1.CLIBehaviour),
        behavior(main_1.CLIShowHideColumnsBehaviour),
        behavior(main_1.CLIRowSelectionBehaviour),
        component("my-cli-grid"), 
        __metadata('design:paramtypes', [])
    ], myGrid);
    return myGrid;
}(main_1.AgGridPolymer));
myGrid.register();
