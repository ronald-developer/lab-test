import { SampleType } from "src/app/shared/models/sample-type";
import { ResponseLabTestSearchResult } from "../../common-models/response-lab-test-search-result";

export interface ResponseStemAuditTestSearchResult {
	id: string;
	entryDate: Date;
	entryDateString: string;
	entryDateTimeString: string;
	operationOrderId: number;
	operationOrderDisplayNo: string;
	motherGradeId: number;
	motherGradeCode: string;
	isNonCompliant: boolean;
	isNonCompliantStr: string;
	isDeleted: boolean;
	dateDeleted: Date;
	containerNo: string;
	containerRange: string;
	sampleType: SampleType;
	sampleTypeTitle: string;
	shakerId: string;
	shakerName: string;
}
