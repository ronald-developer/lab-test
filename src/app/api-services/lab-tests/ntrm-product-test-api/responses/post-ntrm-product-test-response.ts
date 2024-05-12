import { PagedResult } from "../../../common-models/paged-result";
import { ResponseNtrmProductTestSearchResult } from "../models/response-ntrm-product-test-search-result";

export interface PostSearchNtrmProductTestsResponse {
	data: PagedResult<ResponseNtrmProductTestSearchResult>;
}
