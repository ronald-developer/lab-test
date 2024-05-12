import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_DASHBOARD_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { RequestDegsDryDashboardCriteria } from '../shared/models/request-degs-dry-dashboard-criteria';
import { PostSearchDegsTotalOverHalfDashboardRequest } from './requests/post-search-degs-dry-total-over-half-dashboard-request';
import { PostSearchDegsDryTotalOverHalfDashboardResponse } from './responses/post-search-degs-dry-total-over-half-dashboard-response';

@Injectable({
	providedIn: 'root'
})
export class DegsTotalOverHalfDashboardApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_DASHBOARD_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public getDegsTotalOverHalfDashboardData(request: RequestDegsDryDashboardCriteria): Observable<ApiResult<PostSearchDegsDryTotalOverHalfDashboardResponse>> {
		const url = this.apiConfig.composeUrl('degsdry/totaloverhalf');
		return this.http.post<ApiResult<PostSearchDegsDryTotalOverHalfDashboardResponse>>(url, new PostSearchDegsTotalOverHalfDashboardRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}

