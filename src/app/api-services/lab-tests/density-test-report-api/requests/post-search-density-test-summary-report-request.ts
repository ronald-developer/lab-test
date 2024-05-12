import { RequestDensityTestReportSearchCriteria } from '../models/request-density-test-report-search-criteria';
export class PostSearchDensityTestSummaryReportRequest {
    constructor(public data: RequestDensityTestReportSearchCriteria) {
      data.charger = !data.charger ? undefined : data.charger;
      data.cartonNo = !data.cartonNo ? undefined : data.cartonNo;
     }
}
