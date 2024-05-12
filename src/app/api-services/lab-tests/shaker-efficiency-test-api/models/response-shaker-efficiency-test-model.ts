export interface ResponseShakerEfficiencyTestModel {
	id: string;
	operationOrderId: number;
	motherGradeId: number;
	shiftType: number;
	entryDate: Date;
	overOne: number;
	betweenHalfAndOne: number;
	betweenQuarterAndHalf: number;
	betweenEighthAndQuarter: number;
	lessThanEighth: number;
	shakerId: string;
}
