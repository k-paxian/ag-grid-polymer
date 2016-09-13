// ag-grid-polymer v0.0.5
export declare class CLIDOMConsoleBehaviour extends polymer.Base {
    extractTextForAutocompletion(code: string): {
        v1: string;
        v2: string;
    };
    onCLIDOMConsoleOptionsFeatureEnterKey(e: CustomEvent): void;
    onCLIDOMConsoleOptionsFeatureChange(e: CustomEvent): void;
    protected stringify(object: any): string;
}
