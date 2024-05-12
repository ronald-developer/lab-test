import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { PostSearchNtrmInLineTestDetailsReportRequest } from './requests/post-search-ntrm-in-line-test-details-report-request';
import { PostSearchNtrmInLineTestSummaryReportRequest } from './requests/post-search-ntrm-in-line-test-summary-report-request';

@Injectable({
  providedIn: 'root'
})
export class NtrmInLineTestReportApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public summaryReport(request: PostSearchNtrmInLineTestSummaryReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/ntrminlinetestreport/summary');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public detailsReport(request: PostSearchNtrmInLineTestDetailsReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/ntrminlinetestreport/detail');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public downloadUploadSheet(batchId: string) {
		const url = this.apiConfig.composeUrl(`reports/ntrminlinetestreport/${batchId}/upload-sheet`);
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, {}, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
