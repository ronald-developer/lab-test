import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { PostSearchMoistureAndTempTestDetailsReportRequest } from './requests/post-search-moisture-and-temp-test-details-report-request';
import { PostSearchMoistureAndTempTestSummaryReportRequest } from './requests/post-search-moisture-and-temp-test-summary-report-request';

@Injectable({
  providedIn: 'root'
})
export class MoistureAndTempTestReportApiService {
	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public summaryReport(request: PostSearchMoistureAndTempTestSummaryReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/moistureandtemptestreport/summary');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public detailsReport(request: PostSearchMoistureAndTempTestDetailsReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/moistureandtemptestreport/detail');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

}
