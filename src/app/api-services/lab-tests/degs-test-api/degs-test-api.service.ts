import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateDegsTestRequest } from './requests/post-create-degs-test-request';
import { PostSearchDegsTestRequest } from './requests/post-search-degs-test-request';
import { PutUpdateDegsTestRequest } from './requests/put-update-degs-test-request';
import { PutUpdateStemDegsTestRequest } from './requests/put-update-stem-degs-test-request';
import { GetDegsTestByIdResponse } from './responses/get-degs-test-by-id-response';
import { PostSearchDegsTestsResponse } from './responses/post-degs-test-response';

@Injectable({
	providedIn: 'root'
})
export class DegsTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchDegsTestRequest): Observable<ApiResult<PostSearchDegsTestsResponse>> {
		const url = this.apiConfig.composeUrl('degstest/search');
		return this.http.post<ApiResult<PostSearchDegsTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateDegsTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('degstest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateDegsTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`degstest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`degstest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getDegsById(testId: string): Observable<ApiResult<GetDegsTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`degstest/${testId}`);
		return this.http.get<ApiResult<GetDegsTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public updateStemDegs(testId: string, request: PutUpdateStemDegsTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`degstest/${testId}/stem`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

}
