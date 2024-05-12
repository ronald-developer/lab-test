import { ResponseLabTestSearchResult } from "../../common-models/response-lab-test-search-result";

export interface ResponseDegsTestSearchResult extends ResponseLabTestSearchResult {
	cartonNo: number;
	testType: number;
}
