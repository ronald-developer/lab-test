import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { PostSearchStemDiameterTestDetailsReportRequest } from './requests/post-search-stem-diameter-test-details-report-request';
import { PostSearchStemDiameterTestSummaryReportRequest } from './requests/post-search-stem-diameter-test-summary-report-request';

@Injectable({
	providedIn: 'root'
})
export class StemDiameterTestReportApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}

	public summaryReport(request: PostSearchStemDiameterTestSummaryReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/stemdiametertestreport/summary');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}

	public detailsReport(request: PostSearchStemDiameterTestDetailsReportRequest): Observable<Blob> {
		const url = this.apiConfig.composeUrl('reports/stemdiametertestreport/detail');
		const options = { responseType: 'blob' as 'json' };
		return this.http.post<Blob>(url, request, options).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
