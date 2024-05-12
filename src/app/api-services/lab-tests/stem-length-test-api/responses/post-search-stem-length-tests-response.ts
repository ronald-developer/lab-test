import { PagedResult } from "src/app/api-services/common-models/paged-result";
import { ResponseStemLengthTestSearchResult } from "../models/response-stem-length-test-search-result";

export interface PostSearchStemLengthTestsResponse {
    data: PagedResult<ResponseStemLengthTestSearchResult>;
}