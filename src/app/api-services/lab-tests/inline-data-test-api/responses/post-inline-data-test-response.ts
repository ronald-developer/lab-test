import { PagedResult } from "../../../common-models/paged-result";
import { ResponseInlineDataTestSearchResult } from "../models/response-inline-data-test-search-result";

export interface PostSearchInlineDataTestsResponse {
    data: PagedResult<ResponseInlineDataTestSearchResult>;
}
