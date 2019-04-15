import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { CommonApiService } from 'src/services/common-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  data: any;
  eventId: any;

  valid: boolean = true;
  flag: boolean = true;
  fileUpload: any;
  allEvent: any = [];
  companyName: any = [];
  constructor(private session: SessionStorageService, private router: Router, private commonApi: CommonApiService) { }

  updateEvent = new FormGroup({
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
    duration: new FormControl("", Validators.compose([Validators.required])),
    quantity: new FormControl("", Validators.compose([Validators.required])),
    venueName: new FormControl("", Validators.compose([Validators.required])),
    userId: new FormControl("", Validators.compose([Validators.required])),
    gstPercentage: new FormControl("", Validators.compose([Validators.required])),
    commissionPercentage: new FormControl("", Validators.compose([Validators.required]))
  });

  ngOnInit() {
    this.eventId = this.session.retrieve('eventId');
    this.getSingleEventDetails(this.eventId);
    this.EventType();
    this.getCompanyList();
  }

  editEvent() {
    this.valid = false;
    this.flag = false;
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


  getSingleEventDetails(eventId) {
    this.commonApi.getSingleEvent(this.eventId).subscribe(res => {
      // console.log(res);
      this.data = res['trace'];

      this.setValue();
    });
  }

  setValue() {
    this.updateEvent.get('discription').setValue(this.data.discription);
    this.updateEvent.get('typeId').setValue(this.data.typeId);
    this.updateEvent.get('organizedBy').setValue(this.data.organizedBy);
    this.updateEvent.get('startDate').setValue(this.data.startDate);
    this.updateEvent.get('endDate').setValue(this.data.endDate);
    this.updateEvent.get('reward').setValue(this.data.reward);
    this.updateEvent.get('imageUrl').setValue(this.data.imageUrl);
    this.updateEvent.get('price').setValue(this.data.price);
    this.updateEvent.get('regStartDate').setValue(this.data.regStartDate);
    this.updateEvent.get('regEndDate').setValue(this.data.regEndDate);
    this.updateEvent.get('dicountedPrice').setValue(this.data.dicountedPrice);
    this.updateEvent.get('status').setValue(this.data.status);
    this.updateEvent.get('name').setValue(this.data.name);
    this.updateEvent.get('userId').setValue(this.data.userId);
    this.updateEvent.get('duration').setValue(this.data.duration);
    this.updateEvent.get('quantity').setValue(this.data.quantity);
    this.updateEvent.get('file').setValue(this.data.file);
    this.updateEvent.get('addressLine1').setValue(this.data.address.addressLine1);
    this.updateEvent.get('addressLine2').setValue(this.data.address.addressLine2);
    this.updateEvent.get('city').setValue(this.data.address.city);
    this.updateEvent.get('state').setValue(this.data.address.state);
    this.updateEvent.get('postalCode').setValue(this.data.address.postalCode);
    this.updateEvent.get('state').setValue(this.data.address.state);
    this.updateEvent.get('venueName').setValue(this.data.venueName);
    this.updateEvent.get('commissionPercentage').setValue(this.data.commissionPercentage);
    this.updateEvent.get('gstPercentage').setValue(this.data.gstPercentage);


  }

  fileUploader(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload = elem.files[0];
    }
  }


  async updateEventSubmit({ value, valid }: { value; valid: boolean }) {

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
      "duration": value.duration,
      "endDate": value.endDate,
      "eventEndDate": null,
      "eventStartDate": null,
      "id": this.data.id,
      "imageUrl": value.imageUrl,
      "name": value.name,
      "organizedBy": value.organizedBy,
      "price": value.price,
      "quantity": value.quantity,
      "regEndDate": value.regEndDate,
      "regStartDate": value.startDate,
      "reward": value.reward,
      "startDate": value.startDate,
      "status": true,
      "typeId": value.typeId,
      "userId": value.userId,
      "venueName": value.venueName,
      "commissionPercentage": value.commissionPercentage,
      "gstPercentage": value.gstPercentage
    }

    this.commonApi.updateEvent(req_data).subscribe(res => {
      console.log(res);
      if (res) {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Event Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['event']);
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

