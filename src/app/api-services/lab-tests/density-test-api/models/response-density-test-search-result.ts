import { ResponseLabTestSearchResult } from "../../common-models/response-lab-test-search-result";

export interface ResponseDensityTestSearchResult extends ResponseLabTestSearchResult {
	cartonNo: number;
	chargerType: number;
  chargerTypeTitle: number;
}
