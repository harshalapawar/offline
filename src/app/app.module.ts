import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { SuperadminLoginComponent } from './superadmin-login/superadmin-login.component';
import { UsersComponent } from './users/users.component';
import { CompanyComponent } from './company/company.component';
import { EventComponent } from './event/event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AccountLedgersComponent } from './account-ledgers/account-ledgers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    CompanyLoginComponent,
    SuperadminLoginComponent,
    UsersComponent,
    CompanyComponent,
    EventComponent,
    AddEventComponent,
    AddCompanyComponent,
    AccountLedgersComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }