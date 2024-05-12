import { PagedResult } from "../../../common-models/paged-result";
import { ResponseMoistureTemperatureDashboardResultDetail } from "./response-moisture-temperature-dashboard-result-detail";


export interface ResponseMoistureTemperatureDashboardResult {
	ucl: number;
	target: number;
	lcl: number;
	details: PagedResult<ResponseMoistureTemperatureDashboardResultDetail>;
}

