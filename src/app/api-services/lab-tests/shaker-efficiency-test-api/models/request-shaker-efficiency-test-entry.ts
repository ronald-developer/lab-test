
export interface RequestShakerEfficiencyTestEntry {
	operationOrderId: number;
	shiftType: number;
	entryDate: Date;
	overOne: number;
	betweenHalfAndOne: number;
	betweenQuarterAndHalf: number;
	betweenEighthAndQuarter: number;
	lessThanEighth: number;
	shakerId: string;
}
