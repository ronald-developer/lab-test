import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostSearchLooseLeafTestRequest } from './requests/post-search-loose-leaf-test-request';
import { PostCreateLooseLeafTestRequest } from './requests/post-create-loose-leaf-test-request';
import { PutUpdateLooseLeafTestRequest } from './requests/put-update-loose-leaf-test-request';
import { GetLooseLeafTestByIdResponse } from './responses/get-loose-leaf-test-by-id-response';
import { PostSearchLooseLeafTestsResponse } from './responses/post-loose-leaf-test-response';

@Injectable({
	providedIn: 'root'
})
export class LooseLeafTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchLooseLeafTestRequest): Observable<ApiResult<PostSearchLooseLeafTestsResponse>> {
		const url = this.apiConfig.composeUrl('looseleaftest/search');
		return this.http.post<ApiResult<PostSearchLooseLeafTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateLooseLeafTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('looseleaftest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateLooseLeafTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`looseleaftest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`looseleaftest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getLooseLeafById(testId: string): Observable<ApiResult<GetLooseLeafTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`looseleaftest/${testId}`);
		return this.http.get<ApiResult<GetLooseLeafTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
