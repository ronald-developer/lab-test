
import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiTokenConfig } from "../models/api-token-config";
export const apiBackendUrl = `${environment.apiUrl}/api/backend`;
export const BACKEND_URL_CONFIG = new InjectionToken<ApiTokenConfig>('backend');
