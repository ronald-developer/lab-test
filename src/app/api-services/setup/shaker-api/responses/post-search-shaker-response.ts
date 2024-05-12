import { PagedResult } from "src/app/api-services/common-models/paged-result";
import { ResponseShakerSearchResult } from "../models/response-shaker-search-result";

export interface PostSearchShakerResponse {
  data: PagedResult<ResponseShakerSearchResult>
}
