import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, from, Observable, of, take } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { AuthApiService } from 'src/app/api-services/auth-api/auth-api.service';
import { PostLoginRequest } from 'src/app/api-services/auth-api/req/post-login-request';
import { UserModel } from '../models/user.model';
import { ApiResult } from './../../../api-services/api.result';
import { PostLoginResponse } from './../../../api-services/auth-api/responses/post-login-response';

export type UserType = UserModel | undefined;

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    private jwtHelper = new JwtHelperService();
    private user$ = new BehaviorSubject<UserModel | null>(null);
    private activeLogoutTimer: any;
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    constructor(
        private authApiService: AuthApiService,
        private router: Router
    ) {
    }

    ngOnDestroy() {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
    }

    public login(email: string, password: string) {
        this.isLoadingSubject.next(true);
        const request = new PostLoginRequest(email, password);
        return this.authApiService.login(request).pipe(

            map((data: ApiResult<PostLoginResponse>) => {
                return data.response.token;
            }),
            take(1),
            catchError(() => of("")),
            finalize(()=>this.isLoadingSubject.next(false)))
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem('token');

        if (!token || token === '') {
            return false;
        }

        const currentDateTime = new Date().getTime() / 1000;
        const result = this.convertTokenDataToUser(token);
        if (currentDateTime >= result.expiresAt) {
            return false;
        }

        return true;

    }

    public roleMatch(allowedRoles: string[], userRoles: string[]): boolean {
        if (!userRoles) {
            return false;
        }

        return allowedRoles.some(x => userRoles.some(y => y == x));
    }

    public getUserRoles(): string[] {
        const token = localStorage.getItem('token');
        const user: UserModel = this.convertTokenDataToUser(token);
        if (user && user.roles) {
            return [...user.roles];
        }
        return [];
    }

    private convertTokenDataToUser(token: any): UserModel {
        const userObj = this.jwtHelper.decodeToken(token) as any;

        const result = new UserModel();
        result.setUser(userObj);

        return result;
    }

    private getCurrentUser(): UserModel | null {
        if (!this.token) { return null; }

        const result = this.convertTokenDataToUser(this.token);
        return result;

    }

    public logOut() {
        if (this.activeLogoutTimer) {
            clearTimeout(this.activeLogoutTimer);
        }
        this.user$.next(null);

        localStorage.removeItem('token');
        console.log('AuthService logOut navigating to login');
        this.router.navigate(['/', 'auth', 'login']);
    }

    get user() {
        return this.user$.asObservable().pipe(take(1));
    }

    autoLogin() {
        // if we dont have a token in local storage exit now
        if (!this.token) {
            return of(false);
        }
        return from(this.token).pipe(
            map(token => {
                // or if token has expired
                const user = this.getCurrentUser();
                if (!user || user?.tokenExpired) {
                    return null;
                }
                return user;
            }),
            tap(user => {
                if (user) {
                    this.user$.next(user);
                }
            }),
            map(user => {
                return !!user;
            })
        );
    }

    private get token() {
        const result = localStorage.getItem('token');
        return result;
    }

    private set token(value: string | null) {
        if (!value) {
            this.logOut();
        }
        localStorage.setItem('token', value ?? '');
    }

    public setUserData(token: string) {
        this.token = token;
        const user = this.getCurrentUser();
        this.user$.next(user);
    }

    getUserByToken(): Observable<UserModel | undefined> {
        const auth = this.getCurrentUser();
        if (!auth || !auth.authToken) {
            return of(undefined);
        }

        return of(auth);
    }
}
