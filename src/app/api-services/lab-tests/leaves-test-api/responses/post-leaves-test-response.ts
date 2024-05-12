import { PagedResult } from "../../../common-models/paged-result";
import { ResponseLeavesTestSearchResult } from "../models/response-leaves-test-search-result";

export interface PostSearchLeavesTestsResponse {
    data: PagedResult<ResponseLeavesTestSearchResult>;
}
