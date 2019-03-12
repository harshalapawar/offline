import { Component, OnInit } from "@angular/core";
import { CommonApiService } from "../../../src/services/common-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as $ from "jquery";
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  constructor(public commonApi: CommonApiService, private router: Router, private session: SessionStorageService) { }

  data: any;

  setPass: string = "";
  confPass: string = "";
  passCheck: boolean = true
  userIdTo: any;
  session_data: any;

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.commonApi.userList().subscribe(
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


  sessionClick(userIdTo) {
    this.userIdTo = this.session.store('userIdTo', userIdTo);
    this.router.navigate(['account-ledgers'])
  }

  orderUser(userid) {
    this.userIdTo = this.session.store('userid', userid);
  }
}
