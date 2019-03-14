import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ValueTransformer } from '@angular/compiler/src/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  data: any = [];
  offerId: any;
  activeofferId: any;
  flag: any;
  id: any;

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

  offerActive(id, flag) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to proceed with this action",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'yes'
    }).then((result) => {
      if (result.value) {
        this.commonApi.getOfferActive(id, flag).subscribe(res => {
          this.getOfferList();
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // this.getApprovalList();
      }
    });
  }

}
