import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.scss']
})
export class EventTypeComponent implements OnInit {

  data: any = [];
  constructor(public common: CommonApiService, public router: Router, public session: SessionStorageService) { }

  ngOnInit() {
    this.getEventTypeList();
  }

  getEventTypeList() {
    this.common.getEventType().subscribe(res => {
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
}
