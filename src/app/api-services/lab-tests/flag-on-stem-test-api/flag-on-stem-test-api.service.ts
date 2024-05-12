import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostSearchFlagOnStemTestRequest } from './requests/post-search-flag-on-stem-tests.-request';
import { PostCreateFlagOnStemTestRequest } from './requests/post-create-flag-on-stem-test-request';
import { PutUpdateFlagOnStemTestRequest } from './requests/put-update-flag-on-stem-test-request';
import { GetFlagOnStemTestByIdResponse } from './responses/get-flag-on-stem-test-by-id-response';
import { PostSearchFlagOnStemTestsResponse } from './responses/post-flag-on-stem-tests-response';

@Injectable({
	providedIn: 'root'
})
export class FlagOnStemTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchFlagOnStemTestRequest): Observable<ApiResult<PostSearchFlagOnStemTestsResponse>> {
		const url = this.apiConfig.composeUrl('flagonstemtest/search');
		return this.http.post<ApiResult<PostSearchFlagOnStemTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateFlagOnStemTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('flagonstemtest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateFlagOnStemTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`flagonstemtest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`flagonstemtest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getFlagOnStemById(testId: string): Observable<ApiResult<GetFlagOnStemTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`flagonstemtest/${testId}`);
		return this.http.get<ApiResult<GetFlagOnStemTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
