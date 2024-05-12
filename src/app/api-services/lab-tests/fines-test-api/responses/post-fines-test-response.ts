import { PagedResult } from "../../../common-models/paged-result";
import { ResponseFinesTestSearchResult } from "../models/response-fines-test-search-result";

export interface PostSearchFinesTestsResponse {
    data: PagedResult<ResponseFinesTestSearchResult>;
}
