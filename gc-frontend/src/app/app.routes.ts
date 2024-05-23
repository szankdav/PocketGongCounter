import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { CounterComponent } from './features/counter/counter.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: "home", component: CounterComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: '**', component: PageNotFoundComponent },
];
