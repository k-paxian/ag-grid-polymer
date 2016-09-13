// ag-grid-polymer v0.0.5
export interface FundDetail {
    _id: string;
    flagged: boolean;
    notificationDate: string;
    ssiId: number;
    mpId: number;
    bulkId: number;
    parent: string;
    legalEntity: string;
    product: string;
    ccy: string;
    effectiveDate: string;
    intermediaryBank: string;
    beneficiaryBank: string;
    finalBeneficiaryBank: string;
}
export declare class RefData {
    static FundData: FundDetail[];
}
