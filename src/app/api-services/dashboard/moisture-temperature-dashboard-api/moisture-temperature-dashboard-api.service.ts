import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_DASHBOARD_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { RequestMoistureTemperatureDashboardCriteria } from './models/request-moisture-temperature-dashboard-criteria';
import { PostSearchMoistureTemperatureDashboardRequest } from './requests/post-search-moisture-temperature-dashboard-request';
import { PostSearchMoistureTemperatureDashboardResponse } from './responses/post-search-moisture-temperature-dashboard-response';

@Injectable({
	providedIn: 'root'
})
export class MoistureTemperatureDashboardApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_DASHBOARD_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public getTemperatureDashboardData(request: RequestMoistureTemperatureDashboardCriteria): Observable<ApiResult<PostSearchMoistureTemperatureDashboardResponse>> {
		const url = this.apiConfig.composeUrl('moistureandtemperature/temperature');
		return this.http.post<ApiResult<PostSearchMoistureTemperatureDashboardResponse>>(url, new PostSearchMoistureTemperatureDashboardRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
