import { PagedResult } from "../../../common-models/paged-result";
import { ResponseStemDiameterTestSearchResult } from "../models/response-stem-diameter-test-search-result";

export interface PostSearchStemDiameterTestsResponse {
    data: PagedResult<ResponseStemDiameterTestSearchResult>;
}
