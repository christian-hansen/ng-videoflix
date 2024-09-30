import { Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { VideosComponent } from './components/videos/videos.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { StaticImprintComponent } from './components/static-imprint/static-imprint.component';
import { ActivateComponent } from './components/activate/activate.component';
import { ForgotUsernameComponent } from './components/forgot-username/forgot-username.component';

export const routes: Routes = [
    { path: '', component: StartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register-success', component: RegisterSuccessComponent },
    { path: 'activate/:id/:token', component: ActivateComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'forgot-username', component: ForgotUsernameComponent },
    { path: 'reset-password/:id/:token', component: ResetPasswordComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'imprint', component: StaticImprintComponent },
    { path: 'privacy', component: StaticImprintComponent },
];
