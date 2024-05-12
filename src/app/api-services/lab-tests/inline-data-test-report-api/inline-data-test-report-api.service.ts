import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { errorHandler } from 'src/app/utils/api-service-catcherror-helper.utils';
import { PostSearchInlineDataTestDetailsReportRequest } from './requests/post-search-inline-data-test-details-report-request';
import { PostSearchInlineDataTestSummaryReportRequest } from './requests/post-search-inline-data-test-summary-report-request';
@Injectable({
  providedIn: 'root'
})
export class InlineDataTestReportApiService {

  constructor(
    private http: HttpClient,
    private errorMessagingService: ErrorMessagingService,
    @Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
}

public summaryReport(request: PostSearchInlineDataTestSummaryReportRequest): Observable<Blob> {
    const url = this.apiConfig.composeUrl('reports/inlinedatatestreport/summary');
    const options = { responseType: 'blob' as 'json' };
    return this.http.post<Blob>(url, request, options).pipe(
        take(1),
        errorHandler(this.errorMessagingService)
    );
}

public detailsReport(request: PostSearchInlineDataTestDetailsReportRequest): Observable<Blob> {
    const url = this.apiConfig.composeUrl('reports/inlinedatatestreport/detail');
    const options = { responseType: 'blob' as 'json' };
    return this.http.post<Blob>(url, request, options).pipe(
        take(1),
        errorHandler(this.errorMessagingService)
    );
}
}
