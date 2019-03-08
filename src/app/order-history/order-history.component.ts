import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {


  data: any = [];
  userId: any;
  constructor(private common: CommonApiService, private session: SessionStorageService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {


    let id = this.activatedRoute.snapshot.paramMap.get("id");




    if (id == this.session.retrieve('userid')) {
      this.common.getUserOrderHistoryReq(id).subscribe(res => {
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
    } else if (id == this.session.retrieve('eventid')) {
      this.common.getEventOrderHistoryReq(id).subscribe(res => {
        console.log(res);
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
    } else if (id == this.session.retrieve('offerid')) {
      this.common.getOffersOrderHistoryReq(id).subscribe(res => {
        console.log(res);
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

    else {
      this.getAllList();
    }
  }


  getAllList() {
    this.common.getAllOrderHistoryReq().subscribe(res => {
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
