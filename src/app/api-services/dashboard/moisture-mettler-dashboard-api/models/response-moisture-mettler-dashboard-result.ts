import { PagedResult } from "../../../common-models/paged-result";
import { ResponseMoistureMettlerDashboardResultDetail } from "./response-moisture-mettler-dashboard-result-detail";

export interface ResponseMoistureMettlerDashboardResult {
	ucl: number;
	target: number;
	lcl: number;
	details: PagedResult<ResponseMoistureMettlerDashboardResultDetail>;
}

