import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MemberEditResolver } from '../_resolver/member-edit.resolver';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuardService } from '../guards/auth-guard.guard';
import { DepositComponent } from '../deposit/deposit.component';
import { TransferComponent } from '../transfer/transfer.component';


const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'deposit', component: DepositComponent, canActivate: [AuthGuardService] },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuardService] },
   { path: 'profile', component: ProfileComponent,canActivate: [AuthGuardService], resolve: {user: MemberEditResolver} },
  // { path: ':id', component: ProductDetailsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
