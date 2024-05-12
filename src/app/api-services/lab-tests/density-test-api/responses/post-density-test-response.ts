import { PagedResult } from "../../../common-models/paged-result";
import { ResponseDensityTestSearchResult } from "../models/response-density-test-search-result";

export interface PostSearchDensityTestsResponse {
    data: PagedResult<ResponseDensityTestSearchResult>;
}
