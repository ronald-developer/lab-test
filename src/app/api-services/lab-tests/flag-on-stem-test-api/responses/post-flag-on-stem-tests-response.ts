import { PagedResult } from "../../../common-models/paged-result";
import { ResponseFlagOnStemTestSearchResult } from "../models/response-flag-on-stem-test-search-result";

export interface PostSearchFlagOnStemTestsResponse {
    data: PagedResult<ResponseFlagOnStemTestSearchResult>;
}
