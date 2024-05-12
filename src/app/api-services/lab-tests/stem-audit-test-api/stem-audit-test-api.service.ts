import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostSearchStemAuditTestRequest } from './requests/post-search-stem-audit-test-request';
import { PostSearchStemAuditTestsResponse } from './responses/post-stem-audit-test-response';
import { PostCreateStemAuditTestRequest } from './requests/post-create-stem-audit-test-request';
import { PutUpdateStemAuditTestRequest } from './requests/put-update-stem-audit-test-request';
import { GetStemAuditTestByIdResponse } from './responses/get-stem-audit-test-by-id-response';

@Injectable({
	providedIn: 'root'
})
export class StemAuditTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchStemAuditTestRequest): Observable<ApiResult<PostSearchStemAuditTestsResponse>> {
		const url = this.apiConfig.composeUrl('stemaudittest/search');
		return this.http.post<ApiResult<PostSearchStemAuditTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateStemAuditTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('stemaudittest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateStemAuditTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`stemaudittest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`stemaudittest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getStemAuditById(testId: string): Observable<ApiResult<GetStemAuditTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`stemaudittest/${testId}`);
		return this.http.get<ApiResult<GetStemAuditTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
