import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { PostSearchDegsTestSummaryReportRequest } from './requests/post-search-degs-test-summary-report-request';
import { Observable, take } from 'rxjs';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { PostSearchDegsTestDetailsReportRequest } from './requests/post-search-degs-test-details-report-request';

@Injectable({
	providedIn: 'root'
})
export class DegsTestReportApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public summaryReport(request: PostSearchDegsTestSummaryReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/degstestreport/summary');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public detailsReport(request: PostSearchDegsTestDetailsReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/degstestreport/detail');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
