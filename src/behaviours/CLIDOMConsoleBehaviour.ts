import {CLIBehaviour} from 'ag-grid-polymer/main';

export class CLIDOMConsoleBehaviour extends polymer.Base {

    // This function finds the right part of the string which needs to be considered for the auto-completion.
    // See examples below:
    //
    // extractTextForAutocompletion('if (app')
    // Object {v1: "app", v2: ""}
    //
    // extractTextForAutocompletion('for (var i=0;i<system.')
    // Object {v1: "system", v2: ""}
    //
    // extractTextForAutocompletion('if (app')
    // Object {v1: "app", v2: ""}
    //
    // extractTextForAutocompletion('if (app.aaa')
    // Object {v1: "app", v2: "aaa"}
    //
    // extractTextForAutocompletion('var t = system.get')
    // Object {v1: " system", v2: "get"}
    //
    // Note:
    // The logic has been modelled from the chrome console.
    // Arguably it has some bugs:
    // the logic does not check if we are part of a string or a comment (not even chrome console does)
    // how do I cope with: ((system)).getValue :: Answer: chrome console also does not handle that.
    // how do I cope with combined statements: document.getElementById('xxx').se (we don't. Not even chrome copes with it)
    // how do I cope with array ? We don't. Not even chrome copes with it.
    // Arguably all of the above are bugs.
    //
    extractTextForAutocompletion(code:string) {

        var isLetterOrDigitOrWhitespaceOrDot = function (ch:string) {
            return ch === '.' ||
                (ch >= 'A' && ch <= 'Z') ||
                (ch >= 'a' && ch <= 'z') ||
                (ch >= '0' && ch <= '9') ||
                ch === '$' ||
                ch === '_' ||
                ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'.indexOf(ch) !== -1; // whitespaces
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
        if (ix === -1) return {v1: '', v2: snip};
        else           return {
            v1: snip.substring(0, ix),
            v2: snip.substring(ix + 1)
        };

    };

    @listen(CLIBehaviour.EVENT_ON_ENTER_KEY)
    onCLIDOMConsoleOptionsFeatureEnterKey(e:CustomEvent) {
        let text:string = e.detail;
        let resp:any;
        let respString:string;

        try {
            resp = eval(text);
        } catch (e) {
            resp = e;
        }

        respString = resp + '';
        if (respString.indexOf('[object') != -1)
            alert(this.stringify(resp));
        else
        if (text.indexOf('alert') < 0)
            alert(respString);
    }

    @listen(CLIBehaviour.EVENT_ON_CHANGE)
    onCLIDOMConsoleOptionsFeatureChange(e:CustomEvent) {
        let text:string = e.detail;

        if (text.length == 0) {
            let options:Array<any> = [];
            for (var i in window)
                options.push('' + i);
            options.sort();
            this.fire(CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, options);
            return;
        }

        let v:any = this.extractTextForAutocompletion(text);
        let oj:any;

        if (v.v1 == '')
            v.v1 = 'window';

        try {
            oj = eval(v.v1);
        } catch (ex) {
            oj = null;
        }

        let options:Array<any> = [];
        for (var i in oj)
            options.push('' + i);
        options.sort();
        this.fire(CLIBehaviour.EVENT_SET_CURRENT_OPTIONS, options);
        this.fire(CLIBehaviour.EVENT_SET_START_FROM, text.lastIndexOf('.') + 1);
    }

    protected stringify(object:any):string {
        let seen:any[] = [];
        return JSON.stringify(object, function (key, val) {
            if (val != null && typeof val == "object") {
                if (seen.indexOf(val) >= 0) {
                    return;
                }
                seen.push(val);
            }
            return val;
        });
    }


}
