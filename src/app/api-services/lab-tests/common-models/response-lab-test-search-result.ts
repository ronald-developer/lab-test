import { ShiftType } from "src/app/shared/models/shift-type";

export interface ResponseLabTestSearchResult {
	id: string;
	entryDate: Date;
	shiftType: ShiftType;
	shiftTypeTitle: string;
	operationOrderId: string;
	operationOrderDisplayNo: string;
	motherGradeId: number;
	motherGradeCode: string;
	isNonCompliant: boolean;
	isDeleted: boolean;
	dateDeleted: Date;
}
