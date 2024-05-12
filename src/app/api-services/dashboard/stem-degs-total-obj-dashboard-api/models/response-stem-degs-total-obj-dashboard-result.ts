import { PagedResult } from "../../../common-models/paged-result";
import { ResponseStemDegsTotalObjDashboardResultDetail } from "./response-stem-degs-total-obj-dashboard-result-detail";

export interface ResponseStemDegsTotalObjDashboardResult {
	ucl: number;
	target: number;
	lcl: number;
	details: PagedResult<ResponseStemDegsTotalObjDashboardResultDetail>;
}

