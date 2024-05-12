import { PositionType } from "src/app/shared/models/position-type";

export interface ResponseBundleBusterTestSearchResult {
	id: string;
	entryDate: Date;
	operationOrderId: string;
	operationOrderDisplayNo: string;
	motherGradeId: number;
	motherGradeCode: string;
	isNonCompliant: boolean;
	isDeleted: boolean;
	dateDeleted: Date;
	positionType: PositionType;
	positionTypeTitle: string;
}
