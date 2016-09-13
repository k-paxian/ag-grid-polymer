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
var CLIBehaviour = (function (_super) {
    __extends(CLIBehaviour, _super);
    function CLIBehaviour() {
        _super.apply(this, arguments);
        this.rows = [];
        this.ix = 0;
        this.oldIndex = -1;
        this.currentOptions = [];
    }
    CLIBehaviour.prototype.apiOnSetText = function (e) {
        this.setText(e.detail);
    };
    CLIBehaviour.prototype.apiOnSetStartFrom = function (e) {
        this.startFrom = e.detail;
        this.txtInput.focus();
    };
    CLIBehaviour.prototype.apiOnSetCurrentOptions = function (e) {
        if (!this.currentOptions)
            this.currentOptions = [];
        if (this.startFrom == 0)
            this.currentOptions = this.currentOptions.concat(e.detail);
        else
            this.currentOptions = e.detail;
        this.repaint();
    };
    CLIBehaviour.prototype.onGridReadyCLIBehaviour = function (e) {
        this.createStuff();
        this.wrapper.appendChild(this.txtHint);
        this.wrapper.appendChild(this.txtInput);
        this.wrapper.appendChild(this.dropDown);
        var w = this.create('div', {});
        w.setAttribute("class", "ag-row-group-panel");
        w.appendChild(this.wrapper);
        e.detail.grid.root.children[0].insertBefore(w, e.detail.grid.root.children[0].childNodes[0]);
        this.registerEventListeners();
    };
    CLIBehaviour.prototype.createStuff = function () {
        CLIBehaviour.config.fontSize = '16px';
        CLIBehaviour.config.fontFamily = 'sans-serif';
        CLIBehaviour.config.promptInnerHTML = '';
        CLIBehaviour.config.color = '#333';
        CLIBehaviour.config.hintColor = '#aaa';
        CLIBehaviour.config.backgroundColor = '#fff';
        CLIBehaviour.config.dropDownBorderColor = '#aaa';
        CLIBehaviour.config.dropDownZIndex = 100;
        CLIBehaviour.config.dropDownOnHoverBackgroundColor = '#ddd';
        this.txtInput = this.create('input', {});
        CLIBehaviour.injectFeatureToElement(this.txtInput, this);
        this.txtInput.type = 'text';
        this.txtInput.spellcheck = false;
        this.txtInput.style.fontSize = CLIBehaviour.config.fontSize;
        this.txtInput.style.fontFamily = CLIBehaviour.config.fontFamily;
        this.txtInput.style.color = CLIBehaviour.config.color;
        this.txtInput.style.backgroundColor = CLIBehaviour.config.backgroundColor;
        this.txtInput.style.width = '100%';
        this.txtInput.style.outline = '0';
        this.txtInput.style.border = '0';
        this.txtInput.style.margin = '0';
        this.txtInput.style.padding = '0';
        this.txtInput.style.backgroundColor = 'transparent';
        this.txtInput.style.verticalAlign = 'top';
        this.txtInput.style.position = 'relative';
        this.txtHint = this.txtInput.cloneNode();
        this.txtHint.disabled = true;
        this.txtHint.style.position = 'absolute';
        this.txtHint.style.top = '0';
        this.txtHint.style.left = '0';
        this.txtHint.style.borderColor = 'transparent';
        this.txtHint.style.boxShadow = 'none';
        this.txtHint.style.color = CLIBehaviour.config.hintColor;
        this.wrapper = this.create('div', {});
        this.wrapper.style.position = 'relative';
        this.wrapper.style.outline = '0';
        this.wrapper.style.border = '0';
        this.wrapper.style.margin = '0';
        this.wrapper.style.padding = '0';
        this.prompt = this.create('div', {});
        this.prompt.style.position = 'absolute';
        this.prompt.style.outline = '0';
        this.prompt.style.margin = '0';
        this.prompt.style.padding = '0';
        this.prompt.style.border = '0';
        this.prompt.style.fontSize = CLIBehaviour.config.fontSize;
        this.prompt.style.fontFamily = CLIBehaviour.config.fontFamily;
        this.prompt.style.color = CLIBehaviour.config.color;
        this.prompt.style.backgroundColor = CLIBehaviour.config.backgroundColor;
        this.prompt.style.top = '0';
        this.prompt.style.left = '0';
        this.prompt.style.overflow = 'hidden';
        this.prompt.innerHTML = CLIBehaviour.config.promptInnerHTML;
        this.prompt.style.background = 'transparent';
        this.dropDown = this.create('div', {});
        this.dropDown.style.position = 'absolute';
        this.dropDown.style.visibility = 'hidden';
        this.dropDown.style.outline = '0';
        this.dropDown.style.margin = '0';
        this.dropDown.style.padding = '0';
        this.dropDown.style.textAlign = 'left';
        this.dropDown.style.fontSize = CLIBehaviour.config.fontSize;
        this.dropDown.style.fontFamily = CLIBehaviour.config.fontFamily;
        this.dropDown.style.backgroundColor = CLIBehaviour.config.backgroundColor;
        this.dropDown.style.zIndex = CLIBehaviour.config.dropDownZIndex;
        this.dropDown.style.cursor = 'default';
        this.dropDown.style.borderStyle = 'solid';
        this.dropDown.style.borderWidth = '1px';
        this.dropDown.style.borderColor = CLIBehaviour.config.dropDownBorderColor;
        this.dropDown.style.overflowX = 'hidden';
        this.dropDown.style.whiteSpace = 'pre';
        this.dropDown.style.overflowY = 'scroll';
    };
    CLIBehaviour.prototype.hideDropDown = function () {
        this.dropDown.style.visibility = 'hidden';
    };
    CLIBehaviour.prototype.onTab = function () {
    };
    CLIBehaviour.prototype.onEnter = function () {
        this.fire(CLIBehaviour.EVENT_ON_ENTER_KEY, this.getText());
        this.setText('');
    };
    CLIBehaviour.prototype.onArrowDown = function () {
    };
    CLIBehaviour.prototype.onArrowUp = function () {
    };
    CLIBehaviour.prototype.handler = function (ev) {
        var ti = ev.srcElement;
        var value = ti ? ti.value : null;
        if (this.registerOnTextChangeOldValue !== value) {
            this.registerOnTextChangeOldValue = value;
            CLIBehaviour.getFeatureOutOfElement(ti).onChange(value);
        }
    };
    CLIBehaviour.prototype.onChange = function (txt) {
        this.currentOptions = [];
        this.fire(CLIBehaviour.EVENT_ON_CHANGE, txt);
    };
    CLIBehaviour.prototype.registerEventListeners = function () {
        this.registerOnTextChangeOldValue = this.txtInput.value;
        if (this.txtInput.addEventListener) {
            this.txtInput.addEventListener("input", this.handler, false);
            this.txtInput.addEventListener('keyup', this.handler, false);
            this.txtInput.addEventListener('change', this.handler, false);
            this.txtInput.addEventListener("keydown", this.keyDownHandler, false);
        }
    };
    CLIBehaviour.prototype.keyDownHandler = function (e) {
        var feature = CLIBehaviour.getFeatureOutOfElement(e.srcElement);
        var keyCode = e.keyCode;
        if (keyCode == 33) {
            return;
        }
        if (keyCode == 34) {
            return;
        }
        if (keyCode == 27) {
            feature.hideDropDown();
            feature.txtHint.value = feature.txtInput.value;
            feature.txtInput.focus();
            return;
        }
        if (keyCode == 39 || keyCode == 35 || keyCode == 9) {
            if (keyCode == 9) {
                e.preventDefault();
                e.stopPropagation();
                if (feature.txtHint.value.length == 0) {
                    feature.onTab();
                }
            }
            if (feature.txtHint.value.length > 0) {
                feature.hideDropDown();
                feature.txtInput.value = feature.txtHint.value;
                var hasTextChanged = feature.registerOnTextChangeOldValue != feature.txtInput.value;
                feature.registerOnTextChangeOldValue = feature.txtInput.value;
                if (hasTextChanged)
                    feature.onChange(feature.txtInput.value);
            }
            return;
        }
        if (keyCode == 13) {
            if (feature.txtHint.value.length == 0) {
                feature.onEnter();
            }
            else {
                var wasDropDownHidden = (feature.dropDown.style.visibility == 'hidden');
                feature.hideDropDown();
                if (wasDropDownHidden) {
                    feature.txtHint.value = feature.txtInput.value;
                    feature.txtInput.focus();
                    feature.onEnter();
                    return;
                }
                feature.txtInput.value = feature.txtHint.value;
                var hasTextChanged = feature.registerOnTextChangeOldValue != feature.txtInput.value;
                feature.registerOnTextChangeOldValue = feature.txtInput.value;
                if (hasTextChanged)
                    feature.onChange(feature.txtInput.value);
            }
            return;
        }
        if (keyCode == 40) {
            var m = feature.move(+1);
            if (m == '')
                feature.onArrowDown();
            feature.txtHint.value = feature.leftSide + m;
            return;
        }
        if (keyCode == 38) {
            var m = feature.move(-1);
            if (m == '')
                feature.onArrowUp();
            feature.txtHint.value = feature.leftSide + m;
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (feature.txtHint)
            feature.txtHint.value = '';
    };
    CLIBehaviour.prototype.calculateWidthForText = function (text) {
        if (this.spacer === undefined) {
            this.spacer = this.create('span', {});
            this.spacer.style.visibility = 'hidden';
            this.spacer.style.position = 'fixed';
            this.spacer.style.outline = '0';
            this.spacer.style.margin = '0';
            this.spacer.style.padding = '0';
            this.spacer.style.border = '0';
            this.spacer.style.left = '0';
            this.spacer.style.whiteSpace = 'pre';
            this.spacer.style.fontSize = CLIBehaviour.config.fontSize;
            this.spacer.style.fontFamily = CLIBehaviour.config.fontFamily;
            this.spacer.style.fontWeight = 'normal';
            document.body.appendChild(this.spacer);
        }
        this.spacer.innerHTML = text.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return this.spacer.getBoundingClientRect().right;
    };
    CLIBehaviour.prototype.setText = function (text) {
        this.txtHint.value = text;
        this.txtInput.value = text;
    };
    CLIBehaviour.prototype.getText = function () {
        return this.txtInput.value;
    };
    CLIBehaviour.prototype.repaint = function () {
        if (!this.txtInput)
            return;
        var text = this.txtInput.value;
        var startFrom = this.startFrom;
        var options = this.currentOptions;
        var optionsLength = options.length;
        var token = text.substring(startFrom);
        this.leftSide = text.substring(0, startFrom);
        this.txtHint.value = '';
        for (var i = 0; i < optionsLength; i++) {
            var opt = options[i];
            if (opt.indexOf(token) === 0) {
                this.txtHint.value = this.leftSide + opt;
                break;
            }
        }
        this.dropDown.style.left = this.calculateWidthForText(this.leftSide) + 'px';
        this.refresh(token, this.currentOptions);
    };
    CLIBehaviour.prototype.onmouseselection = function (text) {
        this.txtInput.value = this.txtHint.value = this.leftSide + text;
        this.onChange(this.txtInput.value);
        this.registerOnTextChangeOldValue = this.txtInput.value;
        this.txtInput.focus();
    };
    CLIBehaviour.prototype.onMouseOver = function () {
        this.style.outline = '1px solid #ddd';
    };
    CLIBehaviour.prototype.onMouseOut = function () {
        this.style.outline = '0';
    };
    CLIBehaviour.prototype.onMouseDown = function (ev) {
        var element = ev.currentTarget;
        var feature = CLIBehaviour.getFeatureOutOfElement(element);
        feature.hideDropDown();
        feature.onmouseselection(element.getAttribute('__hint'));
    };
    CLIBehaviour.prototype.refresh = function (token, array) {
        this.dropDown.style.visibility = 'hidden';
        this.ix = 0;
        this.dropDown.innerHTML = '';
        var vph = (window.innerHeight || document.documentElement.clientHeight);
        var rect = this.dropDown.parentElement.getBoundingClientRect();
        var distanceToTop = rect.top - 6;
        var distanceToBottom = vph - rect.bottom - 6;
        this.rows = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i].indexOf(token) !== 0)
                continue;
            var divRow = this.create('div', {});
            CLIBehaviour.injectFeatureToElement(divRow, this);
            divRow.style.color = CLIBehaviour.config.color;
            divRow.onmouseover = this.onMouseOver;
            divRow.onmouseout = this.onMouseOut;
            divRow.addEventListener('mousedown', this.onMouseDown, false);
            divRow.setAttribute('__hint', array[i]);
            divRow.innerHTML = token + '<b>' + array[i].substring(token.length) + '</b>';
            this.rows.push(divRow);
            this.dropDown.appendChild(divRow);
        }
        if (this.rows.length === 0) {
            return;
        }
        if (this.rows.length === 1 && token === this.rows[0].getAttribute('__hint')) {
            return;
        }
        if (this.rows.length < 2)
            return;
        this.highlight(0);
        if (distanceToTop > distanceToBottom * 3) {
            this.dropDown.style.maxHeight = distanceToTop + 'px';
            this.dropDown.style.top = '';
            this.dropDown.style.bottom = '100%';
        }
        else {
            this.dropDown.style.top = '100%';
            this.dropDown.style.bottom = '';
            this.dropDown.style.maxHeight = distanceToBottom + 'px';
        }
        this.dropDown.style.visibility = 'visible';
    };
    CLIBehaviour.prototype.highlight = function (index) {
        if (this.oldIndex != -1 && this.rows[this.oldIndex])
            this.rows[this.oldIndex].style.backgroundColor = CLIBehaviour.config.backgroundColor;
        this.rows[index].style.backgroundColor = CLIBehaviour.config.dropDownOnHoverBackgroundColor;
        this.oldIndex = index;
    };
    CLIBehaviour.prototype.move = function (step) {
        if (this.dropDown.style.visibility === 'hidden')
            return '';
        if (this.ix + step === -1 || this.ix + step === this.rows.length)
            return this.rows[this.ix].getAttribute('__hint');
        this.ix += step;
        this.highlight(this.ix);
        return this.rows[this.ix].getAttribute('__hint');
    };
    CLIBehaviour.injectFeatureToElement = function (element, feature) {
        element[CLIBehaviour.INJECTED_FEATURE_PROPERTY_NAME] = feature;
    };
    CLIBehaviour.getFeatureOutOfElement = function (element) {
        return element.hasOwnProperty(CLIBehaviour.INJECTED_FEATURE_PROPERTY_NAME) ? element[CLIBehaviour.INJECTED_FEATURE_PROPERTY_NAME] : null;
    };
    CLIBehaviour.UNIQUE_ID = 'id' + new Date().getTime();
    CLIBehaviour.EVENT_SET_CURRENT_OPTIONS = CLIBehaviour.UNIQUE_ID + 'setCurrentOptions';
    CLIBehaviour.EVENT_SET_START_FROM = CLIBehaviour.UNIQUE_ID + 'setStartFrom';
    CLIBehaviour.EVENT_SET_TEXT = CLIBehaviour.UNIQUE_ID + 'setText';
    CLIBehaviour.EVENT_ON_CHANGE = CLIBehaviour.UNIQUE_ID + 'onChange';
    CLIBehaviour.EVENT_ON_ENTER_KEY = CLIBehaviour.UNIQUE_ID + 'onEnterKey';
    CLIBehaviour.config = {};
    CLIBehaviour.INJECTED_FEATURE_PROPERTY_NAME = '_feature';
    __decorate([
        listen(CLIBehaviour.EVENT_SET_TEXT), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIBehaviour.prototype, "apiOnSetText", null);
    __decorate([
        listen(CLIBehaviour.EVENT_SET_START_FROM), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIBehaviour.prototype, "apiOnSetStartFrom", null);
    __decorate([
        listen(CLIBehaviour.EVENT_SET_CURRENT_OPTIONS), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIBehaviour.prototype, "apiOnSetCurrentOptions", null);
    __decorate([
        listen(main_1.Events.EVENT_GRID_READY), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], CLIBehaviour.prototype, "onGridReadyCLIBehaviour", null);
    return CLIBehaviour;
}(polymer.Base));
exports.CLIBehaviour = CLIBehaviour;
