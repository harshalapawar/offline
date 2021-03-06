import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonApiService } from 'src/services/common-api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/services/error-handling.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.scss']
})
export class AddOffersComponent implements OnInit {

  allEvent: any = [];
  fileUpload: any;
  fileUpload2: any;
  companyName: any = [];
  loader: boolean;
  constructor(
    private commonApi: CommonApiService,
    private session: SessionStorageService,
    private router: Router,
    private _errorHandling: ErrorHandlingService
  ) { }

  addOffers = new FormGroup({
    name: new FormControl("", Validators.compose([Validators.required])),
    discription: new FormControl("", Validators.compose([Validators.required])),
    organizedBy: new FormControl("", Validators.compose([Validators.required])),
    startDate: new FormControl("", Validators.compose([Validators.required])),
    endDate: new FormControl("", Validators.compose([Validators.required])),
    reward: new FormControl("", Validators.compose([Validators.required])),
    price: new FormControl("", Validators.compose([Validators.required])),
    typeId: new FormControl("", Validators.compose([Validators.required])),
    regStartDate: new FormControl("", Validators.compose([Validators.required])),
    regEndDate: new FormControl("", Validators.compose([Validators.required])),
    file: new FormControl("", Validators.compose([Validators.required])),
    file2: new FormControl("", Validators.compose([Validators.required])),
    addressLine1: new FormControl("", Validators.compose([Validators.required])),
    addressLine2: new FormControl("", Validators.compose([Validators.required])),
    city: new FormControl("", Validators.compose([Validators.required])),
    state: new FormControl("", Validators.compose([Validators.required])),
    postalCode: new FormControl("", Validators.compose([Validators.required])),
    dicountedPrice: new FormControl("", Validators.compose([Validators.required])),
    // imageUrl: new FormControl("", Validators.compose([Validators.required])),
    paymentType: new FormControl("", Validators.compose([Validators.required])),
    venueName: new FormControl("", Validators.compose([Validators.required])),
    userId: new FormControl("", Validators.compose([Validators.required])),
    quantity: new FormControl("", Validators.compose([Validators.required])),
    commissionPercentage: new FormControl("", Validators.compose([Validators.required])),
    gstPercentage: new FormControl("", Validators.compose([Validators.required]))
  });

  ngOnInit() {
    this.EventType();
    this.getCompanyList();
  }

  EventType() {
    this.commonApi.getEventType().subscribe(res => {
      this.allEvent = res["trace"];
      console.log(this.allEvent);

    });
  }

  isValidOffer() {
    Object.keys(this.addOffers.controls).forEach(field => {
      let control = this.addOffers.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  fileUploader(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload = elem.files[0];
    }
  }


  fileUploader2(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload2 = elem.files[0];
    }
  }

  getCompanyList() {
    this.commonApi.getCompanyListForEventOffer().subscribe(res => {
      this.companyName = res['trace'];

    });
  }

  async addOffersSubmit({ value, valid }: { value; valid: boolean }) {
    console.log("enter");


    this.isValidOffer();

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
    formData.append("regStartDate", value.regStartDate);
    formData.append("dicountedPrice", value.dicountedPrice)
    formData.append("regEndDate", value.regEndDate);
    formData.append("address.addressLine1", value.addressLine1);
    formData.append("address.addressLine2", value.addressLine2);
    formData.append("address.city", value.city);
    formData.append("address.state", value.state);
    formData.append("address.postalCode", value.postalCode);
    formData.append("userId", value.userId);
    formData.append("active", "true");
    //formData.append("imageUrl", value.imageUrl);
    formData.append("paymentType", value.paymentType);
    formData.append("venueName", value.venueName);
    // formData.append("userId", value.userId);
    formData.append("quantity", value.quantity);
    formData.append("file2", this.fileUpload2);
    formData.append("commissionPercentage", value.commissionPercentage);
    formData.append("gstPercentage", value.gstPercentage);
    if (valid) {
      this.loader = true;
      try {
        this.commonApi.addOffer(formData).subscribe(res => {
          this.loader = false;
          if (res) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Offers Added Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['offers']);
            this.addOffers.reset();

          } else {
          }
        }, error => {
          this.loader = false;
          this._errorHandling.errorresponse(error);
        }
        );
      } catch (error) {
        this.loader = false;
        this._errorHandling.errorresponse(error);
      }
    } else {
    }
  }



}
