import { PagedResult } from "../../../common-models/paged-result";
import { ResponseButtedLooseLeafTestSearchResult } from "../models/response-butted-loose-leaf-test-search-result";

export interface PostSearchButtedLooseLeafTestsResponse {
    data: PagedResult<ResponseButtedLooseLeafTestSearchResult>;
}
