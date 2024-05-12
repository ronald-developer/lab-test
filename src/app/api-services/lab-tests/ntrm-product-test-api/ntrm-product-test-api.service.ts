import { HttpClient, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostSearchNtrmProductTestRequest } from './requests/post-search-ntrm-product-test-request';
import { GetNtrmProductTestByIdResponse } from './responses/get-ntrm-product-test-by-id-response';
import { PostSearchNtrmProductTestsResponse } from './responses/post-ntrm-product-test-response';
import { PostCreateNtrmProductTestRequest } from './requests/post-create-ntrm-product-test-request';
import { PutUpdateNtrmProductTestRequest } from './requests/put-update-ntrm-product-test-request';

@Injectable({
	providedIn: 'root'
})
export class NtrmProductTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchNtrmProductTestRequest): Observable<ApiResult<PostSearchNtrmProductTestsResponse>> {
		const url = this.apiConfig.composeUrl('ntrmproducttest/search');
		return this.http.post<ApiResult<PostSearchNtrmProductTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}


	public create(request: PostCreateNtrmProductTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl(`ntrmproducttest`);
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateNtrmProductTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`ntrmproducttest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`ntrmproducttest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getNtrmProductById(testId: string): Observable<ApiResult<GetNtrmProductTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`ntrmproducttest/${testId}`);
		return this.http.get<ApiResult<GetNtrmProductTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
