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
  getEventTypeUrl: any = this.BaseUrl + "event-types";
  addCompanyUrl: any = this.BaseUrl + "company/register";
  accountLedgerUrl: any = this.BaseUrl + "account-ledgers/to/"

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
    return this.http.get(this.getEventTypeUrl);
  }

  // ADD COMPANY
  addCompany(value) {
    return this.http.post(this.addCompanyUrl, value);
  }

  // SESSION LIST
  accountLedgerList(userIdTo) {
    return this.http.get(`${this.accountLedgerUrl}${userIdTo}`);
  }
}
