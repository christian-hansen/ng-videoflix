import { Routes } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { VideosComponent } from './components/videos/videos.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';

export const routes: Routes = [
    { path: '', component: StartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register-success', component: RegisterSuccessComponent },
    { path: 'videos', component: VideosComponent },
    { path: 'imprint', component: VideosComponent },
    { path: 'privacy', component: VideosComponent },
];
