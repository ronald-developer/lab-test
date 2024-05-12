import { PagedResult } from "../../../common-models/paged-result";
import { ResponseDegsDryTotalOverHalfDashboardResultDetail as ResponseDegsDryTotalOverHalfDashboardResultDetail } from "./response-degs-dry-total-over-half-dashboard-result-detail";

export interface ResponseDegsDryTotalOverHalfDashboardResult {
	ucl: number;
	target: number;
	lcl: number;
	details: PagedResult<ResponseDegsDryTotalOverHalfDashboardResultDetail>;
}

