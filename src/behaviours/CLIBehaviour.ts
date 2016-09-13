import {Events} from 'ag-grid/main';

/*
 * CLIBehaviour is used to add "Smart" Command Line Input control over DataGrid and it's content
 * - supports CLI options providers sub-features(composite plugins)
 * - adds commands input line above the grid header
 * */
export class CLIBehaviour extends polymer.Base {

    static UNIQUE_ID:string = 'id' + new Date().getTime();

    /* API Events */
    static EVENT_SET_CURRENT_OPTIONS:string = CLIBehaviour.UNIQUE_ID + 'setCurrentOptions';
    static EVENT_SET_START_FROM:string = CLIBehaviour.UNIQUE_ID + 'setStartFrom';
    static EVENT_SET_TEXT:string = CLIBehaviour.UNIQUE_ID + 'setText';
    static EVENT_ON_CHANGE:string = CLIBehaviour.UNIQUE_ID + 'onChange';
    static EVENT_ON_ENTER_KEY:string = CLIBehaviour.UNIQUE_ID + 'onEnterKey';


    static config:any = {};
    static INJECTED_FEATURE_PROPERTY_NAME:string = '_feature';

    protected txtInput:HTMLInputElement;
    protected txtHint:HTMLInputElement;
    protected wrapper:HTMLDivElement;
    protected prompt:HTMLDivElement;
    protected dropDown:HTMLDivElement;
    protected spacer:HTMLSpanElement;
    protected leftSide:string; // <-- it will contain the leftSide part of the textfield (the bit that was already autocompleted)
    protected registerOnTextChangeOldValue:string;
    protected startFrom:number;

    protected rows:Array<any> = [];
    protected ix:number = 0;
    protected oldIndex:number = -1;

    protected currentOptions:Array<any> = [];


    /* API */
    @listen(CLIBehaviour.EVENT_SET_TEXT)
    apiOnSetText(e:CustomEvent) {
        this.setText(e.detail);
    }

    @listen(CLIBehaviour.EVENT_SET_START_FROM)
    apiOnSetStartFrom(e:CustomEvent) {
        this.startFrom = e.detail;
        this.txtInput.focus();
    }

    @listen(CLIBehaviour.EVENT_SET_CURRENT_OPTIONS)
    apiOnSetCurrentOptions(e:CustomEvent) {
        if (!this.currentOptions)
            this.currentOptions = [];
        if (this.startFrom == 0)
            this.currentOptions = this.currentOptions.concat(e.detail);
        else
            this.currentOptions = e.detail;
        this.repaint();
    }


    /* Implementation */

    @listen(Events.EVENT_GRID_READY)
    onGridReadyCLIBehaviour(e:CustomEvent) {
        this.createStuff();
        this.wrapper.appendChild(this.txtHint);
        this.wrapper.appendChild(this.txtInput);
        this.wrapper.appendChild(this.dropDown);

        let w:HTMLDivElement = <HTMLDivElement>this.create('div', {});
        w.setAttribute("class", "ag-row-group-panel");
        w.appendChild(this.wrapper);
        e.detail.grid.root.children[0].insertBefore(w, e.detail.grid.root.children[0].childNodes[0]);
        //this.grid.root.children[0].insertBefore(this.wrapper, this.grid.root.children[0].childNodes[0]);

        //document.body.appendChild(this.prompt);
        //let w:number = this.prompt.getBoundingClientRect().right; // works out the width of the prompt.
        //this.wrapper.appendChild(this.prompt);
        //this.prompt.style.visibility = 'visible';
        //this.prompt.style.left = '-' + w + 'px';
        //this.wrapper.style.marginLeft = w + 'px';

        this.registerEventListeners();
    }

