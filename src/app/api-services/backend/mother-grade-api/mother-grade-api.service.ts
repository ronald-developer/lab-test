import { catchError, take } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ApiResult } from '../../api.result';
import { GetMotherGradesResponse } from './responses/get-mother-grades-response';
import { environment } from 'src/environments/environment';
import { API_URL_BACKEND_CONFIG } from 'src/app/core/injection-tokens/api-tokens';
import { ApiTokenConfig } from 'src/app/core/models/api-token-config';
const API_URL = `${environment.apiUrl}`;
@Injectable({
    providedIn: 'root'
})
export class MotherGradeApiService {
    private baseUrl = `${API_URL}/api/backend/mothergrade`;
    constructor(private http: HttpClient, @Inject(API_URL_BACKEND_CONFIG) private apiConfig: ApiTokenConfig) { }

    public getMotherGrades() {
		const url = this.apiConfig.composeUrl('mothergrade');
        return this.http.get<ApiResult<GetMotherGradesResponse>>(url).pipe(take(1));
    }
}
