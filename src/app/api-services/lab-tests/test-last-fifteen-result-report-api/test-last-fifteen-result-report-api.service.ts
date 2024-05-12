import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostGenerateTestLastFifteenDegsResultReportResponse } from './responses/post-generate-test-last-fifteen-degs-result-report-response';
import { PostGenerateTestLastFifteenDegsResultReportRequest } from './requests/post-generate-test-last-fifteen-degs-result-report-request';

@Injectable({
	providedIn: 'root'
})
export class TestLastFifteenResultReportApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public generateDegsTestsLastFifteenResults(request: PostGenerateTestLastFifteenDegsResultReportRequest): Observable<ApiResult<PostGenerateTestLastFifteenDegsResultReportResponse>> {
		const url = this.apiConfig.composeUrl('reports/tests-last-fifteen-degs-result');
		return this.http.post<ApiResult<PostGenerateTestLastFifteenDegsResultReportResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
