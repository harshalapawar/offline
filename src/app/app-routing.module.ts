import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { CompanyLoginComponent } from "./company-login/company-login.component";
import { SuperadminLoginComponent } from "./superadmin-login/superadmin-login.component";
import { UsersComponent } from "./users/users.component";
import { CompanyComponent } from "./company/company.component";
import { EventComponent } from "./event/event.component";
import { AddEventComponent } from './add-event/add-event.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AccountLedgersComponent } from './account-ledgers/account-ledgers.component';

const routes: Routes = [
  { path: "", component: CompanyLoginComponent },
  { path: "super-admin-login", component: SuperadminLoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UsersComponent },
  { path: "company", component: CompanyComponent },
  { path: "event", component: EventComponent },
  { path: "add-event", component: AddEventComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'account-ledgers', component: AccountLedgersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
