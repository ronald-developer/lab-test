import { Inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { PostCreateSandTestRequest } from './requests/post-create-sand-test-request';
import { PostSearchSandTestRequest } from './requests/post-search-sand-test-request';
import { PutUpdateSandTestRequest } from './requests/put-update-sand-test-request';
import { GetSandTestByIdResponse } from './responses/get-sand-test-by-id-response';
import { ApiResult } from '../../api.result';
import { PostSearchSandTestsResponse } from './responses/post-sand-test-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class SandTestApiService {
	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchSandTestRequest): Observable<ApiResult<PostSearchSandTestsResponse>> {
		const url = this.apiConfig.composeUrl('sandtest/search');
		return this.http.post<ApiResult<PostSearchSandTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateSandTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('sandtest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateSandTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`sandtest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`sandtest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getSandById(testId: string): Observable<ApiResult<GetSandTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`sandtest/${testId}`);
		return this.http.get<ApiResult<GetSandTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
