import { PagedResult } from "../../../common-models/paged-result";
import { ResponseBundleBusterTestSearchResult } from "../models/response-bundle-buster-test-search-result";

export interface PostSearchBundleBusterTestsResponse {
    data: PagedResult<ResponseBundleBusterTestSearchResult>;
}
