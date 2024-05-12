import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostSearchButtedLooseLeafTestRequest } from './requests/post-search-butted-loose-leaf-test-request';
import { PostCreateButtedLooseLeafTestRequest } from './requests/post-create-butted-loose-leaf-test-request';
import { PutUpdateButtedLooseLeafTestRequest } from './requests/put-update-butted-loose-leaf-test-request';
import { GetButtedLooseLeafTestByIdResponse } from './responses/get-butted-loose-leaf-test-by-id-response';
import { PostSearchButtedLooseLeafTestsResponse } from './responses/post-butted-loose-leaf-test-response';
import { PutUpdateTestNcpStatusRequest } from '../lab-tests-compliance-api/requests/put-update-test-ncp-status-request';
import { RequestUpdateNcpTestEntryModel } from '../lab-tests-compliance-api/models/request-update-ncp-test-entry-model';

@Injectable({
	providedIn: 'root'
})
export class ButtedLooseLeafTestApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchButtedLooseLeafTestRequest): Observable<ApiResult<PostSearchButtedLooseLeafTestsResponse>> {
		const url = this.apiConfig.composeUrl('ButtedLooseLeaftest/search');
		return this.http.post<ApiResult<PostSearchButtedLooseLeafTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateButtedLooseLeafTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('buttedlooseleaftest');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(testId: string, request: PutUpdateButtedLooseLeafTestRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`buttedlooseleaftest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`buttedlooseleaftest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getButtedLooseLeafById(testId: string): Observable<ApiResult<GetButtedLooseLeafTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`buttedlooseleaftest/${testId}`);
		return this.http.get<ApiResult<GetButtedLooseLeafTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public updateNcp(labTestId: number, request: RequestUpdateNcpTestEntryModel) {
		const url = this.apiConfig.composeUrl(`buttedlooseleaftest/${labTestId}`);
		return this.http.put<ApiResult<GetButtedLooseLeafTestByIdResponse>>(url, new PutUpdateTestNcpStatusRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
