import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CommonApiService {
  constructor(private http: HttpClient) { }


  overlayFlag: boolean = false;

  // BaseUrl: any = "http://35.178.250.132:7070/api/";
  BaseUrl: any = "http://206.189.143.244:7070/api/";

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
  singleOfferDetailsUrl: any = this.BaseUrl + "offers/"
  offersList: any = this.BaseUrl + "offers";
  addOfferUrl: any = this.BaseUrl + "offers";
  updateCompanyUrl: any = this.BaseUrl + "company";
  updateEventUrl: any = this.BaseUrl + 'events';
  updateOfferUrl: any = this.BaseUrl + 'offers';
  getAllOrderHistory: any = this.BaseUrl + 'order-history/items/';
  getUserOrderHistory: any = this.BaseUrl + 'order-history/';
  getItemsOrderHistory: any = this.BaseUrl + 'order-history/items/';
  fileUpdateUrl: any = this.BaseUrl + 'uploadFile';
  offerActiveFlag: any = this.BaseUrl + 'offers/active/'
  eventActiveFlag: any = this.BaseUrl + 'events/active/'


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

  // GET SINGLE OFFER DETAILS
  getSingleOffer(offerId) {
    return this.http.get(`${this.singleOfferDetailsUrl}${offerId}`);
  }

  // ADD OFFERS
  addOffer(value) {
    return this.http.post(this.addOfferUrl, value);
  }


  //UPDATE COMPANY DETAILS
  updateCompany(value) {
    return this.http.put(this.updateCompanyUrl, value);
  }

  // UPDATE EVENT
  updateEvent(value) {
    return this.http.put(this.updateEventUrl, value)

  }

  // UPDATE OFFER
  updateOffer(value) {
    return this.http.put(this.updateOfferUrl, value)

  }

  // GET ALL ORDER HISTORY
  getAllOrderHistoryReq() {
    return this.http.get(this.getAllOrderHistory);
  }

  // GET ALL USERS ORDER HISTORY
  getUserOrderHistoryReq(userId) {
    return this.http.get(`${this.getUserOrderHistory}${userId}`);
  }

  // GET ALL EVENT ORDER HISTORY
  getEventOrderHistoryReq(eventId) {
    return this.http.get(`${this.getItemsOrderHistory}${eventId}`);
  }

  // GET ALL OFFERS ORDER HISTORY
  getOffersOrderHistoryReq(offerId) {
    return this.http.get(`${this.getItemsOrderHistory}${offerId}`);
  }

  // ADD FILE
  addfile(value) {
    return this.http.post(this.fileUpdateUrl, value);
  }

  // GET OFFER ACTIVE FLAG
  getOfferActive(id, flag) {
    return this.http.get(`${this.offerActiveFlag}${id}/${flag}`)
  }

  // GET OFFER ACTIVE FLAG
  getEventActive(id, flag) {
    return this.http.get(`${this.eventActiveFlag}${id}/${flag}`)
  }
}
