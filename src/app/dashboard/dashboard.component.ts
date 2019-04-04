import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  data: any = [];
  totalCompany: any;
  totalEvents: any;
  totalOffers: any;
  totalUser: any;
  constructor(private common: CommonApiService) { }

  ngOnInit() {
    this.common.getDashboard().subscribe(res => {
      if (res['trace'].length == 0) {
        this.data = null;
      } else {
        this.data = res["trace"];
        this.totalCompany = res['trace']['totalCompany'];
        this.totalEvents = res['trace']['totalEvents'];
        this.totalOffers = res['trace']['totalOffers'];
        this.totalUser = res['trace']['totalUser'];
      }

    })
  }

}
