import { PagedResult } from "../../../common-models/paged-result";
import { ResponseStemInScrapTestSearchResult } from "../models/response-stem-in-scrap-test-search-result";

export interface PostSearchStemInScrapTestsResponse {
    data: PagedResult<ResponseStemInScrapTestSearchResult>;
}
