import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_DASHBOARD_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { RequestStemDegsDashboardCriteria } from '../shared/models/request-stem-degs-dashboard-criteria';
import { PostSearchStemDegsTotalStemDashboardResponse } from './responses/post-search-stem-degs-total-stem-dashboard-response';
import { PostSearchStemDegsTotalStemDashboardRequest } from './requests/post-search-stem-degs-total-stem-dashboard-request';

@Injectable({
	providedIn: 'root'
})
export class StemDegsTotalStemDashboardApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_DASHBOARD_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public getStemDegsTotalStemDashboardData(request: RequestStemDegsDashboardCriteria): Observable<ApiResult<PostSearchStemDegsTotalStemDashboardResponse>> {
		const url = this.apiConfig.composeUrl('stemdegs/totalstem');
		return this.http.post<ApiResult<PostSearchStemDegsTotalStemDashboardResponse>>(url, new PostSearchStemDegsTotalStemDashboardRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}

