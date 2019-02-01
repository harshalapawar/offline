import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { CommonApiService } from 'src/services/common-api.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  data: any;
  eventId: any;
  constructor(private session: SessionStorageService, private router: Router, private commonApi: CommonApiService) { }

  ngOnInit() {
    this.eventId = this.session.retrieve('eventId');
    this.getSingleEventDetails(this.eventId);
  }



  getSingleEventDetails(companyId) {
    this.commonApi.getSingleEvent(this.eventId).subscribe(res => {
      console.log(res);

      this.data = res['trace'];

    });

  }

}
