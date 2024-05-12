import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostSearchBundleBusterTestsResponse } from './responses/post-bundle-buster-tests-response';
import { PostSearchBundleBusterTestRequest } from './requests/post-search-bundle-buster-tests.-request';
import { GetBundleBusterTestByIdResponse } from './responses/get-bundle-buster-test-by-id-response';
import { PostCreateBundleBusterTestRequest } from './requests/post-create-bundle-buster-test-request';
import { PutUpdateBundleBusterTestRequest } from './requests/put-update-bundle-buster-test-request';

@Injectable({
	providedIn: 'root'
})
export class BundleBusterTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchBundleBusterTestRequest): Observable<ApiResult<PostSearchBundleBusterTestsResponse>> {
		const url = this.apiConfig.composeUrl('bundlebustertest/search');
		return this.http.post<ApiResult<PostSearchBundleBusterTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateBundleBusterTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('bundlebustertest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateBundleBusterTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`bundlebustertest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`bundlebustertest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getById(testId: string): Observable<ApiResult<GetBundleBusterTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`bundlebustertest/${testId}`);
		return this.http.get<ApiResult<GetBundleBusterTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
