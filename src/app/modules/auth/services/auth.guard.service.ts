import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.user.pipe(
            switchMap(user => {
                // if we can get the user from auth service
                // check if token is expired if not autoLogin.
                return this.authService.autoLogin().pipe(switchMap(loginSuccess => {
                    // if token is expired exit
                    if (!loginSuccess) {
                        return of(false);
                    } else {
                        // check for matching user roles if route is protected for certain roles
                        // if not protected authorise user
                        const allowedRoles = next.data['roles'] as Array<string>;
                        if (allowedRoles) {
                            const match = this.authService.roleMatch(allowedRoles, user?.roles ?? []);
                            return of(match);
                        } else {
                            return of(true);
                        }

                    }
                }));
            }),
            tap(isAuthenticated => {
                if (!isAuthenticated) {
                    this.authService.logOut();
                }

                return true;
            })
        );
    }
}