    createStuff() {

        CLIBehaviour.config.fontSize = '16px';
        CLIBehaviour.config.fontFamily = 'sans-serif';
        CLIBehaviour.config.promptInnerHTML = '';
        CLIBehaviour.config.color = '#333';
        CLIBehaviour.config.hintColor = '#aaa';
        CLIBehaviour.config.backgroundColor = '#fff';
        CLIBehaviour.config.dropDownBorderColor = '#aaa';
        CLIBehaviour.config.dropDownZIndex = 100; // to ensure we are in front of everybody
        CLIBehaviour.config.dropDownOnHoverBackgroundColor = '#ddd';

        this.txtInput = <HTMLInputElement>this.create('input', {});
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

        this.txtHint = <HTMLInputElement>this.txtInput.cloneNode();
        this.txtHint.disabled = true;
        this.txtHint.style.position = 'absolute';
        this.txtHint.style.top = '0';
        this.txtHint.style.left = '0';
        this.txtHint.style.borderColor = 'transparent';
        this.txtHint.style.boxShadow = 'none';
        this.txtHint.style.color = CLIBehaviour.config.hintColor;

        this.wrapper = <HTMLDivElement>this.create('div', {});
        this.wrapper.style.position = 'relative';
        this.wrapper.style.outline = '0';
        this.wrapper.style.border = '0';
        this.wrapper.style.margin = '0';
        this.wrapper.style.padding = '0';

        this.prompt = <HTMLDivElement>this.create('div', {});
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

        this.dropDown = <HTMLDivElement>this.create('div', {});
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
        this.dropDown.style.overflowY = 'scroll';  // note: this might be ugly when the scrollbar is not required. however in this way the width of the dropDown takes into account
    }

    hideDropDown() {
        this.dropDown.style.visibility = 'hidden';
    }

    onTab() {
    }

    onEnter() {
        this.fire(CLIBehaviour.EVENT_ON_ENTER_KEY, this.getText());
        this.setText('');
    }

    onArrowDown() {
    }

    onArrowUp() {
    }

    protected handler(ev:Event) {
        let ti:HTMLInputElement = <HTMLInputElement> ev.srcElement;
        let value:string = ti ? ti.value : null;
        if (this.registerOnTextChangeOldValue !== value) {
            this.registerOnTextChangeOldValue = value;
            CLIBehaviour.getFeatureOutOfElement(ti).onChange(value);
        }
    }

    onChange(txt:string) {
        this.currentOptions = [];
        this.fire(CLIBehaviour.EVENT_ON_CHANGE, txt);
    }

    protected registerEventListeners() {
        this.registerOnTextChangeOldValue = this.txtInput.value;

        //
        // For user's actions, we listen to both input events and key up events
        // It appears that input events are not enough so we defensively listen to key up events too.
        // source: http://help.dottoro.com/ljhxklln.php
        //
        // The cost of listening to three sources should be negligible as the handler will invoke callback function
        // only if the text.value was effectively changed.
        //
        //
        if (this.txtInput.addEventListener) {
            this.txtInput.addEventListener("input", this.handler, false);
            this.txtInput.addEventListener('keyup', this.handler, false);
            this.txtInput.addEventListener('change', this.handler, false);
            this.txtInput.addEventListener("keydown", this.keyDownHandler, false);
        }
    }

