import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostSearchInlineHsTestRequest } from './requests/post-search-inline-hs-test-request';
import { PostCreateInlineHsTestRequest } from './requests/post-create-inline-hs-test-request';
import { PutUpdateInlineHsTestRequest } from './requests/put-update-inline-hs-test-request';
import { GetInlineHsTestByIdResponse } from './responses/get-inline-hs-test-by-id-response';
import { PostSearchInlineHsTestsResponse } from './responses/post-inline-hs-test-response';

@Injectable({
	providedIn: 'root'
})
export class InlineHsTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchInlineHsTestRequest): Observable<ApiResult<PostSearchInlineHsTestsResponse>> {
		const url = this.apiConfig.composeUrl('inlinehstest/search');
		return this.http.post<ApiResult<PostSearchInlineHsTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateInlineHsTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('inlinehstest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateInlineHsTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`inlinehstest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`inlinehstest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getInlineHsById(testId: string): Observable<ApiResult<GetInlineHsTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`inlinehstest/${testId}`);
		return this.http.get<ApiResult<GetInlineHsTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
