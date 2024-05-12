import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { delay, Observable, take } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResult } from "../api.result";
import { PostLoginRequest } from "./req/post-login-request";
import { PostLoginResponse } from "./responses/post-login-response";
import { ApiTokenConfig } from "src/app/core/models/api-token-config";
import { API_URL_AUTH_CONFIG } from "src/app/core/injection-tokens/api-tokens";

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class AuthApiService {
    constructor(
		@Inject(API_URL_AUTH_CONFIG) private apiConfig: ApiTokenConfig,
        private http: HttpClient
    ) { }

    public login(request: PostLoginRequest): Observable<ApiResult<PostLoginResponse>> {
		const url = this.apiConfig.composeUrl('token');
        const reqHeader = new HttpHeaders({ 'No-Auth': 'True'});
        return this.http.post<ApiResult<PostLoginResponse>>(url, request, { headers: reqHeader }).pipe(take(1));
    }
}
