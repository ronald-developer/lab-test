export interface ResponseMoistureAndTempTestModel {
	id: string;
	operationOrderId: number;
	motherGradeId: number;
	packingGradeId: number;
	shiftType: number;
	entryDate: Date;
	cartonNo: number;
	mettlerResult: number;
	hearsonPct: number;
	temperature: number;
}
