import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateStemInScrapTestRequest } from './requests/post-create-stem-in-scrap-test-request';
import { PostSearchStemInScrapTestRequest } from './requests/post-search-stem-in-scrap-test-request';
import { PutUpdateStemInScrapTestRequest } from './requests/put-update-stem-in-scrap-test-request';
import { GetStemInScrapTestByIdResponse } from './responses/get-stem-in-scrap-test-by-id-response';
import { PostSearchStemInScrapTestsResponse } from './responses/post-stem-in-scrap-test-response';

@Injectable({
	providedIn: 'root'
})
export class StemInScrapTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchStemInScrapTestRequest): Observable<ApiResult<PostSearchStemInScrapTestsResponse>> {
		const url = this.apiConfig.composeUrl('steminscraptest/search');
		return this.http.post<ApiResult<PostSearchStemInScrapTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateStemInScrapTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('steminscraptest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateStemInScrapTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`steminscraptest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService,'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`steminscraptest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getStemInScrapById(testId: string): Observable<ApiResult<GetStemInScrapTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`steminscraptest/${testId}`);
		return this.http.get<ApiResult<GetStemInScrapTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
