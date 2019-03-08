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
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventTypeComponent } from './event-type/event-type.component';
import { AddEventTypeComponent } from './add-event-type/add-event-type.component';
import { OffersComponent } from './offers/offers.component';
import { AddOffersComponent } from './add-offers/add-offers.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  { path: "", component: CompanyLoginComponent },
  { path: "super-admin-login", component: SuperadminLoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UsersComponent },
  { path: "company", component: CompanyComponent },
  { path: "event", component: EventComponent },
  { path: "add-event", component: AddEventComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'account-ledgers', component: AccountLedgersComponent },
  { path: 'company-details', component: CompanyDetailsComponent },
  { path: 'event-details', component: EventDetailsComponent },
  { path: 'event-type', component: EventTypeComponent },
  { path: 'add-event-type', component: AddEventTypeComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'add-offers', component: AddOffersComponent },
  { path: 'offer-details', component: OfferDetailsComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'order-history/:id', component: OrderHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
