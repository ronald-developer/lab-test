import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateDensityTestRequest } from './requests/post-create-density-test-request';
import { PostSearchDensityTestRequest } from './requests/post-search-density-test-request';
import { PutUpdateDensityTestRequest } from './requests/put-update-density-test-request';
import { GetDensityTestByIdResponse } from './responses/get-density-test-by-id-response';
import { PostSearchDensityTestsResponse } from './responses/post-density-test-response';

@Injectable({
	providedIn: 'root'
})
export class DensityTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchDensityTestRequest): Observable<ApiResult<PostSearchDensityTestsResponse>> {
		const url = this.apiConfig.composeUrl('densitytest/search');
		return this.http.post<ApiResult<PostSearchDensityTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateDensityTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('densitytest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateDensityTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`densitytest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`densitytest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getDensityById(testId: string): Observable<ApiResult<GetDensityTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`densitytest/${testId}`);
		return this.http.get<ApiResult<GetDensityTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
