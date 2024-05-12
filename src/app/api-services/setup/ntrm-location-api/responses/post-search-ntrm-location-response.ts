import { PagedResult } from "src/app/api-services/common-models/paged-result";
import { ResponseNtrmLocationSearchResult } from "../models/response-ntrm-location-search-result";

export interface PostSearchNtrmLocationResponse {
  data: PagedResult<ResponseNtrmLocationSearchResult>
}
