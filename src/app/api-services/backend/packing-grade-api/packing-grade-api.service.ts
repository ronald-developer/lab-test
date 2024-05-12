import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { take } from 'rxjs';
import { environment } from "src/environments/environment";
import { ApiResult } from '../../api.result';
import { GetPackingGradesResponse } from './responses/get-packing-grades-response';
import { API_URL_BACKEND_CONFIG } from "src/app/core/injection-tokens/api-tokens";
import { ApiTokenConfig } from "src/app/core/models/api-token-config";
const API_URL = `${environment.apiUrl}`;
@Injectable({
	providedIn: 'root'
})
export class PackingGradeApiService {
	private baseUrl = `${API_URL}/api/backend/packinggrade`;
	constructor(private http: HttpClient, @Inject(API_URL_BACKEND_CONFIG) private apiConfig: ApiTokenConfig) { }

	public getPackingGrades() {
		const url = this.apiConfig.composeUrl('packinggrade');
		return this.http.get<ApiResult<GetPackingGradesResponse>>(url).pipe(take(1));
	}
}
