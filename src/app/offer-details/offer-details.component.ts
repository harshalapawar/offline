import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/services/error-handling.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import $ from 'jquery';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {

  data: any = [];
  offerId: any;
  valid: boolean = true;
  flag: boolean = true;
  fileUpload: any;
  allEvent: any = [];
  companyName: any = [];
  paymentTypeFlag: boolean;
  fileUpload2: any;
  imgUrl: any;
  detailPageImage: any;
  loader: boolean;
  constructor(private commonApi: CommonApiService, private router: Router, private _errorHandling: ErrorHandlingService, public session: SessionStorageService) { }

  updateOffers = new FormGroup({
    discription: new FormControl("", Validators.compose([Validators.required])),
    typeId: new FormControl("", Validators.compose([Validators.required])),
    organizedBy: new FormControl("", Validators.compose([Validators.required])),
    startDate: new FormControl("", Validators.compose([Validators.required])),
    endDate: new FormControl("", Validators.compose([Validators.required])),
    reward: new FormControl("", Validators.compose([Validators.required])),
    imageUrl: new FormControl("", Validators.compose([Validators.required])),
    price: new FormControl("", Validators.compose([Validators.required])),
    regStartDate: new FormControl("", Validators.compose([Validators.required])),
    regEndDate: new FormControl("", Validators.compose([Validators.required])),
    dicountedPrice: new FormControl("", Validators.compose([Validators.required])),
    status: new FormControl("", Validators.compose([Validators.required])),
    name: new FormControl("", Validators.compose([Validators.required])),
    file: new FormControl("", Validators.compose([Validators.required])),
    file2: new FormControl("", Validators.compose([Validators.required])),
    addressLine1: new FormControl("", Validators.compose([Validators.required])),
    addressLine2: new FormControl("", Validators.compose([Validators.required])),
    city: new FormControl("", Validators.compose([Validators.required])),
    state: new FormControl("", Validators.compose([Validators.required])),
    postalCode: new FormControl("", Validators.compose([Validators.required])),
    paymentType: new FormControl("", Validators.compose([Validators.required])),
    quantity: new FormControl("", Validators.compose([Validators.required])),
    venueName: new FormControl("", Validators.compose([Validators.required])),
    userId: new FormControl("", Validators.compose([Validators.required])),
    gstPercentage: new FormControl("", Validators.compose([Validators.required])),
    commissionPercentage: new FormControl("", Validators.compose([Validators.required]))

  });

  ngOnInit() {
    this.offerId = this.session.retrieve('offerId');
    this.getSingleOfferDetails(this.offerId);
    this.EventType();
    this.getCompanyList();
  }

  editOffer() {
    this.valid = false;
    this.flag = false;
  }

  getSingleOfferDetails(offerId) {
    this.commonApi.getSingleOffer(this.offerId).subscribe(res => {
      this.data = res['trace'];
      this.setValue();
    });
  }

  setValue() {
    this.updateOffers.get('discription').setValue(this.data.discription);
    this.updateOffers.get('typeId').setValue(this.data.typeId);
    this.updateOffers.get('organizedBy').setValue(this.data.organizedBy);
    this.updateOffers.get('startDate').setValue(this.data.startDate);
    this.updateOffers.get('endDate').setValue(this.data.endDate);
    this.updateOffers.get('reward').setValue(this.data.reward);
    this.updateOffers.get('imageUrl').setValue(this.data.imageUrl);
    // this.updateOffers.get('price').setValue(this.data.price);
    this.updateOffers.get('regStartDate').setValue(this.data.regStartDate);
    this.updateOffers.get('regEndDate').setValue(this.data.regEndDate);
    // this.updateOffers.get('dicountedPrice').setValue(this.data.dicountedPrice);
    this.updateOffers.get('status').setValue(this.data.status);
    this.updateOffers.get('name').setValue(this.data.name);
    this.updateOffers.get('file').setValue(this.data.file);
    this.updateOffers.get('file2').setValue(this.data.file2);
    this.updateOffers.get('addressLine1').setValue(this.data.address.addressLine1);
    this.updateOffers.get('addressLine2').setValue(this.data.address.addressLine2);
    this.updateOffers.get('city').setValue(this.data.address.city);
    this.updateOffers.get('state').setValue(this.data.address.state);
    this.updateOffers.get('postalCode').setValue(this.data.address.postalCode);
    this.updateOffers.get('paymentType').setValue(this.data.paymentType);
    this.updateOffers.get('userId').setValue(this.data.userId);
    this.updateOffers.get('venueName').setValue(this.data.venueName);
    this.updateOffers.get('quantity').setValue(this.data.quantity);

    if (this.data.paymentType == "FREE") {
      this.paymentTypeFlag = true;
      this.updateOffers.get('dicountedPrice').setValue(0);
      this.updateOffers.get('price').setValue(0);
    } else {
      this.paymentTypeFlag = false;
      this.updateOffers.get('dicountedPrice').setValue(this.data.dicountedPrice);
      this.updateOffers.get('price').setValue(this.data.price);
    }

    this.updateOffers.get('commissionPercentage').setValue(this.data.commissionPercentage);
    this.updateOffers.get('gstPercentage').setValue(this.data.gstPercentage);

  }
  fileUploader(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload = elem.files[0];

      let formData: FormData = new FormData();
      formData.append("file", this.fileUpload);
  
      this.commonApi.sliderImageFileUpload(formData).subscribe(res=> {
      this.imgUrl = res['trace']['imageUrl'];
      }); 
    }
  }
  fileUploader2(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload2 = elem.files[0];

      let formData2: FormData = new FormData();
      console.log(formData2);
      
      formData2.append("file", this.fileUpload2);
  
      this.commonApi.sliderImageFileUpload(formData2).subscribe(res=> {
      this.detailPageImage = res['trace']['imageUrl'];
      });
    }
  }

  EventType() {
    this.commonApi.getEventType().subscribe(res => {
      this.allEvent = res["trace"];
    });
  }
  getCompanyList() {
    this.commonApi.getCompanyListForEventOffer().subscribe(res => {
      this.companyName = res['trace'];

    });
  }

  onChange() {
    if (this.data.paymentType == "FREE") {
      this.paymentTypeFlag = true;
    }
    else {
      this.paymentTypeFlag = false;
    }
  }

  async updateOffersSubmit({ value, valid }: { value; valid: boolean }) {
    console.log('value',value);
    let req_data = {
      "active": true,
      "address": {
        "addressLine1": value.addressLine1,
        "addressLine2": value.addressLine2,
        "city": value.city,
        "postalCode": value.postalCode,
        "state": value.state
      },
      "dicountedPrice": value.dicountedPrice,
      "discription": value.discription,
      "endDate": value.endDate,
      "id": this.data.id,
      "imageUrl": this.imgUrl,
      "detailPageImage": this.detailPageImage,
      "name": value.name,
      "organizedBy": value.organizedBy,
      "price": value.price,
      "regEndDate": value.regEndDate,
      "regStartDate": value.regStartDate,
      "reward": value.reward,
      "startDate": value.startDate,
      "status": "true",
      "typeId": value.typeId,
      "paymentType": value.paymentType,
      "userId": value.userId,
      "venueName": value.venueName,
      "quantity": value.quantity,
      "commissionPercentage": value.commissionPercentage,
      "gstPercentage": value.gstPercentage

    }

    this.commonApi.updateOffer(req_data).subscribe(res => {
      this.loader = true;
      if (res) {
        this.loader = false;
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Offer Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['offers']);
      } else { }
    }, error => {
      this.loader = false;
      Swal.fire({
        position: 'center',
        type: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    });

  } catch(error) {
    this.loader = false;
    Swal.fire({
      position: 'center',
      type: 'error',
      title: error.error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }


  updateFile() {


  }

}
