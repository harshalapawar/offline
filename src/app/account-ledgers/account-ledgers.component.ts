import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-account-ledgers',
  templateUrl: './account-ledgers.component.html',
  styleUrls: ['./account-ledgers.component.scss']
})
export class AccountLedgersComponent implements OnInit {

  constructor(public commonApi: CommonApiService, private router: Router, private session: SessionStorageService) { }

  data: any;
  useridTo: any;

  ngOnInit() {
    this.useridTo = this.session.retrieve('userIdTo');
    this.accountLedgerList(this.useridTo);
  }

  accountLedgerList(userIdTo) {
    this.commonApi.accountLedgerList(userIdTo).subscribe(res => {
      if (res['trace'].length == 0) {
        this.data = null;
      } else {
        this.data = res['trace'];
      }
      if (this.data != null) {

      } else {
      }

    }, error => {
    }
    );
  }

}
