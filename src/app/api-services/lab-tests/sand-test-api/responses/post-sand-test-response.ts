import { PagedResult } from "../../../common-models/paged-result";
import { ResponseSandTestSearchResult } from "../models/response-sand-test-search-result";

export interface PostSearchSandTestsResponse {
    data: PagedResult<ResponseSandTestSearchResult>;
}
