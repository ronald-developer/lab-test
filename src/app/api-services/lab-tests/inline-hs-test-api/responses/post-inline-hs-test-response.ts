import { PagedResult } from "../../../common-models/paged-result";
import { ResponseInlineHsTestSearchResult } from "../models/response-inline-hs-test-search-result";

export interface PostSearchInlineHsTestsResponse {
    data: PagedResult<ResponseInlineHsTestSearchResult>;
}
