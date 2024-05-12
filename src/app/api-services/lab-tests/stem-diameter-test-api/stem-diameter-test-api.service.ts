import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateStemDiameterTestRequest } from './requests/post-create-stem-diameter-test-request';
import { PostSearchStemDiameterTestRequest } from './requests/post-search-stem-diameter-test-request';
import { PutUpdateStemDiameterTestRequest } from './requests/put-update-stem-diameter-test-request';
import { GetStemDiameterTestByIdResponse } from './responses/get-stem-diameter-test-by-id-response';
import { PostSearchStemDiameterTestsResponse } from './responses/post-stem-diameter-test-response';

@Injectable({
	providedIn: 'root'
})
export class StemDiameterTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchStemDiameterTestRequest): Observable<ApiResult<PostSearchStemDiameterTestsResponse>> {
		const url = this.apiConfig.composeUrl('stemdiametertest/search');
		return this.http.post<ApiResult<PostSearchStemDiameterTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateStemDiameterTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('stemdiametertest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateStemDiameterTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`stemdiametertest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`stemdiametertest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getStemDiameterById(testId: string): Observable<ApiResult<GetStemDiameterTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`stemdiametertest/${testId}`);
		return this.http.get<ApiResult<GetStemDiameterTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
