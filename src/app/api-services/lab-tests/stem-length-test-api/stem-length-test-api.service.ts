import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from './../../../core/models/api-token-config';
import { ErrorMessagingService } from './../../../core/services/error-messaging.service';
import { PostCreateStemLengthTestRequest } from './requests/post-create-stem-length-test-request';
import { PostSearchStemLengthTestsRequest } from './requests/post-search-stem-length-tests-request';
import { PutUpdateStemLengthTestRequest } from './requests/put-update-stem-length-test-request';
import { GetStemLengthTestByIdResponse } from './responses/get-stem-length-test-by-id-response';
import { PostSearchStemLengthTestsResponse } from './responses/post-search-stem-length-tests-response';

@Injectable({
	providedIn: 'root'
})
export class StemLengthTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchStemLengthTestsRequest): Observable<ApiResult<PostSearchStemLengthTestsResponse>> {
		const url = this.apiConfig.composeUrl('stemlengthtest/search');
		return this.http.post<ApiResult<PostSearchStemLengthTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateStemLengthTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl('stemlengthtest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateStemLengthTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`stemlengthtest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`stemlengthtest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getStemLengthById(testId: string): Observable<ApiResult<GetStemLengthTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`stemlengthtest/${testId}`);
		return this.http.get<ApiResult<GetStemLengthTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
