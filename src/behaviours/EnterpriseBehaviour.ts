import {Events, Grid} from 'ag-grid/main';
import {ToolPanel, EnterpriseMenuFactory,RowGroupPanel,
    ColumnSelectPanel, RangeController, ClipboardService,
    ContextMenuFactory, GroupStage, AggregationStage, EnterpriseBoot,
    StatusBar} from 'ag-grid-enterprise/main';

/*
* Behaviour is used to support Enterprise ag-Grid Features
* just set attribute enterprise="true"
* */
export class EnterpriseBehaviour extends polymer.Base {

    static eBEANS:any[] = [ToolPanel, EnterpriseMenuFactory, RowGroupPanel,
        ColumnSelectPanel, RangeController, ClipboardService,
        ContextMenuFactory, GroupStage, AggregationStage, EnterpriseBoot,
        StatusBar];

    /* enterprise value can be one of (true | false) */
    @property({
        reflectToAttribute: true,
        type: Object
    })
    public enterprise:boolean;

    @listen(Events.EVENT_GRID_READY)
    onEnterpriseBehaviourGridReady() {
        Grid.setEnterpriseBeans([]);
        if (this.enterprise == true)
            Grid.setEnterpriseBeans(EnterpriseBehaviour.eBEANS);
    }
}
