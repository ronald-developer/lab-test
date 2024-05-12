import { SampleType } from "src/app/shared/models/sample-type";
import { RequestDateSearchCriteria } from "../../common-models/request-date-search-criteria";

export class RequestStemAuditTestSearchCriteria extends RequestDateSearchCriteria {
	public operationOrderId?: number;
	public motherGradeId?: number;
	public containerNo: string;
	public sampleType?: SampleType;
	public includeOnlyNonCompliant?: boolean;
}
