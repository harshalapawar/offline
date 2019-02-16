import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CommonApiService {
  constructor(private http: HttpClient) { }

  BaseUrl: any = "http://35.178.250.132:7070/api/";

  userListUrl: any = this.BaseUrl + "users";
  companyListUrl: any = this.BaseUrl + "companies"
  eventListUrl: any = this.BaseUrl + "events";
  superAdminLoginUrl: any = this.BaseUrl + "login";
  addEventUrl: any = this.BaseUrl + "events";
  eventTypeUrl: any = this.BaseUrl + "event-types";
  addCompanyUrl: any = this.BaseUrl + "company/register";
  accountLedgerUrl: any = this.BaseUrl + "account-ledgers/to/";
  singleCompanyDetailsUrl: any = this.BaseUrl + "company/"
  singleEventDetailsUrl: any = this.BaseUrl + "events/"
  offersList: any = this.BaseUrl + "offers";
  addOfferUrl: any = this.BaseUrl + "offers";
  updateCompanyUrl: any = this.BaseUrl + "company"

  //USER LIST
  userList() {
    return this.http.get(this.userListUrl);
  }

  // COMPANY LIST
  companyList() {
    return this.http.get(this.companyListUrl);
  }

  // EVENT LIST
  eventList() {
    return this.http.get(this.eventListUrl);
  }

  // SUPER ADMIN LOGIN
  superAdminLogin(value) {
    return this.http.post(this.superAdminLoginUrl, value);
  }

  // ADD EVENT
  addEvent(value) {
    return this.http.post(this.addEventUrl, value);
  }

  // GET EVENT TYPE
  getEventType() {
    return this.http.get(this.eventTypeUrl);
  }

  // POST EVENT TYPE
  addEventType(value) {
    return this.http.post(this.eventTypeUrl, value);
  }

  // ADD COMPANY
  addCompany(value) {
    return this.http.post(this.addCompanyUrl, value);
  }

  // SESSION LIST
  accountLedgerList(userIdTo) {
    return this.http.get(`${this.accountLedgerUrl}${userIdTo}`);
  }

  // COMPANY SINGLE DETAILS
  getSingleCompany(companyId) {
    return this.http.get(`${this.singleCompanyDetailsUrl}${companyId}`);
  }

  //  EVENT SINGLE DETAILS
  getSingleEvent(eventId) {
    return this.http.get(`${this.singleEventDetailsUrl}${eventId}`);
  }

  //GET OFFER LIST
  getOffersList() {
    return this.http.get(this.offersList)
  }

  // ADD OFFERS
  addOffer(value) {
    return this.http.post(this.addOfferUrl, value);
  }


  //UPDATE COMPANY DETAILS
  updateCompany(value) {
    return this.http.put(this.updateCompanyUrl, value);
  }

}
