import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostGenerateTestLastThreeResultReportRequest } from './requests/post-generate-test-last-three-result-report-request';
import { PostGenerateTestLastThreeResultReportResponse } from './responses/post-generate-test-last-three-result-report-response';

@Injectable({
	providedIn: 'root'
})
export class TestLastThreeResultReportApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public generateTestsLastThreeResults(request: PostGenerateTestLastThreeResultReportRequest): Observable<ApiResult<PostGenerateTestLastThreeResultReportResponse>> {
		const url = this.apiConfig.composeUrl('reports/tests-last-three-result');
		return this.http.post<ApiResult<PostGenerateTestLastThreeResultReportResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
