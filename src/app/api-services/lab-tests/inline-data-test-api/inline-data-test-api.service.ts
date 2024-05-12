import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { PostSearchInlineDataTestRequest } from './requests/post-search-inline-data-test-request';
import { PostCreateInlineDataTestRequest } from './requests/post-create-inline-data-test-request';
import { PutUpdateInlineDataTestRequest } from './requests/put-update-inline-data-test-request';
import { GetInlineDataTestByIdResponse } from './responses/get-inline-data-test-by-id-response';
import { PostSearchInlineDataTestsResponse } from './responses/post-inline-data-test-response';


@Injectable({
  providedIn: 'root'
})
export class InlineDataTestApiService {

  constructor(
    private http: HttpClient,
    private errorMessagingService: ErrorMessagingService,
    @Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
  }

  public search(request: PostSearchInlineDataTestRequest): Observable<ApiResult<PostSearchInlineDataTestsResponse>> {
    const url = this.apiConfig.composeUrl('inlinedatatest/search');
    return this.http.post<ApiResult<PostSearchInlineDataTestsResponse>>(url, request).pipe(
      take(1),
      errorHandler(this.errorMessagingService)
    );
  }

  public create(request: PostCreateInlineDataTestRequest): Observable<ApiResult<unknown>> {
    const url = this.apiConfig.composeUrl('inlinedatatest');
    return this.http.post<ApiResult<unknown>>(url, request).pipe(
      take(1),
      errorHandler(this.errorMessagingService)
    );
  }

  public update(testId: string, request: PutUpdateInlineDataTestRequest): Observable<unknown> {
    const url = this.apiConfig.composeUrl(`inlinedatatest/${testId}`);
    return this.http.put<ApiResult<unknown>>(url, request).pipe(
      take(1),
      errorHandler(this.errorMessagingService, 'component')
    );
  }

  public delete(testId: string): Observable<unknown> {
	const url = this.apiConfig.composeUrl(`inlinedatatest/${testId}`);
	return this.http.delete<ApiResult<unknown>>(url).pipe(
		take(1),
		errorHandler(this.errorMessagingService, 'component')
	);
}

  public getInlineDataById(testId: string): Observable<ApiResult<GetInlineDataTestByIdResponse>> {
    const url = this.apiConfig.composeUrl(`inlinedatatest/${testId}`);
    return this.http.get<ApiResult<GetInlineDataTestByIdResponse>>(url).pipe(
      take(1),
      errorHandler(this.errorMessagingService)
    );
  }
}
