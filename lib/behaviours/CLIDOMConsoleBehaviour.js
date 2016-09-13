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
var CLIDOMConsoleBehaviour = (function (_super) {
    __extends(CLIDOMConsoleBehaviour, _super);
    function CLIDOMConsoleBehaviour() {
        _super.apply(this, arguments);
    }
    CLIDOMConsoleBehaviour.prototype.extractTextForAutocompletion = function (code) {
        var isLetterOrDigitOrWhitespaceOrDot = function (ch) {
            return ch === '.' ||
                (ch >= 'A' && ch <= 'Z') ||
                (ch >= 'a' && ch <= 'z') ||
                (ch >= '0' && ch <= '9') ||
                ch === '$' ||
                ch === '_' ||
                ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'.indexOf(ch) !== -1;
        };
        var snip = code;
        for (var i = code.length - 1; i >= 0; i--) {
            var ch = code.charAt(i);
            if (isLetterOrDigitOrWhitespaceOrDot(ch) === false) {
                snip = code.substring(i + 1);
                break;
            }
        }
        var ix = snip.lastIndexOf('.');
        if (ix === -1)
            return { v1: '', v2: snip };
        else
            return {
                v1: snip.substring(0, ix),
                v2: snip.substring(ix + 1)
            };
    };
    ;
    CLIDOMConsoleBehaviour.prototype.onCLIDOMConsoleOptionsFeatureEnterKey = function (e) {
        var text = e.detail;
        var resp;
        var respString;
        try {
            resp = eval(text);
        }
        catch (e) {
            resp = e;
        }
        respString = resp + '';
        if (respString.indexOf('[object') != -1)
            alert(this.stringify(resp));
        else if (text.indexOf('alert') < 0)
            alert(respString);
    };
    CLIDOMConsoleBehaviour.prototype.onCLIDOMConsoleOptionsFeatureChange = function (e) {
        var text = e.detail;
        if (text.length == 0) {
            var options_1 = [];
            for (var i in window)
                options_1.push('' + i);
            options_1.sort();
            this.fire(main_1.CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, options_1);
            return;
        }
        var v = this.extractTextForAutocompletion(text);
        var oj;
        if (v.v1 == '')
            v.v1 = 'window';
        try {
            oj = eval(v.v1);
        }
        catch (ex) {
            oj = null;
        }
        var options = [];
        for (var i in oj)
            options.push('' + i);
        options.sort();
        this.fire(main_1.CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, options);
        this.fire(main_1.CLIBehaviour.EVENT_SET_START_FROM, text.lastIndexOf('.') + 1);
    };
    CLIDOMConsoleBehaviour.prototype.stringify = function (object) {
        var seen = [];
        return JSON.stringify(object, function (key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        });
    };
    __decorate([
        listen(main_1.CLIBehaviour.EVENT_ON_ENTER_KEY), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIDOMConsoleBehaviour.prototype, "onCLIDOMConsoleOptionsFeatureEnterKey", null);
    __decorate([
        listen(main_1.CLIBehaviour.EVENT_ON_CHANGE), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIDOMConsoleBehaviour.prototype, "onCLIDOMConsoleOptionsFeatureChange", null);
    return CLIDOMConsoleBehaviour;
}(polymer.Base));
exports.CLIDOMConsoleBehaviour = CLIDOMConsoleBehaviour;
