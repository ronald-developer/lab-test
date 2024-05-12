import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { PostSearchBundleBusterTestSummaryReportRequest } from './requests/post-search-bundle-buster-test-summary-report-request';
import { PostSearchBundleBusterTestDetailsReportRequest } from './requests/post-search-bundle-buster-test-details-report-request';

@Injectable({
	providedIn: 'root'
})
export class BundleBusterTestReportApiService {
	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public summaryReport(request: PostSearchBundleBusterTestSummaryReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/bundlebustertestreport/summary');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public detailsReport(request: PostSearchBundleBusterTestDetailsReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/bundlebustertestreport/detail');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
