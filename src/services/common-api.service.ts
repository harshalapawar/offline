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
  eventListUrl: any = this.BaseUrl + "admin/events";
  superAdminLoginUrl: any = this.BaseUrl + "login";
  addEventUrl: any = this.BaseUrl + "events";
  eventTypeUrl: any = this.BaseUrl + "event-types";
  addCompanyUrl: any = this.BaseUrl + "company/register";
  accountLedgerUrl: any = this.BaseUrl + "account-ledgers/to/";
  singleCompanyDetailsUrl: any = this.BaseUrl + "company/"
  singleEventDetailsUrl: any = this.BaseUrl + "events/"
  singleOfferDetailsUrl: any = this.BaseUrl + "offers/"
  offersList: any = this.BaseUrl + "admin/offers";
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

  companyListForEventOffer: any = this.BaseUrl + 'companies-list'

  dashboard: any = this.BaseUrl + 'dashborad';
  sliderImage: any = this.BaseUrl + 'slider-image'


  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'ClientId': 'BcK2eUM84Xm+BEAFHcvzmbbWoss8bcZXkbP41YqO',
      'ClientSecret': 'b4b249f78700542fff5171b9d46e8445'
    })
  };


  //USER LIST
  userList() {
    return this.http.get(this.userListUrl, this.httpOptions);
  }

  // COMPANY LIST
  companyList() {
    return this.http.get(this.companyListUrl, this.httpOptions);
  }

  // EVENT LIST
  eventList() {
    return this.http.get(this.eventListUrl, this.httpOptions);
  }

  // SUPER ADMIN LOGIN
  superAdminLogin(value) {
    return this.http.post(this.superAdminLoginUrl, value, this.httpOptions);
  }

  // ADD EVENT
  addEvent(value) {
    return this.http.post(this.addEventUrl, value, this.httpOptions);
  }

  // GET EVENT TYPE
  getEventType() {
    return this.http.get(this.eventTypeUrl, this.httpOptions);
  }

  // POST EVENT TYPE
  addEventType(value) {
    return this.http.post(this.eventTypeUrl, value, this.httpOptions);
  }

  // ADD COMPANY
  addCompany(value) {
    return this.http.post(this.addCompanyUrl, value, this.httpOptions);
  }

  // SESSION LIST
  accountLedgerList(userIdTo) {
    return this.http.get(`${this.accountLedgerUrl}${userIdTo}`, this.httpOptions);
  }

  // COMPANY SINGLE DETAILS
  getSingleCompany(companyId) {
    return this.http.get(`${this.singleCompanyDetailsUrl}${companyId}`, this.httpOptions);
  }

  //  EVENT SINGLE DETAILS
  getSingleEvent(eventId) {
    return this.http.get(`${this.singleEventDetailsUrl}${eventId}`, this.httpOptions);
  }

  //GET OFFER LIST
  getOffersList() {
    return this.http.get(this.offersList)
  }

  // GET SINGLE OFFER DETAILS
  getSingleOffer(offerId) {
    return this.http.get(`${this.singleOfferDetailsUrl}${offerId}`, this.httpOptions);
  }

  // ADD OFFERS
  addOffer(value) {
    return this.http.post(this.addOfferUrl, value, this.httpOptions);
  }


  //UPDATE COMPANY DETAILS
  updateCompany(value) {
    return this.http.put(this.updateCompanyUrl, value, this.httpOptions);
  }

  // UPDATE EVENT
  updateEvent(value) {
    return this.http.put(this.updateEventUrl, value, this.httpOptions)

  }

  // UPDATE OFFER
  updateOffer(value) {
    return this.http.put(this.updateOfferUrl, value, this.httpOptions)

  }

  // GET ALL ORDER HISTORY
  getAllOrderHistoryReq() {
    return this.http.get(this.getAllOrderHistory, this.httpOptions);
  }

  // GET ALL USERS ORDER HISTORY
  getUserOrderHistoryReq(userId) {
    return this.http.get(`${this.getUserOrderHistory}${userId}`, this.httpOptions);
  }

  // GET ALL EVENT ORDER HISTORY
  getEventOrderHistoryReq(eventId) {
    return this.http.get(`${this.getItemsOrderHistory}${eventId}`, this.httpOptions);
  }

  // GET ALL OFFERS ORDER HISTORY
  getOffersOrderHistoryReq(offerId) {
    return this.http.get(`${this.getItemsOrderHistory}${offerId}`, this.httpOptions);
  }

  // ADD FILE
  addfile(value) {
    return this.http.post(this.fileUpdateUrl, value, this.httpOptions);
  }

  // GET OFFER ACTIVE FLAG
  getOfferActive(id, flag) {
    return this.http.get(`${this.offerActiveFlag}${id}/${flag}`, this.httpOptions)
  }

  // GET OFFER ACTIVE FLAG
  getEventActive(id, flag) {
    return this.http.get(`${this.eventActiveFlag}${id}/${flag}`, this.httpOptions)
  }

  // GET COMPANY LIST FOR OFFER AND EVENT
  getCompanyListForEventOffer() {
    return this.http.get(this.companyListForEventOffer, this.httpOptions);
  }

  getDashboard() {
    return this.http.get(this.dashboard, this.httpOptions);
  }

  // Slider Image
  silderImageGet() {
    return this.http.get(this.sliderImage, this.httpOptions);
  }

  sliderImageFileUpload(value) {
    return this.http.post(this.fileUpdateUrl, value);
  }
}
