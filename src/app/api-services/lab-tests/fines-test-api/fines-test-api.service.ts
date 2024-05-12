import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { PostSearchFinesTestRequest } from './requests/post-search-fines-test-request';
import { Observable, take } from 'rxjs';
import { ApiResult } from '../../api.result';
import { PostSearchFinesTestsResponse } from './responses/post-fines-test-response';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { PostCreateFinesTestRequest } from './requests/post-create-fines-test-request';
import { PutUpdateFinesTestRequest } from './requests/put-update-fines-test-request';
import { GetFinesTestByIdResponse } from './responses/get-fines-test-by-id-response';

@Injectable({
	providedIn: 'root'
})
export class FinesTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchFinesTestRequest): Observable<ApiResult<PostSearchFinesTestsResponse>> {
		const url = this.apiConfig.composeUrl('finestest/search');
		return this.http.post<ApiResult<PostSearchFinesTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateFinesTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('finestest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateFinesTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`finestest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`finestest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getFinesById(testId: string): Observable<ApiResult<GetFinesTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`finestest/${testId}`);
		return this.http.get<ApiResult<GetFinesTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
