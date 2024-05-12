import { RequestStemLengthTestSearchCriteria } from "../models/request-stem-length-test-search-criteria";

export class PostSearchStemLengthTestsRequest {
    constructor(
        public data: RequestStemLengthTestSearchCriteria
    ) { }
}