import { PagedResult } from "../../../common-models/paged-result";
import { ResponseNtrmGreenTestSearchResult } from "../models/response-ntrm-green-test-search-result";

export interface PostSearchNtrmGreenTestsResponse {
    data: PagedResult<ResponseNtrmGreenTestSearchResult>;
}
