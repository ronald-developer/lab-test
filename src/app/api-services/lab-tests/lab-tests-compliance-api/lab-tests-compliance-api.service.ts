import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { API_URL_CONFIG } from '../../../core/injection-tokens/api-tokens';
import { ApiTokenConfig } from '../../../core/models/api-token-config';
import { ErrorMessagingService } from '../../../core/services/error-messaging.service';
import { errorHandler } from '../../../utils/api-service-catcherror-helper.utils';
import { ApiResult } from '../../api.result';
import { PutUpdateTestNcpStatusRequest } from './requests/put-update-test-ncp-status-request';
import { RequestUpdateNcpTestEntryModel } from './models/request-update-ncp-test-entry-model';

@Injectable({
	providedIn: 'root'
})
export class LabTestsComplianceApiService {

	constructor(
		private http: HttpClient,
		private errorMessagingService: ErrorMessagingService,
		@Inject(API_URL_CONFIG) private apiConfig: ApiTokenConfig) {
	}


	public updateNcp(labTestId: string, request: RequestUpdateNcpTestEntryModel) {
		const url = this.apiConfig.composeUrl(`manage-ncp/${labTestId}`);
		return this.http.put<ApiResult<unknown>>(url, new PutUpdateTestNcpStatusRequest(request)).pipe(
			take(1),
			errorHandler(this.errorMessagingService)
		);
	}
}
