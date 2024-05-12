import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_DASHBOARD_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../api.result';
import { RequestDegsDryDashboardCriteria } from './shared/models/request-degs-dry-dashboard-criteria';
import { PostSearchDegsTotalOverHalfDashboardRequest } from './degs-total-over-half-dashboard-api/requests/post-search-degs-dry-total-over-half-dashboard-request';
import { PostSearchDegsTotalOverQuarterDashboardRequest } from './degs-total-over-quarter-dashboard-api/requests/post-search-degs-dry-total-over-quarter-dashboard-request';
import { PostSearchDegsDryTotalOverHalfDashboardResponse } from './degs-total-over-half-dashboard-api/responses/post-search-degs-dry-total-over-half-dashboard-response';
import { PostSearchDegsDryTotalOverQuarterDashboardResponse } from './degs-total-over-quarter-dashboard-api/responses/post-search-degs-dry-total-over-quarter-dashboard-response';
import { RequestMoistureMettlerDashboardCriteria } from './moisture-mettler-dashboard-api/models/request-moisture-mettler-dashboard-criteria';
import { PostSearchMoistureMettlerDashboardRequest } from './moisture-mettler-dashboard-api/requests/post-search-moisture-mettler-dashboard-request';
import { PostSearchMoistureMettlerDashboardResponse } from './moisture-mettler-dashboard-api/responses/post-search-moisture-mettler-dashboard-response';


@Injectable({
	providedIn: 'root'
})
export class DashboardApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_DASHBOARD_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public getMettlerDashboardData(request: RequestMoistureMettlerDashboardCriteria): Observable<ApiResult<PostSearchMoistureMettlerDashboardResponse>> {
		const url = this.apiConfig.composeUrl('moistureandtemperature/mettler');
		return this.http.post<ApiResult<PostSearchMoistureMettlerDashboardResponse>>(url, new PostSearchMoistureMettlerDashboardRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public getDegsTotalOverHalfDashboardData(request: RequestDegsDryDashboardCriteria): Observable<ApiResult<PostSearchDegsDryTotalOverHalfDashboardResponse>> {
		const url = this.apiConfig.composeUrl('degsdry/totaloverhalf');
		return this.http.post<ApiResult<PostSearchDegsDryTotalOverHalfDashboardResponse>>(url, new PostSearchDegsTotalOverHalfDashboardRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public getDegsTotalOverQuarterDashboardData(request: RequestDegsDryDashboardCriteria): Observable<ApiResult<PostSearchDegsDryTotalOverQuarterDashboardResponse>> {
		const url = this.apiConfig.composeUrl('degsdry/totaloverquarter');
		return this.http.post<ApiResult<PostSearchDegsDryTotalOverQuarterDashboardResponse>>(url, new PostSearchDegsTotalOverQuarterDashboardRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}

