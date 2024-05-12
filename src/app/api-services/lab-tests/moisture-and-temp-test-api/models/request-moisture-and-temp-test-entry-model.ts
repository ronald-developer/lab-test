export interface RequestMoistureAndTempTestEntryModel {
	id?: string;
	operationOrderId: number;
	shiftType: number;
	entryDate: Date;
	packingGradeId: number;
	cartonNo: number;
	mettlerResult: number;
	hearsonPct: number;
	temperature: number;
}

