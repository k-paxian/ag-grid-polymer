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
var CLITransportationBehaviour = (function (_super) {
    __extends(CLITransportationBehaviour, _super);
    function CLITransportationBehaviour() {
        _super.apply(this, arguments);
    }
    CLITransportationBehaviour.prototype.onCLITransportFeatureChange = function (e) {
        var txt = e.detail;
        if (txt === 'i') {
            this.fire(main_1.CLIBehaviour.EVENT_SET_TEXT, 'I');
            return;
        }
        for (var i = 0; i < CLITransportationBehaviour.SmartSearchOptions.length; i++) {
            if (txt.indexOf(CLITransportationBehaviour.SmartSearchOptions[i].id) === 0) {
                this.fire(main_1.CLIBehaviour.EVENT_SET_START_FROM, CLITransportationBehaviour.SmartSearchOptions[i].id.length);
                this.fire(main_1.CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, CLITransportationBehaviour.SmartSearchOptions[i].options);
                return;
            }
        }
    };
    CLITransportationBehaviour.SmartSearchOptions = [
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
        { id: 'I need a bus from manchester ', options: ['to liverpool'] },
        { id: 'I need a bus from liverpool ', options: ['to machester'] },
        {
            id: 'I need a flight from london ',
            options: ['to amsterdam', 'to barcellona', 'to bergen', 'to belfast', 'to berlin', 'to dublin', 'to frankfurt', 'to malaga', 'to milan', 'to moskow', 'to riga', 'to rome']
        },
        {
            id: 'I need a flight from amsterdam ',
            options: ['to barcellona', 'to bergen', 'to belfast', 'to berlin', 'to dublin', 'to geneva', 'to lisbon', 'to lyon', 'to madrid', 'to moskow', 'to riga', 'to rome']
        },
        { id: 'I need a flight from barcellona ', options: ['to dublin', 'to rome'] },
        { id: 'I need a flight from dublin ', options: ['to edinburgh', 'to lisbon', 'to munich'] },
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
        { id: 'I need a train ', options: ['from london ', 'from paris ', 'from rome '] },
        {
            id: 'I need a bus ',
            options: ['from london ', 'from liverpool ', 'from manchester ', 'from paris ', 'from rome ']
        },
        { id: '', options: ['I need a train ', 'I need a bus ', 'I need a flight '] }
    ];
    __decorate([
        listen(main_1.CLIBehaviour.EVENT_ON_CHANGE), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLITransportationBehaviour.prototype, "onCLITransportFeatureChange", null);
    return CLITransportationBehaviour;
}(polymer.Base));
exports.CLITransportationBehaviour = CLITransportationBehaviour;
