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
var ThemeBehaviour = (function (_super) {
    __extends(ThemeBehaviour, _super);
    function ThemeBehaviour() {
        _super.apply(this, arguments);
    }
    ThemeBehaviour.prototype.onThemeBehaviourGridReady = function (e) {
        ThemeBehaviour.addStyleSheetFile(ThemeBehaviour.STYLE_GENERIC);
        if (!this.theme)
            this.theme = ThemeBehaviour.DEFAULT_THEME;
    };
    ThemeBehaviour.prototype.onCellClicked = function () {
    };
    ThemeBehaviour.prototype.onThemeBehaviour_stylesPathChanged = function (newValue, oldValue) {
        ThemeBehaviour._removeAllStyleTagsFromHead();
        ThemeBehaviour.GRID_STYLES_PATH = newValue;
        this.onThemeBehaviourGridReady();
        this.onThemeBehaviour_themeChanged(this.theme, this.theme);
    };
    ThemeBehaviour.prototype.onThemeBehaviour_themeChanged = function (newValue, oldValue) {
        ThemeBehaviour.addStyleSheetFile(ThemeBehaviour.THEME_FILE_PREFIX + newValue);
        this.setAttribute("class", ThemeBehaviour.THEME_CSS_CLASS_PREFIX + newValue);
    };
    ThemeBehaviour._removeAllStyleTagsFromHead = function () {
        var head = document.getElementsByTagName('head')[0];
        for (var _i = 0, _a = this.styleTags; _i < _a.length; _i++) {
            var tag = _a[_i];
            try {
                head.removeChild(tag);
            }
            catch (err) {
            }
        }
        this.styleTags = [];
    };
    ThemeBehaviour.prototype.detached = function () {
        ThemeBehaviour._removeAllStyleTagsFromHead();
    };
    ThemeBehaviour.addStyleSheetFile = function (id) {
        if (document.getElementById(ThemeBehaviour.GRID_ID_PREFIX + id))
            return;
        var head = document.getElementsByTagName('head')[0];
        var linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('type', 'text/css');
        linkTag.setAttribute('href', ThemeBehaviour.GRID_STYLES_PATH + id + '.css');
        linkTag.setAttribute('id', ThemeBehaviour.GRID_ID_PREFIX + id);
        head.appendChild(linkTag);
        this.styleTags.push(linkTag);
    };
    ThemeBehaviour.GRID_STYLES_PATH = '/node_modules/ag-grid-polymer/node_modules/ag-grid/dist/styles/';
    ThemeBehaviour.STYLE_GENERIC = 'ag-grid';
    ThemeBehaviour.GRID_ID_PREFIX = ThemeBehaviour.STYLE_GENERIC + '@';
    ThemeBehaviour.THEME_FILE_PREFIX = 'theme-';
    ThemeBehaviour.THEME_CSS_CLASS_PREFIX = 'ag-';
    ThemeBehaviour.DEFAULT_THEME = 'fresh';
    ThemeBehaviour.styleTags = [];
    __decorate([
        property({
            observer: 'onThemeBehaviour_themeChanged',
            notify: true,
            reflectToAttribute: true,
            type: String
        }), 
        __metadata('design:type', String)
    ], ThemeBehaviour.prototype, "theme", void 0);
    __decorate([
        property({
            observer: 'onThemeBehaviour_stylesPathChanged',
            notify: true,
            reflectToAttribute: true,
            type: String
        }), 
        __metadata('design:type', String)
    ], ThemeBehaviour.prototype, "styles", void 0);
    __decorate([
        listen(main_1.Events.EVENT_GRID_READY), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [CustomEvent]), 
        __metadata('design:returntype', void 0)
    ], ThemeBehaviour.prototype, "onThemeBehaviourGridReady", null);
    __decorate([
        listen(main_1.Events.EVENT_CELL_CLICKED), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ThemeBehaviour.prototype, "onCellClicked", null);
    return ThemeBehaviour;
}(polymer.Base));
exports.ThemeBehaviour = ThemeBehaviour;
