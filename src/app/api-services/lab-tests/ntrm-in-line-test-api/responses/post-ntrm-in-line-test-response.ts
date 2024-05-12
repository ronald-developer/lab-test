import { PagedResult } from "../../../common-models/paged-result";
import { ResponseNtrmInLineTestSearchResult } from "../models/response-ntrm-in-line-test-search-result";

export interface PostSearchNtrmInLineTestsResponse {
	data: PagedResult<ResponseNtrmInLineTestSearchResult>;
}
