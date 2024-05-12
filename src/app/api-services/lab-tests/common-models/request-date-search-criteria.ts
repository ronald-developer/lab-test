import { RequestPageQuery } from "../../common-models/request-page-query";

export class RequestDateSearchCriteria extends RequestPageQuery {
    public dateSearch: boolean;
    public fromDate: Date;
    public toDate: Date;
}