import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { CommonApiService } from 'src/services/common-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    file: new FormControl("", Validators.compose([Validators.required]))
  });

  ngOnInit() {
    this.eventId = this.session.retrieve('eventId');
    this.getSingleEventDetails(this.eventId);
  }

  editEvent() {
    this.valid = false;
    this.flag = false;
  }


  getSingleEventDetails(companyId) {
    this.commonApi.getSingleEvent(this.eventId).subscribe(res => {
      console.log(res);
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
    this.updateEvent.get('file').setValue(this.data.file);
  }

}
