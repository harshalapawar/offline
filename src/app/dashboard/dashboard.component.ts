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

  constructor(private common: CommonApiService) { }

  ngOnInit() {
    this.common.getDashboard().subscribe(res => {
      console.log(res);

    })
  }

}