    protected keyDownHandler(e:KeyboardEvent) {
        let feature:CLIBehaviour = CLIBehaviour.getFeatureOutOfElement(e.srcElement);
        let keyCode = e.keyCode;

        if (keyCode == 33) {
            return;
        } // page up (do nothing)
        if (keyCode == 34) {
            return;
        } // page down (do nothing);

        if (keyCode == 27) { //escape
            feature.hideDropDown();
            feature.txtHint.value = feature.txtInput.value; // ensure that no hint is left.
            feature.txtInput.focus();
            return;
        }

        if (keyCode == 39 || keyCode == 35 || keyCode == 9) { // right,  end, tab  (autocomplete triggered)
            if (keyCode == 9) { // for tabs we need to ensure that we override the default behaviour: move to the next focusable HTML-element
                e.preventDefault();
                e.stopPropagation();
                if (feature.txtHint.value.length == 0) {
                    feature.onTab(); // tab was called with no action.
                    // users might want to re-enable its default behaviour or handle the call somehow.
                }
            }
            if (feature.txtHint.value.length > 0) { // if there is a hint
                feature.hideDropDown();
                feature.txtInput.value = feature.txtHint.value;
                let hasTextChanged = feature.registerOnTextChangeOldValue != feature.txtInput.value;
                feature.registerOnTextChangeOldValue = feature.txtInput.value; // <-- to avoid dropDown to appear again.
                // for example imagine the array contains the following words: bee, beef, beetroot
                // user has hit enter to get 'bee' it would be prompted with the dropDown again (as beef and beetroot also match)
                if (hasTextChanged)
                    feature.onChange(feature.txtInput.value); // <-- forcing it.
            }
            return;
        }

        if (keyCode == 13) {       // enter  (autocomplete triggered)
            if (feature.txtHint.value.length == 0) { // if there is a hint
                feature.onEnter();
            } else {
                let wasDropDownHidden = (feature.dropDown.style.visibility == 'hidden');
                feature.hideDropDown();

                if (wasDropDownHidden) {
                    feature.txtHint.value = feature.txtInput.value; // ensure that no hint is left.
                    feature.txtInput.focus();
                    feature.onEnter();
                    return;
                }

                feature.txtInput.value = feature.txtHint.value;
                let hasTextChanged = feature.registerOnTextChangeOldValue != feature.txtInput.value;
                feature.registerOnTextChangeOldValue = feature.txtInput.value; // <-- to avoid dropDown to appear again.
                // for example imagine the array contains the following words: bee, beef, beetroot
                // user has hit enter to get 'bee' it would be prompted with the dropDown again (as beef and beetroot also match)
                if (hasTextChanged)
                    feature.onChange(feature.txtInput.value); // <-- forcing it.

            }
            return;
        }

        if (keyCode == 40) {     // down
            var m = feature.move(+1);
            if (m == '')
                feature.onArrowDown();
            feature.txtHint.value = feature.leftSide + m;
            return;
        }

        if (keyCode == 38) {    // up
            var m = feature.move(-1);
            if (m == '')
                feature.onArrowUp();
            feature.txtHint.value = feature.leftSide + m;
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        // it's important to reset the txtHint on key down.
        // think: user presses a letter (e.g. 'x') and never releases... you get (xxxxxxxxxxxxxxxxx)
        // and you would see still the hint
        if (feature.txtHint)
            feature.txtHint.value = ''; // resets the txtHint. (it might be updated onKeyUp)
    }

    protected calculateWidthForText(text:string) {
        if (this.spacer === undefined) { // on first call only.
            this.spacer = <HTMLSpanElement>this.create('span', {});
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

        // Used to encode an HTML string into a plain text.
        // taken from http://stackoverflow.com/questions/1219860/javascript-jquery-html-encoding
        this.spacer.innerHTML = text.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return this.spacer.getBoundingClientRect().right;
    }

    setText(text:string) {
        this.txtHint.value = text;
        this.txtInput.value = text;
    }

    getText() {
        return this.txtInput.value;
    }

    repaint() {
        if (!this.txtInput)
            return;
        let text = this.txtInput.value;
        let startFrom = this.startFrom;
        let options = this.currentOptions;
        let optionsLength = options.length;

        // breaking text in leftSide and token.
        let token = text.substring(startFrom);
        this.leftSide = text.substring(0, startFrom);

        // updating the hint.
        this.txtHint.value = '';
        for (let i = 0; i < optionsLength; i++) {
            let opt = options[i];
            if (opt.indexOf(token) === 0) {         // <-- how about upperCase vs. lowercase
                this.txtHint.value = this.leftSide + opt;
                break;
            }
        }

        // moving the dropDown and refreshing it.
        this.dropDown.style.left = this.calculateWidthForText(this.leftSide) + 'px';
        this.refresh(token, this.currentOptions);
    }

    onmouseselection(text:string) {
        this.txtInput.value = this.txtHint.value = this.leftSide + text;
        this.onChange(this.txtInput.value); // <-- forcing it.
        this.registerOnTextChangeOldValue = this.txtInput.value; // <-- ensure that mouse down will not show the dropDown now.
        //setTimeout(function () {
            this.txtInput.focus();
        //}, 0);  // <-- I need to do this for IE
    }

    onMouseOver() {
        this.style.outline = '1px solid #ddd';
    }

    onMouseOut() {
        this.style.outline = '0';
    }

    onMouseDown(ev:MouseEvent) {
        let element:Element = <Element>ev.currentTarget;
        let feature:CLIBehaviour = CLIBehaviour.getFeatureOutOfElement(element);
        feature.hideDropDown();
        feature.onmouseselection(element.getAttribute('__hint'));
    }

    refresh(token:string, array:Array<any>) {
        this.dropDown.style.visibility = 'hidden';
        this.ix = 0;
        this.dropDown.innerHTML = '';
        let vph:number = (window.innerHeight || document.documentElement.clientHeight);
        let rect:ClientRect = this.dropDown.parentElement.getBoundingClientRect();
        let distanceToTop:number = rect.top - 6;                        // heuristic give 6px
        let distanceToBottom:number = vph - rect.bottom - 6;  // distance from the browser border.

        this.rows = [];
        for (var i:number = 0; i < array.length; i++) {
            if (array[i].indexOf(token) !== 0)
                continue;
            let divRow:HTMLDivElement = <HTMLDivElement>this.create('div', {});
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
            return; // nothing to show.
        }
        if (this.rows.length === 1 && token === this.rows[0].getAttribute('__hint')) {
            return; // do not show the dropDown if it has only one element which matches what we have just displayed.
        }

        if (this.rows.length < 2)
            return;
        this.highlight(0);

        if (distanceToTop > distanceToBottom * 3) {        // Heuristic (only when the distance to the to top is 4 times more than distance to the bottom
            this.dropDown.style.maxHeight = distanceToTop + 'px';  // we display the dropDown on the top of the input text
            this.dropDown.style.top = '';
            this.dropDown.style.bottom = '100%';
        } else {
            this.dropDown.style.top = '100%';
            this.dropDown.style.bottom = '';
            this.dropDown.style.maxHeight = distanceToBottom + 'px';
        }
        this.dropDown.style.visibility = 'visible';
    }

    highlight(index:number) {
        if (this.oldIndex != -1 && this.rows[this.oldIndex])
            this.rows[this.oldIndex].style.backgroundColor = CLIBehaviour.config.backgroundColor;
        this.rows[index].style.backgroundColor = CLIBehaviour.config.dropDownOnHoverBackgroundColor; // <-- should be config
        this.oldIndex = index;
    }

    move(step:number):string { // moves the selection either up or down (unless it's not possible) step is either +1 or -1.
        if (this.dropDown.style.visibility === 'hidden')
            return ''; // nothing to move if there is no dropDown. (this happens if the user hits escape and then down or up)
        if (this.ix + step === -1 || this.ix + step === this.rows.length)
            return this.rows[this.ix].getAttribute('__hint'); // NO CIRCULAR SCROLLING.
        this.ix += step;
        this.highlight(this.ix);
        return this.rows[this.ix].getAttribute('__hint'); //txtShadow.value = uRows[uIndex].__hint ;
    }

    static injectFeatureToElement(element:Element, feature:CLIBehaviour) {
        (<any>element)[CLIBehaviour.INJECTED_FEATURE_PROPERTY_NAME] = feature;
    }

    static getFeatureOutOfElement(element:Element):CLIBehaviour {
        return element.hasOwnProperty(CLIBehaviour.INJECTED_FEATURE_PROPERTY_NAME) ? (<any>element)[CLIBehaviour.INJECTED_FEATURE_PROPERTY_NAME] : null;
    }

}