import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/services/error-handling.service';
import { SessionStorageService } from 'ngx-webstorage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    addressLine1: new FormControl("", Validators.compose([Validators.required])),
    addressLine2: new FormControl("", Validators.compose([Validators.required])),
    city: new FormControl("", Validators.compose([Validators.required])),
    state: new FormControl("", Validators.compose([Validators.required])),
    postalCode: new FormControl("", Validators.compose([Validators.required])),
    paymentType: new FormControl("", Validators.compose([Validators.required])),

  });

  ngOnInit() {
    this.offerId = this.session.retrieve('offerId');
    this.getSingleOfferDetails(this.offerId);
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
    this.updateOffers.get('price').setValue(this.data.price);
    this.updateOffers.get('regStartDate').setValue(this.data.regStartDate);
    this.updateOffers.get('regEndDate').setValue(this.data.regEndDate);
    this.updateOffers.get('dicountedPrice').setValue(this.data.dicountedPrice);
    this.updateOffers.get('status').setValue(this.data.status);
    this.updateOffers.get('name').setValue(this.data.name);
    this.updateOffers.get('file').setValue(this.data.file);
    this.updateOffers.get('addressLine1').setValue(this.data.address.addressLine1);
    this.updateOffers.get('addressLine2').setValue(this.data.address.addressLine2);
    this.updateOffers.get('city').setValue(this.data.address.city);
    this.updateOffers.get('state').setValue(this.data.address.state);
    this.updateOffers.get('postalCode').setValue(this.data.address.postalCode);
    this.updateOffers.get('paymentType').setValue(this.data.paymentType);
  }

  fileUploader(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload = elem.files[0];
    }
  }


  async updateOffersSubmit({ value, valid }: { value; valid: boolean }) {

    let formData: FormData = new FormData();
    formData.append("file", this.fileUpload);
    formData.append("name", value.name);
    formData.append("discription", value.discription);
    formData.append("organizedBy", value.organizedBy);
    formData.append("startDate", value.startDate);
    formData.append("endDate", value.endDate);
    formData.append("reward", value.reward);
    formData.append("price", value.price);
    formData.append("typeId", value.typeId);
    formData.append("address.addressLine1", value.addressLine1);
    formData.append("address.addressLine2", value.addressLine2);
    formData.append("address.city", value.city);
    formData.append("address.state", value.state);
    formData.append("address.postalCode", value.postalCode);
    formData.append("userId", this.session.retrieve('id'));
    formData.append("id", this.data.id);
    formData.append("active", "true");
    formData.append("regStartDate", value.regStartDate);
    formData.append("regEndDate", value.regEndDate);
    formData.append("paymentType", value.paymentType);
    formData.append("dicountedPrice", value.dicountedPrice);


    this.commonApi.updateOffer(formData).subscribe(res => {
      console.log(res);
      if (res) {
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
      Swal.fire({
        position: 'center',
        type: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    });
  } catch(error) {
    Swal.fire({
      position: 'center',
      type: 'error',
      title: error.error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }

}
