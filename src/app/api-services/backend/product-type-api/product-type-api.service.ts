import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from 'rxjs';
import { environment } from "src/environments/environment";
import { ApiResult } from '../../api.result';
import { GetProductTypesResponse } from "./responses/get-product-types-response";
const API_URL = `${environment.apiUrl}`;
@Injectable({
	providedIn: 'root'
})
export class ProductTypeApiService {
	private baseUrl = `${API_URL}/api/backend/producttypes`;
	constructor(private http: HttpClient) { }

	public getProductTypes() {
		return this.http.get<ApiResult<GetProductTypesResponse>>(`${this.baseUrl}`).pipe(take(1));
	}
}
