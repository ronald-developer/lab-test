import { PagedResult } from "../../../common-models/paged-result";
import { ResponseLooseLeafTestSearchResult } from "../models/response-loose-leaf-test-search-result";

export interface PostSearchLooseLeafTestsResponse {
    data: PagedResult<ResponseLooseLeafTestSearchResult>;
}
