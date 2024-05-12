export interface RequestStemLengthEntry{
    operationOrderId: number;
    packingGradeId: number;
    shiftType: number;
    entryDate: Date;
    lessThanPoint5: number;
    betweenPoint5And1: number;
    between1And1Point5: number;
    between1Point5And2: number;
    between2And2Point5: number;
    between2Point5And3: number;
    between3And3Point5: number;
    between3Point5And4: number;
    moreThan4: number;
}
