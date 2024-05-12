import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { API_DASHBOARD_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiResult } from '../../api.result';
import { RequestMoistureMettlerDashboardCriteria } from './models/request-moisture-mettler-dashboard-criteria';
import { PostSearchMoistureMettlerDashboardRequest } from './requests/post-search-moisture-mettler-dashboard-request';
import { PostSearchMoistureMettlerDashboardResponse } from './responses/post-search-moisture-mettler-dashboard-response';

@Injectable({
	providedIn: 'root'
})
export class MoistureMettlerDashboardApiService {

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

}
