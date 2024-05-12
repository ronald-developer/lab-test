import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostSearchLeavesTestRequest } from './requests/post-search-leaves-test-request';
import { PostCreateLeavesTestRequest } from './requests/post-create-leaves-test-request';
import { PutUpdateLeavesTestRequest } from './requests/put-update-leaves-test-request';
import { GetLeavesTestByIdResponse } from './responses/get-leaves-test-by-id-response';
import { PostSearchLeavesTestsResponse } from './responses/post-leaves-test-response';

@Injectable({
	providedIn: 'root'
})
export class LeavesTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchLeavesTestRequest): Observable<ApiResult<PostSearchLeavesTestsResponse>> {
		const url = this.apiConfig.composeUrl('leavestest/search');
		return this.http.post<ApiResult<PostSearchLeavesTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateLeavesTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('leavestest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateLeavesTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`leavestest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`leavestest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getLeavesById(testId: string): Observable<ApiResult<GetLeavesTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`leavestest/${testId}`);
		return this.http.get<ApiResult<GetLeavesTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
