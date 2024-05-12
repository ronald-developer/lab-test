import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { PostSearchInlineHsTestDetailsReportRequest } from './requests/post-search-inline-hs-test-details-report-request';
import { PostSearchInlineHsTestSummaryReportRequest } from './requests/post-search-inline-hs-test-summary-report-request';
@Injectable({
  providedIn: 'root'
})
export class InlineHsTestReportApiService {

  constructor(
    private http: HttpClient,
    private errorMessagingService: ErrorMessagingService,
    @Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
}

public summaryReport(request: PostSearchInlineHsTestSummaryReportRequest): Observable<Blob> {
    const url = this.apiConfig.composeUrl('reports/inlinehstestreport/summary');
    const options = { responseType: 'blob' as 'json' };
    return this.http.post<Blob>(url, request, options).pipe(
        take(1),
        errorHandler(this.errorMessagingService)
    );
}

public detailsReport(request: PostSearchInlineHsTestDetailsReportRequest): Observable<Blob> {
    const url = this.apiConfig.composeUrl('reports/inlinehstestreport/detail');
    const options = { responseType: 'blob' as 'json' };
    return this.http.post<Blob>(url, request, options).pipe(
        take(1),
        errorHandler(this.errorMessagingService)
    );
}
}
