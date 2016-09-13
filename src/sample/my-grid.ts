/// <reference path="./../../node_modules/polymer-ts/polymer-ts.d.ts" />
import {AgGridPolymer,
    EnterpriseBehaviour,
    ThemeBehaviour,
    CLIBehaviour,
    CLIShowHideColumnsBehaviour,
    CLIRowSelectionBehaviour} from 'ag-grid-polymer/main';
import {GridOptions} from 'ag-grid/main';
import {RefData} from './dummyData';


@behavior(EnterpriseBehaviour)
@behavior(ThemeBehaviour)
@behavior(CLIBehaviour)
@behavior(CLIShowHideColumnsBehaviour)
@behavior(CLIRowSelectionBehaviour)
@component("my-cli-grid")
class myGrid extends AgGridPolymer {

    protected createOptions():GridOptions {
        let result:GridOptions = super.createOptions();
        result.rowData = RefData.FundData;
        return result;
    }

    public getColumnDefinitions():any[] {
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
    }

}
myGrid.register();