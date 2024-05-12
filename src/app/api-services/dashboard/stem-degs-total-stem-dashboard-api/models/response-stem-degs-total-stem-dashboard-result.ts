import { PagedResult } from "../../../common-models/paged-result";
import { ResponseStemDegsTotalStemDashboardResultDetail } from "./response-stem-degs-total-stem-dashboard-result-detail";

export interface ResponseStemDegsTotalStemDashboardResult {
	ucl: number;
	target: number;
	lcl: number;
	details: PagedResult<ResponseStemDegsTotalStemDashboardResultDetail>;
}

