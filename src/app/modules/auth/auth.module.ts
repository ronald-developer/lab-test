import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
        AuthComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BlockUIModule
    ],
})
export class AuthModule { }
