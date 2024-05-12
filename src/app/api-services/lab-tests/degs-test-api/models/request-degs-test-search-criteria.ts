import { RequestLabTestSearchCriteria } from "../../common-models/request-lab-test-search-criteria";

export class RequestDegsTestSearchCriteria extends RequestLabTestSearchCriteria {
    cartonNo?: number;
    testType?: number;
}
