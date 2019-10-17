import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../guards/auth-guard.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.Interceptor';
import { DepositComponent } from '../deposit/deposit.component';
import { TransferComponent } from '../transfer/transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, TabsModule, ModalModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    DepositComponent,
    TransferComponent,
    PhotoEditorComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    DataTablesModule,
    NgxGalleryModule,
    FileUploadModule,

  ],
  providers: [AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class DashboardModule { }
