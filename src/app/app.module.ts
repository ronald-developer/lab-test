import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ClipboardModule } from 'ngx-clipboard';
import { apiLabTestsUrl, API_URL_CONFIG, API_SETUP_URL_CONFIG, apiSetupUrl, API_DASHBOARD_URL_CONFIG, apiDashboardUrl, API_URL_BACKEND_CONFIG, API_URL_AUTH_CONFIG, apiAuthUrl } from './core/injection-tokens/api-tokens';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './modules/auth/services/auth.service';
import { BlockUiComponent } from './shared/components/ui-block-template/block-ui.component';
import { BlockUiModule } from './shared/components/ui-block-template/block-ui.module';
import { apiBackendUrl, BACKEND_URL_CONFIG } from './core/injection-tokens/backend-token';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MockAuthInterceptor } from './interceptors/mock-auth.interceptor';

function appInitializer(authService: AuthService) {
	return () => {
		return new Promise<void>((resolve) => {
			authService.getUserByToken().subscribe().add(resolve);
		});
	};
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ClipboardModule,
		AppRoutingModule,
		InlineSVGModule.forRoot(),
		NgbModule,
		CoreModule,
		CommonModule,
		BlockUiModule,
		BlockUIModule.forRoot({
			template: BlockUiComponent
		}),
		ToastrModule.forRoot()
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: environment.mockMode ? MockAuthInterceptor : AuthInterceptor, multi: true },
		{ provide: API_URL_CONFIG, useValue: { composeUrl: (endpoint: string, token: string = apiLabTestsUrl) => `${token}/${endpoint}` } },
		{ provide: API_URL_BACKEND_CONFIG, useValue: { composeUrl: (endpoint: string, token: string = apiBackendUrl) => `${token}/${endpoint}` } },
		{ provide: API_URL_AUTH_CONFIG, useValue: { composeUrl: (endpoint: string, token: string = apiAuthUrl) => `${token}/${endpoint}` } },
		{ provide: API_SETUP_URL_CONFIG, useValue: { composeUrl: (endpoint: string, token: string = apiSetupUrl) => `${token}/${endpoint}` } },
		{ provide: API_DASHBOARD_URL_CONFIG, useValue: { composeUrl: (endpoint: string, token: string = apiDashboardUrl) => `${token}/${endpoint}` } },
		{ provide: BACKEND_URL_CONFIG, useValue: { composeUrl: (endpoint: string, token: string = apiBackendUrl) => `${token}/${endpoint}` } },
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializer,
			multi: true,
			deps: [AuthService],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
