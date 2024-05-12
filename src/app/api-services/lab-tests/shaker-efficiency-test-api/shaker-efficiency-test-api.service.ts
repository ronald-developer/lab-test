import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostCreateShakerEfficiencyTestRequest } from './requests/post-create-shaker-efficiency-test-request';
import { PostSearchShakerEfficiencyTestRequest } from './requests/post-search-shaker-efficiency-tests.-request';
import { PutUpdateShakerEfficiencyTestRequest } from './requests/put-update-shaker-efficiency-test-request';
import { GetShakerEfficiencyTestByIdResponse } from './responses/get-shaker-efficiency-test-by-id-response';
import { PostSearchShakerEfficiencyTestsResponse } from './responses/post-shaker-efficiency-tests-response';

@Injectable({
	providedIn: 'root'
})
export class ShakerEfficiencyTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchShakerEfficiencyTestRequest): Observable<ApiResult<PostSearchShakerEfficiencyTestsResponse>> {
		const url = this.apiConfig.composeUrl('shakerefficiencytest/search');
		return this.http.post<ApiResult<PostSearchShakerEfficiencyTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateShakerEfficiencyTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('shakerefficiencytest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateShakerEfficiencyTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`shakerefficiencytest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`shakerefficiencytest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getShakerEfficiencyById(testId: string): Observable<ApiResult<GetShakerEfficiencyTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`shakerefficiencytest/${testId}`);
		return this.http.get<ApiResult<GetShakerEfficiencyTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
