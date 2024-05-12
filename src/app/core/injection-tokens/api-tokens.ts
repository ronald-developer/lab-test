
import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiTokenConfig } from "../models/api-token-config";
export const apiLabTestsUrl = `${environment.apiUrl}/api/labtests`;
export const apiBackendUrl = `${environment.apiUrl}/api/backend`;
export const apiAuthUrl = `${environment.apiUrl}/oauth`;
export const apiSetupUrl = `${environment.apiUrl}/api/setup`;
export const apiDashboardUrl = `${environment.apiUrl}/api/dashboard`;
export const API_URL_CONFIG = new InjectionToken<ApiTokenConfig>('api');
export const API_URL_BACKEND_CONFIG = new InjectionToken<ApiTokenConfig>('api-backend');
export const API_URL_AUTH_CONFIG = new InjectionToken<ApiTokenConfig>('api-auth');
export const API_SETUP_URL_CONFIG = new InjectionToken<ApiTokenConfig>('api-setup');
export const API_DASHBOARD_URL_CONFIG = new InjectionToken<ApiTokenConfig>('api-dashboard');
