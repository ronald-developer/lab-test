import { PagedResult } from "../../../common-models/paged-result";
import { ResponseTipsTestSearchResult } from "../models/response-tips-test-search-result";

export interface PostSearchTipsTestsResponse {
    data: PagedResult<ResponseTipsTestSearchResult>;
}
