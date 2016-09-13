import {CLIBehaviour} from 'ag-grid-polymer/main';

export class CLITransportationBehaviour extends polymer.Base {

    static SmartSearchOptions = [
        {
            id: 'I need a train from rome ',
            options: ['to ancona', 'to ferrara', 'to florence', 'to parma', 'to pavia', 'to perugia', 'to pisa', 'to pistoia', 'to rapallo', 'to ravenna', 'to rimini', 'to siena', 'to trento', 'to turin', 'to venice']
        },
        {
            id: 'I need a train from london ',
            options: ['to brighton', 'to bristol', 'to birmingham', 'to leeds', 'to leicester', 'to liverpool', 'to reading']
        },
        {
            id: 'I need a train from paris ',
            options: ['to lille', 'to limoges', 'to lyon', 'to marseille', 'to montpellier']
        },
        {
            id: 'I need a bus from london ',
            options: ['to bath', 'to birmingham', 'to bristol', 'to cambridge', 'to canterbury', 'to chester', 'to york']
        },
        {
            id: 'I need a bus from paris ',
            options: ['to aix-en-provence', 'to avignon', 'to bordeaux', 'to boulogne-billancourt', 'to lille']
        },
        {
            id: 'I need a bus from rome ',
            options: ['to arezzo', 'to asti', 'to bari', 'to barletta', 'to bergamo', 'to bologna', 'to livorno', 'to lucca', 'to rapallo', 'to ravenna', 'to rieti', 'to rimini', 'to siena']
        },
        {id: 'I need a bus from manchester ', options: ['to liverpool']},
        {id: 'I need a bus from liverpool ', options: ['to machester']},
        {
            id: 'I need a flight from london ',
            options: ['to amsterdam', 'to barcellona', 'to bergen', 'to belfast', 'to berlin', 'to dublin', 'to frankfurt', 'to malaga', 'to milan', 'to moskow', 'to riga', 'to rome']
        },
        {
            id: 'I need a flight from amsterdam ',
            options: ['to barcellona', 'to bergen', 'to belfast', 'to berlin', 'to dublin', 'to geneva', 'to lisbon', 'to lyon', 'to madrid', 'to moskow', 'to riga', 'to rome']
        },
        {id: 'I need a flight from barcellona ', options: ['to dublin', 'to rome']},
        {id: 'I need a flight from dublin ', options: ['to edinburgh', 'to lisbon', 'to munich']},
        {
            id: 'I need a flight from frankfurt ',
            options: ['to copenhagen', 'to edinburgh ', 'to faro', 'to lisbon', 'to malmo', 'to milan', 'to rome']
        },
        {
            id: 'I need a flight from munich ',
            options: ['to faro', 'to lisbon', 'to malmo', 'to milan', 'to oslo', 'to paris']
        },
        {
            id: 'I need a flight from rome ',
            options: ['to london', 'to madrid', 'to malta', 'to manchester', 'to milan', 'to moskow', 'to munich', 'to oslo', 'to paris', 'to porto', 'to prague', 'to saint petersburg', 'to stockholm', 'to warsaw', 'to zurich']
        },
        {
            id: 'I need a flight ',
            options: ['from london ', 'from amsterdam ', 'from barcellona ', 'from dublin ', 'from frankfurt ', 'from munich ', 'from rome ']
        },
        {id: 'I need a train ', options: ['from london ', 'from paris ', 'from rome ']},
        {
            id: 'I need a bus ',
            options: ['from london ', 'from liverpool ', 'from manchester ', 'from paris ', 'from rome ']
        },
        {id: '', options: ['I need a train ', 'I need a bus ', 'I need a flight ']}
    ];

    @listen(CLIBehaviour.EVENT_ON_CHANGE)
    onCLITransportFeatureChange(e:CustomEvent) {
        let txt:string = e.detail;

        if (txt === 'i') {
            this.fire(CLIBehaviour.EVENT_SET_TEXT, 'I'); // special case i becomes I.
            return;
        }

        // search the matching combination.
        for (let i = 0; i < CLITransportationBehaviour.SmartSearchOptions.length; i++) {
            if (txt.indexOf(CLITransportationBehaviour.SmartSearchOptions[i].id) === 0) {
                this.fire(CLIBehaviour.EVENT_SET_START_FROM, CLITransportationBehaviour.SmartSearchOptions[i].id.length);
                this.fire(CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, CLITransportationBehaviour.SmartSearchOptions[i].options);
                return;
            }
        }
    }

}
