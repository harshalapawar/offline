import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  data: any = [];
  offerId: any;

  constructor(private commonApi: CommonApiService, private session: SessionStorageService, private router: Router) { }

  ngOnInit() {
    this.getOfferList();
  }

  getOfferList() {
    this.commonApi.getOffersList().subscribe(
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

  offerDetails(offerId) {
    this.offerId = this.session.store('offerId', offerId);
    this.router.navigate(['offer-details']);
  }

  orderOffer(offerid) {
    this.offerId = this.session.store('offerid', offerid);
  }

}
