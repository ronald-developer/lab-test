import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateNtrmInLineTestRequest } from './requests/post-create-ntrm-in-line-test-request';
import { PostSearchNtrmInLineTestRequest } from './requests/post-search-ntrm-in-line-test-request';
import { PutUpdateNtrmInLineTestRequest } from './requests/put-update-ntrm-in-line-test-request';
import { GetNtrmInLineTestByIdResponse } from './responses/get-ntrm-in-line-test-by-id-response';
import { PostSearchNtrmInLineTestsResponse } from './responses/post-ntrm-in-line-test-response';

@Injectable({
  providedIn: 'root'
})
export class NtrmInLineTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchNtrmInLineTestRequest): Observable<ApiResult<PostSearchNtrmInLineTestsResponse>> {
		const url = this.apiConfig.composeUrl('ntrminlinetest/search');
		return this.http.post<ApiResult<PostSearchNtrmInLineTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateNtrmInLineTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl(`ntrminlinetest`);
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateNtrmInLineTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`ntrminlinetest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`ntrminlinetest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getById(testId: string): Observable<ApiResult<GetNtrmInLineTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`ntrminlinetest/${testId}`);
		return this.http.get<ApiResult<GetNtrmInLineTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
