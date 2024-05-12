import { Inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateNtrmGreenTestRequest } from './requests/post-create-ntrm-green-test-request';
import { PostSearchNtrmGreenTestRequest } from './requests/post-search-ntrm-green-test-request';
import { PutUpdateNtrmGreenTestRequest } from './requests/put-update-ntrm-green-test-request';
import { GetNtrmGreenTestByIdResponse } from './responses/get-ntrm-green-test-by-id-response';
import { PostSearchNtrmGreenTestsResponse } from './responses/post-ntrm-green-test-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NtrmGreenTestApiService {
	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchNtrmGreenTestRequest): Observable<ApiResult<PostSearchNtrmGreenTestsResponse>> {
		const url = this.apiConfig.composeUrl('ntrmgreentest/search');
		return this.http.post<ApiResult<PostSearchNtrmGreenTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateNtrmGreenTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('ntrmgreentest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateNtrmGreenTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`ntrmgreentest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`ntrmgreentest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getNtrmGreenById(testId: string): Observable<ApiResult<GetNtrmGreenTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`ntrmgreentest/${testId}`);
		return this.http.get<ApiResult<GetNtrmGreenTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
