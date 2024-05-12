import { HttpClient, HttpEvent } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, noop, of, take } from 'rxjs';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { GetMoistureAndTempTestByIdResponse } from './responses/get-moisture-and-temp-test-by-id-response';
import { PostSearchMoistureAndTempTestsResponse } from './responses/post-moisture-and-temp-test-response';
import { PostUploadMoistureAndTempTestResponse } from './responses/post-upload-moisture-and-temp-test-response';
import { PostCreateMoistureAndTempTestRequest } from './requests/post-create-moisture-and-temp-test-request';
import { PostSearchMoistureAndTempTestRequest } from './requests/post-search-moisture-and-temp-test-request';
import { PostUploadMoistureAndTempTestRequest } from './requests/post-upload-moisture-and-temp-test-request';
import { PutUpdateMoistureAndTempTestRequest } from './requests/put-update-moisture-and-temp-test-request';

@Injectable({
	providedIn: 'root'
})
export class MoistureAndTempTestApiService {
	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchMoistureAndTempTestRequest): Observable<ApiResult<PostSearchMoistureAndTempTestsResponse>> {
		const url = this.apiConfig.composeUrl('moistureandtemptest/search');
		return this.http.post<ApiResult<PostSearchMoistureAndTempTestsResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateMoistureAndTempTestRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl(`moistureandtemptest`);
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	update(testId: string, request: PutUpdateMoistureAndTempTestRequest) {
		const url = this.apiConfig.composeUrl(`moistureandtemptest/${testId}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public delete(testId: string): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`moistureandtemptest/${testId}`);
		return this.http.delete<ApiResult<unknown>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}


	public upload(request: PostUploadMoistureAndTempTestRequest, operationOrderId: string): Observable<HttpEvent<ApiResult<PostUploadMoistureAndTempTestResponse>>> {
		const url = this.apiConfig.composeUrl(`moistureandtemptest/${operationOrderId}/upload`);

		const formData = new FormData();
		formData.append('file', request.file);

		return this.http.post<ApiResult<PostUploadMoistureAndTempTestResponse>>(url, formData, { reportProgress: true, observe: 'events' }).pipe(
			errorHandler(this.errorMessagingService)
		);
	}

	public getMoistureAndTempById(testId: string): Observable<ApiResult<GetMoistureAndTempTestByIdResponse>> {
		const url = this.apiConfig.composeUrl(`moistureandtemptest/${testId}`);
		return this.http.get<ApiResult<GetMoistureAndTempTestByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public downloadUploadSheet(operationOrderId: string) {
		const url = this.apiConfig.composeUrl(`moistureandtemptest/${operationOrderId}/upload-sheet`);
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, {}, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
