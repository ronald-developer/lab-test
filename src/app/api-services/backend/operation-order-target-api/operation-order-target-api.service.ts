import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from 'rxjs';
import { environment } from "src/environments/environment";
import { ApiResult } from '../../api.result';
import { GetOperationOrderTargetsResponse } from "./responses/get-operation-order-targets-response";
const API_URL = `${environment.apiUrl}`;
@Injectable({
	providedIn: 'root'
})
export class OperationOrderTargetApiService {
	private baseUrl = `${API_URL}/api/backend/operationorder`;
	constructor(private http: HttpClient) { }

	public getOperationOrderTargets(id: number) {
		return this.http.get<ApiResult<GetOperationOrderTargetsResponse>>(`${this.baseUrl}/${id}/targets`).pipe(take(1));
	}
}
