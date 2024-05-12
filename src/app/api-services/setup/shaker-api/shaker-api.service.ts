import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_SETUP_URL_CONFIG, API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateShakerRequest } from './requests/post-create-shaker-request';
import { PostSearchShakerRequest } from './requests/post-search-shaker-request';
import { PutUpdateShakerRequest } from './requests/put-update-shaker-request';
import { GetAllShakerResponse } from './responses/get-all-shaker-response';
import { GetShakerByIdResponse } from './responses/get-shaker-by-id-response';
import { PostSearchShakerResponse } from './responses/post-search-shaker-response';

@Injectable({
	providedIn: 'root'
})
export class ShakerApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_SETUP_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchShakerRequest): Observable<ApiResult<PostSearchShakerResponse>> {
		const url = this.apiConfig.composeUrl('shaker/search');
		return this.http.post<ApiResult<PostSearchShakerResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateShakerRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('shaker');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(id: string, request: PutUpdateShakerRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`shaker/${id}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getById(id: string): Observable<ApiResult<GetShakerByIdResponse>> {
		const url = this.apiConfig.composeUrl(`shaker/${id}`);
		return this.http.get<ApiResult<GetShakerByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public getAll(): Observable<ApiResult<GetAllShakerResponse>> {
		const url = this.apiConfig.composeUrl(`shaker/getall`);
		return this.http.get<ApiResult<GetAllShakerResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
