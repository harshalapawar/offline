import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { CommonApiService } from "src/services/common-api.service";
import { SessionStorageService } from "ngx-webstorage";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/services/error-handling.service';

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.scss"]
})
export class AddEventComponent implements OnInit {
  allEvent: any = [];
  fileUpload: any;
  companyName: any = [];
  constructor(
    private commonApi: CommonApiService,
    private session: SessionStorageService,
    private router: Router,
    private _errorHandling: ErrorHandlingService
  ) { }

  email_regex = "^($|[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+)$";
  addEvent = new FormGroup({
    name: new FormControl("", Validators.compose([Validators.required])),
    discription: new FormControl("", Validators.compose([Validators.required])),
    organizedBy: new FormControl("", Validators.compose([Validators.required])),
    regStartDate: new FormControl("", Validators.compose([Validators.required])),
    regEndDate: new FormControl("", Validators.compose([Validators.required])),
    reward: new FormControl("", Validators.compose([Validators.required])),
    price: new FormControl("", Validators.compose([Validators.required])),
    typeId: new FormControl("", Validators.compose([Validators.required])),
    file: new FormControl("", Validators.compose([Validators.required])),
    addressLine1: new FormControl("", Validators.compose([Validators.required])),
    addressLine2: new FormControl("", Validators.compose([Validators.required])),
    city: new FormControl("", Validators.compose([Validators.required])),
    state: new FormControl("", Validators.compose([Validators.required])),
    postalCode: new FormControl("", Validators.compose([Validators.required])),
    startDate: new FormControl("", Validators.compose([Validators.required])),
    endDate: new FormControl("", Validators.compose([Validators.required])),
    duration: new FormControl("", Validators.compose([Validators.required])),
    quantity: new FormControl("", Validators.compose([Validators.required])),
    venueName: new FormControl("", Validators.compose([Validators.required])),
    userId: new FormControl("", Validators.compose([Validators.required])),
    dicountedPrice: new FormControl("", Validators.compose([Validators.required])),
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
    });
  }
  getCompanyList() {
    this.commonApi.getCompanyListForEventOffer().subscribe(res => {
      this.companyName = res['trace'];

    });
  }
  fileUploader(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload = elem.files[0];
    }
  }

  isValidEvent() {
    Object.keys(this.addEvent.controls).forEach(field => {
      let control = this.addEvent.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }


  async addEventSubmit({ value, valid }: { value; valid: boolean }) {

    this.isValidEvent();

    let formData: FormData = new FormData();
    formData.append("active", "true");
    formData.append("file", this.fileUpload);
    formData.append("name", value.name);
    formData.append("discription", value.discription);
    formData.append("organizedBy", value.organizedBy);
    formData.append("regStartDate", value.regStartDate);
    formData.append("regEndDate", value.regEndDate);
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
    formData.append("userId", value.userId);
    formData.append("dicountedPrice", value.dicountedPrice);
    formData.append("venueName", value.venueName);
    formData.append("commissionPercentage", value.commissionPercentage);
    formData.append("gstPercentage", value.gstPercentage);
    formData.append("quantity", value.quantity);
    formData.append("duration", value.duration);

    if (valid) {
      try {
        this.commonApi.addEvent(formData).subscribe(res => {
          console.log(res);

          if (res) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Event Added Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['event']);
            this.addEvent.reset();

          } else {

          }

        }, error => {
          this._errorHandling.errorresponse(error);
        }
        );
      } catch (error) {
        this._errorHandling.errorresponse(error);
      }
    } else {
    }
  }
}
