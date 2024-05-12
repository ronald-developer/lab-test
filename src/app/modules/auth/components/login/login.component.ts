import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    // KeenThemes mock, change it to:

    loginForm: FormGroup;
    hasError: boolean;
    returnUrl: string;
    isLoading$ = this.authService.isLoading$;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        // redirect to home if already logged in
        this.authService.user.subscribe((user) => {
            if (user) {
                this.router.navigate(['/']);
            }
        });
    }

    ngOnInit(): void {
        this.initForm();
        // get return url from route parameters or default to '/'
        this.returnUrl =
            this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    initForm() {
        this.loginForm = this.fb.group({
            email: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
                ]),
            ],
            password: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ]),
            ],
        });
    }

    submit() {
        this.hasError = false;
        this.authService
            .login(this.f.email.value, this.f.password.value)
            .subscribe((url: string | null) => {
                if (url) {
                    this.authService.setUserData(url)
                    this.router.navigate([this.returnUrl]);
                } else {
                    this.hasError = true;
                }
            });
    }


}
