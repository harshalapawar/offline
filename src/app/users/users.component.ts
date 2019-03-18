import { Component, OnInit } from "@angular/core";
import { CommonApiService } from "../../../src/services/common-api.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import * as $ from "jquery";
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';



@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {

  SearchFormModel: FormGroup;

  data: any;

  setPass: string = "";
  confPass: string = "";
  passCheck: boolean = true
  userIdTo: any;
  session_data: any;
  constructor(public commonApi: CommonApiService, private router: Router, private session: SessionStorageService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.getUserList();
    this.SearchFormModel = this._fb.group({
      searchText: new FormControl(''),
    });
  }

  filter: any = {};
  i = 0;

  onChange() {
    var search = this.data;
    if (this.filter.email) {
      this.i = 0;
      search = search.filter(v => v.email.indexOf(this.filter.email) >= 0);
    } else {
      this.i = this.i + 1;
      if (this.i == 1) {
        this.getUserList();
      }

    }
    this.data = search;
   
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
