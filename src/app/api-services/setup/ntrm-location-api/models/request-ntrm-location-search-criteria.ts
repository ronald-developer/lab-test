import { RequestPageQuery } from "src/app/api-services/common-models/request-page-query";

export class RequestNtrmLocationSearchCriteria extends RequestPageQuery {
  includeInactive: boolean;
  name: string;
}
