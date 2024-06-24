import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CounterComponent } from './features/counter/counter.component';
import { authGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: "home", component: CounterComponent, canActivate: [authGuard], title: 'Home' },
    { path: "login", component: LoginComponent, title: 'Login' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent, title: 'Error 404!' },
];
