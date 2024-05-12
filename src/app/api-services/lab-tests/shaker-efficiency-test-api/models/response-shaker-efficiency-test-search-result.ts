import { ResponseLabTestSearchResult } from "../../common-models/response-lab-test-search-result";

export interface ResponseShakerEfficiencyTestSearchResult extends ResponseLabTestSearchResult {
	shakerId: string;
	shakerName: string;
}
