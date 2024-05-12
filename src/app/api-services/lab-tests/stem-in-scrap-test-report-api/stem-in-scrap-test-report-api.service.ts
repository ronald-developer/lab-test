import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { PostSearchStemInScrapTestDetailsReportRequest } from './requests/post-search-stem-in-scrap-test-details-report-request';
import { PostSearchStemInScrapTestSummaryReportRequest } from './requests/post-search-stem-in-scrap-test-summary-report-request';
@Injectable({
    providedIn: 'root'
})
export class StemInScrapTestReportApiService {
    constructor(
        private http: HttpClient,
        private errorMessagingService: ErrorMessagingService,
        @Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
    }

    public summaryReport(request: PostSearchStemInScrapTestSummaryReportRequest): Observable<Blob> {
        const url = this.apiConfig.composeUrl('reports/steminscraptestreport/summary');
        const options = { responseType: 'blob' as 'json' };
        return this.http.post<Blob>(url, request, options).pipe(
            take(1),
            errorHandler(this.errorMessagingService)
        );
    }

    public detailsReport(request: PostSearchStemInScrapTestDetailsReportRequest): Observable<Blob> {
        const url = this.apiConfig.composeUrl('reports/steminscraptestreport/detail');
        const options = { responseType: 'blob' as 'json' };
        return this.http.post<Blob>(url, request, options).pipe(
            take(1),
            errorHandler(this.errorMessagingService)
        );
    }

}
