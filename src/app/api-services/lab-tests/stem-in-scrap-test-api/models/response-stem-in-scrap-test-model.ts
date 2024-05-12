export interface ResponseStemInScrapTestModel {
  id: string;
  operationOrderId: number;
  motherGradeId: number;
  packingGradeId: number;
  shiftType: number;
  entryDate: Date;
  sampleWeight: number;
  cartonNo?: number;
  stemInScrap: number;
}
