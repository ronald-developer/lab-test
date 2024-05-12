import { PagedResult } from "../../../common-models/paged-result";
import { ResponseDegsTestSearchResult } from "../models/response-degs-test-search-result";

export interface PostSearchDegsTestsResponse {
    data: PagedResult<ResponseDegsTestSearchResult>;
}
