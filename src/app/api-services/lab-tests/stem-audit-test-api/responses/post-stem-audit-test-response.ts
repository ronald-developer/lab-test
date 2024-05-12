import { PagedResult } from "../../../common-models/paged-result";
import { ResponseStemAuditTestSearchResult } from "../models/response-stem-audit-test-search-result";

export interface PostSearchStemAuditTestsResponse {
    data: PagedResult<ResponseStemAuditTestSearchResult>;
}
