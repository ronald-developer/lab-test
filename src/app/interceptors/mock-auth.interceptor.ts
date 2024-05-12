import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs/operators';
import { ErrorMessagingService } from "../core/services/error-messaging.service";

@Injectable()
export class MockAuthInterceptor implements HttpInterceptor {
	constructor(private router: Router, private errorMessagingService: ErrorMessagingService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.headers.get('No-Auth') === "True") {
			const clonedreq = req.clone({
				method: 'GET',
				url: `${req.url}.json`
			});
			return next.handle(clonedreq).pipe(delay(3000));
			// return next.handle(req.clone());
		}

		if (localStorage.getItem('token') != null) {
			const clonedreq = req.clone({
				headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('token')),
				method: 'GET',
				url: `${req.url}.json`
			});

			return next.handle(clonedreq).pipe(tap(
				success => {
					this.errorMessagingService.clearMessage();
				},
				error => {
					if (error.status === 401) {
						this.router.navigate(['/login']);
					}
				}
			));

		}
		else {
			this.router.navigate(['/login']);
			return of();
		}
	}
}
