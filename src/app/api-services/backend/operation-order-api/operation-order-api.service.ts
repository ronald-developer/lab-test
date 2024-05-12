import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { take } from 'rxjs';
import { environment } from "src/environments/environment";
import { ApiResult } from '../../api.result';
import { GetOperationOrdersResponse } from './responses/get-operation-orders-response';
import { API_URL_BACKEND_CONFIG } from "src/app/core/injection-tokens/api-tokens";
import { ApiTokenConfig } from "src/app/core/models/api-token-config";
const API_URL = `${environment.apiUrl}`;
@Injectable({
	providedIn: 'root'
})
export class OperationOrderApiService {
	private baseUrl = `${API_URL}/api/backend/operationorder`;
	constructor(private http: HttpClient, @Inject(API_URL_BACKEND_CONFIG) private apiConfig: ApiTokenConfig) { }

	public getOperationOrders() {
		const url = this.apiConfig.composeUrl('operationorder');
		return this.http.get<ApiResult<GetOperationOrdersResponse>>(url).pipe(take(1));
	}
}
