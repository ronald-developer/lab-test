import { PagedResult } from "../../../common-models/paged-result";
import { ResponseMoistureAndTempTestSearchResult } from "../models/response-moisture-and-temp-test-search-result";

export interface PostSearchMoistureAndTempTestsResponse {
	data: PagedResult<ResponseMoistureAndTempTestSearchResult>;
}
