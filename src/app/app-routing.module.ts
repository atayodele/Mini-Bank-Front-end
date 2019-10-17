import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: "home", component: HomeComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: '**', redirectTo: '/dashboard' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
