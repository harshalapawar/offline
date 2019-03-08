import { Component, OnInit } from "@angular/core";
import { CommonApiService } from "src/services/common-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  data: any = [];
  eventId: any;

  constructor(private commonApi: CommonApiService, private session: SessionStorageService, private router: Router) { }

  ngOnInit() {
    this.getEventList();
  }

  getEventList() {
    this.commonApi.eventList().subscribe(
      res => {
        if (res['trace'].length == 0) {
          this.data = null;
        } else {
          this.data = res["trace"];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  eventDetails(eventId) {
    this.eventId = this.session.store('eventId', eventId);
    this.router.navigate(['event-details']);
  }

  orderEvent(eventid) {
    this.eventId = this.session.store('eventid',eventid);
  }
}
