# Ag-Grid Polymer Element

Use Ag-grid.com as Polymer Element.

# Table of contents

- [Installation](#install)
- [Supported behaviours](#behaviours)
- [Sample](#sample)


# Installation <a name="install"></a>

Install via npm:
```
npm install -g ag-grid-polymer
```
You'll get the following files in `node_modules/ag-grid-polymer/src`:
- `AgGridPolymer.ts` the base class for own/custom grid configurations
- `behaviours` the folder contains behaviour classes to compliment grid configuration classes via @behaviour decorator
- `sample` the folder contains example of simple usage of the AgGridPolymer class, to build your own grid element

To Install all needed dependencies:
```
cd .\ag-grid-polymer
npm install
```

# Supported behaviours <a name="behaviours"></a>

- ThemeBehaviour - let's you load grid css files in runtime, provides easy to use grid element attribute "theme", value can be one of ['blue', 'dark', 'fresh']
- EnterpriseBehaviour - let's you specify which version of Ag-grid this should be, basic or Enterprise. Provides easy to use grid element attribute "enterprise" value can be one of ['true', 'false']
- CLIBehaviour - is used to add "Smart" Command Line text Input control above Grid header and manipulate grids's content via keyboard only. Extendable by other behaviours providing command line options to choose from.
   - CLIRowSelectionBehaviour - adds grid rows selection options to the command line interface
   - CLIShowHideColumnsBehaviour - adds grid columns show/hide options to the command line interface

# Sample grid element configuration <a name="sample"></a>

'src/sample' folder contains an example of the basic Grid element usage pattern.

'src/sample/index.html' contains:
```HTML
<html>
<head>
    <title>Ag-Grid Polymer Element Sample</title>

    <!-- Polymer stuff -->
    <script src="../../node_modules/webcomponentsjs/lite.js"></script>
    <link rel="import" href="../../node_modules/Polymer/polymer.html">
    <link rel="import" href="../../node_modules/polymer-ts/polymer-ts.min.html">
    <!-- Custom Polymer Grid Elements -->
    <link rel="import" href="../../lib/sample/grid-components.html">
</head>

<body>
    <!-- Example of a Command Line interfaced Grid configuration,
    Use command line in the Grid header to type some text commands
    feel free to Select rows, show/hide columns via Keyboard commands, easy fast elegant (: -->
    <my-cli-grid
            theme="blue"
            styles="../../node_modules/ag-grid/dist/styles/"
            enterprise="true"
            debug="false"
            rowHeight="22"
            rowSelection="multiple"
            enableColResize
            suppressRowClickSelection>
    </my-cli-grid>
</body>
</html>
```

Just throw this index.html in your web browser and try to type some text commands in the grid header command line
like "hide column ..., select all rows, select even rows, etc."


Example of the grid configuration provided in the (`src/sample/my-grid.ts`) file:
```TypeScript
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
```
