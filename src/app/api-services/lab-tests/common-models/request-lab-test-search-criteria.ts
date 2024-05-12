import { ShiftType } from "src/app/shared/models/shift-type";
import { RequestDateSearchCriteria } from "./request-date-search-criteria";

export class RequestLabTestSearchCriteria extends RequestDateSearchCriteria {
    public operationOrderId?: number;
    public motherGradeId?: number;
    public shiftType?: ShiftType;
	public includeOnlyNonCompliant?: boolean;
}
