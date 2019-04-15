import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss']
})
export class CompanyLoginComponent implements OnInit {

  constructor(public session: SessionStorageService) { }

  companyLogin = new FormGroup({
    password: new FormControl('', Validators.compose([
      Validators.required,
    ])),
    user_id: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });

  async companyLoginSubmit({ value, valid }: { value, valid: boolean }) {
    this.companyLogin.controls['password'].markAsTouched();
    this.companyLogin.controls['user_id'].markAsTouched();

    if (valid) {
      try {

      } catch (error) {
        console.log(error);

      }

    } else {

    }
  }

  ngOnInit() {
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }

}
