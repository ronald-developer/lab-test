import { RequestPageQuery } from "src/app/api-services/common-models/request-page-query";

export class RequestShakerSearchCriteria extends RequestPageQuery {
  includeInactive: boolean;
  name: string;
}
