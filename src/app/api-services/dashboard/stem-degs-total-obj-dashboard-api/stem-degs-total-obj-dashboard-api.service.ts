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
import { PostSearchStemDegsTotalObjDashboardRequest } from './requests/post-search-stem-degs-total-obj-dashboard-request';
import { PostSearchStemDegsTotalObjDashboardResponse } from './responses/post-search-stem-degs-total-obj-dashboard-response';

@Injectable({
	providedIn: 'root'
})
export class StemDegsTotalObjDashboardApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_DASHBOARD_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public getStemDegsTotalObjDashboardData(request: RequestStemDegsDashboardCriteria): Observable<ApiResult<PostSearchStemDegsTotalObjDashboardResponse>> {
		const url = this.apiConfig.composeUrl('stemdegs/totalobj');
		return this.http.post<ApiResult<PostSearchStemDegsTotalObjDashboardResponse>>(url, new PostSearchStemDegsTotalObjDashboardRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}

