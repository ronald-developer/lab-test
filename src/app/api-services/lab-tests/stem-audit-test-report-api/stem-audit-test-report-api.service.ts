import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { PostSearchStemAuditTestSummaryReportRequest } from './requests/post-search-stem-audit-test-summary-report-request';
import { PostSearchStemAuditTestDetailsReportRequest } from './requests/post-search-stem-audit-test-details-report-request';
@Injectable({
    providedIn: 'root'
})
export class StemAuditTestReportApiService {
    constructor(
        private http: HttpClient,
        private errorMessagingService: ErrorMessagingService,
        @Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
    }

    public summaryReport(request: PostSearchStemAuditTestSummaryReportRequest): Observable<Blob> {
        const url = this.apiConfig.composeUrl('reports/stemaudittestreport/summary');
        const options = { responseType: 'blob' as 'json' };
        return this.http.post<Blob>(url, request, options).pipe(
            take(1),
            errorHandler(this.errorMessagingService)
        );
    }

    public detailsReport(request: PostSearchStemAuditTestDetailsReportRequest): Observable<Blob> {
        const url = this.apiConfig.composeUrl('reports/stemaudittestreport/detail');
        const options = { responseType: 'blob' as 'json' };
        return this.http.post<Blob>(url, request, options).pipe(
            take(1),
            errorHandler(this.errorMessagingService)
        );
    }

}
