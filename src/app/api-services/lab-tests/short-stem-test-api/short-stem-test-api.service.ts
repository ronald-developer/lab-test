import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateShortStemTestRequest } from './requests/post-create-short-stem-test-request';
import { PostSearchShortStemTestRequest } from './requests/post-search-short-stem-tests.-request';
import { PutUpdateShortStemTestRequest } from './requests/put-update-short-stem-test-request';
import { GetShortStemTestByIdResponse } from './responses/get-short-stem-test-by-id-response';
import { PostSearchShortStemTestsResponse } from './responses/post-search-short-stem-tests-response';

@Injectable({
	providedIn: 'root'
})
export class ShortStemTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchShortStemTestRequest): Observable<ApiResult<PostSearchShortStemTestsResponse>> {
		const url = this.apiConfig.composeUrl('shortstemtest/search');
		return this.http.post<ApiResult<PostSearchShortStemTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateShortStemTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('shortstemtest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateShortStemTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`shortstemtest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`shortstemtest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getShortStemById(testId: string): Observable<ApiResult<GetShortStemTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`shortstemtest/${testId}`);
		return this.http.get<ApiResult<GetShortStemTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
