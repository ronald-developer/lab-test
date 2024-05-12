import { PagedResult } from "../../../common-models/paged-result";
import { ResponseShakerEfficiencyTestSearchResult } from "../models/response-shaker-efficiency-test-search-result";

export interface PostSearchShakerEfficiencyTestsResponse {
    data: PagedResult<ResponseShakerEfficiencyTestSearchResult>;
}
