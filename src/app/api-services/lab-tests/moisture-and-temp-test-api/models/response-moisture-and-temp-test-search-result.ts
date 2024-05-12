import { ResponseLabTestSearchResult } from "../../common-models/response-lab-test-search-result";

export interface ResponseMoistureAndTempTestSearchResult extends ResponseLabTestSearchResult {
	cartonNo: number;
}
