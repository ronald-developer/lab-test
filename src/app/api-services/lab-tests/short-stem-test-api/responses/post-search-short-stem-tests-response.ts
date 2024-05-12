import { PagedResult } from "../../../common-models/paged-result";
import { ResponseShortStemTestSearchResult } from "../models/response-short-stem-test-search-result";

export interface PostSearchShortStemTestsResponse {
    data: PagedResult<ResponseShortStemTestSearchResult>;
}
