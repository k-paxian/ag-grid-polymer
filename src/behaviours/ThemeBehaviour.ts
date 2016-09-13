import {Events} from 'ag-grid/main';

/*
* ThemeBehaviour is used to support grid visual theme activities,
* - loads theme css on demand
* - load default grid css by default
* - provides context menu on the grid to change themes directly by the user
* TODO: Provide context menu to choose current grid theme
* */
export class ThemeBehaviour extends polymer.Base {

    static GRID_STYLES_PATH: string = '/node_modules/ag-grid-polymer/node_modules/ag-grid/dist/styles/';
    static STYLE_GENERIC: string = 'ag-grid';
    static GRID_ID_PREFIX: string = ThemeBehaviour.STYLE_GENERIC + '@';
    static THEME_FILE_PREFIX: string = 'theme-';
    static THEME_CSS_CLASS_PREFIX: string = 'ag-';
    static DEFAULT_THEME: string = 'fresh';

    /* theme value can be one of [blue, dark, fresh] */
    @property({
        observer: 'onThemeBehaviour_themeChanged',
        notify: true,
        reflectToAttribute: true,
        type: String
    })
    public theme:String;

    @property({
        observer: 'onThemeBehaviour_stylesPathChanged',
        notify: true,
        reflectToAttribute: true,
        type: String
    })
    public styles:String;

    static styleTags:any[] = [];

    @listen(Events.EVENT_GRID_READY)
    onThemeBehaviourGridReady(e?:CustomEvent) {
        // Load generic grid css
        ThemeBehaviour.addStyleSheetFile(ThemeBehaviour.STYLE_GENERIC);
        if (!this.theme)
            this.theme = ThemeBehaviour.DEFAULT_THEME;
    }

    @listen(Events.EVENT_CELL_CLICKED)
    onCellClicked() {
        //this.theme = 'dark';
    }

    onThemeBehaviour_stylesPathChanged(newValue:any, oldValue:any) {
        ThemeBehaviour._removeAllStyleTagsFromHead();
        ThemeBehaviour.GRID_STYLES_PATH = newValue;
        this.onThemeBehaviourGridReady();
        this.onThemeBehaviour_themeChanged(this.theme, this.theme);
    }

    onThemeBehaviour_themeChanged(newValue:any, oldValue:any) {
        // Load theme css if needed
        ThemeBehaviour.addStyleSheetFile(ThemeBehaviour.THEME_FILE_PREFIX + newValue);
        this.setAttribute("class", ThemeBehaviour.THEME_CSS_CLASS_PREFIX + newValue);
    }

    public static _removeAllStyleTagsFromHead() {
        let head:Element = <Element>document.getElementsByTagName('head')[0];
        for (let tag of this.styleTags)
        try {
            head.removeChild(tag);
        }catch(err) {
        }
        this.styleTags = [];
    }

    detached() {
        ThemeBehaviour._removeAllStyleTagsFromHead();
    }

    public static addStyleSheetFile(id:string) {
        if (document.getElementById(ThemeBehaviour.GRID_ID_PREFIX + id))
            return;
        let head:Element = <Element>document.getElementsByTagName('head')[0];
        let linkTag:Element = document.createElement('link');
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('type', 'text/css');
        linkTag.setAttribute('href', ThemeBehaviour.GRID_STYLES_PATH + id + '.css');
        linkTag.setAttribute('id', ThemeBehaviour.GRID_ID_PREFIX + id);
        head.appendChild(linkTag);
        this.styleTags.push(linkTag);
    }

}
