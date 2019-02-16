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
    typeId: new FormControl("", Validators.compose([Validators.required]))
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
  }

}
