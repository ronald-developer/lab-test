import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_SETUP_URL_CONFIG, API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PostCreateNtrmLocationRequest } from './requests/post-create-ntrm-location-request';
import { PostSearchNtrmLocationRequest } from './requests/post-search-ntrm-location-request';
import { PutUpdateNtrmLocationRequest } from './requests/put-update-ntrm-location-request';
import { GetNtrmLocationByIdResponse } from './responses/get-ntrm-location-by-id-response';
import { PostSearchNtrmLocationResponse } from './responses/post-search-ntrm-location-response';
import { GetAllNtrmLocationResponse } from './responses/get-all-ntrm-location-response';

@Injectable({
	providedIn: 'root'
})
export class NtrmLocationApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_SETUP_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public search(request: PostSearchNtrmLocationRequest): Observable<ApiResult<PostSearchNtrmLocationResponse>> {
		const url = this.apiConfig.composeUrl('ntrm-location/search');
		return this.http.post<ApiResult<PostSearchNtrmLocationResponse>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public create(request: PostCreateNtrmLocationRequest): Observable<ApiResult<unknown>> {
		const url = this.apiConfig.composeUrl('ntrm-location');
		return this.http.post<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public update(id: string, request: PutUpdateNtrmLocationRequest): Observable<unknown> {
		const url = this.apiConfig.composeUrl(`ntrm-location/${id}`);
		return this.http.put<ApiResult<unknown>>(url, request).pipe(
			take(1),
			errorHandler(this.errorMessagingService, 'component')
		);
	}

	public getById(id: string): Observable<ApiResult<GetNtrmLocationByIdResponse>> {
		const url = this.apiConfig.composeUrl(`ntrm-location/${id}`);
		return this.http.get<ApiResult<GetNtrmLocationByIdResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public getAll(): Observable<ApiResult<GetAllNtrmLocationResponse>> {
		const url = this.apiConfig.composeUrl(`ntrm-location/getall`);
		return this.http.get<ApiResult<GetAllNtrmLocationResponse>>(url).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
