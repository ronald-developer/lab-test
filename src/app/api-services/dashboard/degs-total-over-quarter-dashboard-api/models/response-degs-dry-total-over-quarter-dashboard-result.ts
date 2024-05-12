import { PagedResult } from "../../../common-models/paged-result";
import { ResponseDegsDryTotalOverQuarterDashboardResultDetail } from "./response-degs-dry-total-over-quarter-dashboard-result-detail";

export interface ResponseDegsDryTotalOverQuarterDashboardResult {
	ucl: number;
	target: number;
	lcl: number;
	details: PagedResult<ResponseDegsDryTotalOverQuarterDashboardResultDetail>;
}

