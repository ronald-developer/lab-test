import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostSearchTipsTestRequest } from './requests/post-search-tips-tests.-request';
import { PostCreateTipsTestRequest } from './requests/post-create-tips-test-request';
import { PutUpdateTipsTestRequest } from './requests/put-update-tips-test-request';
import { GetTipsTestByIdResponse } from './responses/get-tips-test-by-id-response';
import { PostSearchTipsTestsResponse } from './responses/post-tips-tests-response';

@Injectable({
	providedIn: 'root'
})
export class TipsTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchTipsTestRequest): Observable<ApiResult<PostSearchTipsTestsResponse>> {
		const url = this.apiConfig.composeUrl('tipstest/search');
		return this.http.post<ApiResult<PostSearchTipsTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateTipsTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('tipstest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateTipsTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`tipstest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`tipstest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getTipsById(testId: string): Observable<ApiResult<GetTipsTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`tipstest/${testId}`);
		return this.http.get<ApiResult<GetTipsTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
