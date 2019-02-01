import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as $ from "jquery";
import { CommonApiService } from "src/services/common-api.service";
import { async } from "@angular/core/testing";
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import Swal from 'sweetalert2';
import { ErrorHandlingService } from 'src/services/error-handling.service';
import { error } from 'util';

@Component({
  selector: "app-superadmin-login",
  templateUrl: "./superadmin-login.component.html",
  styleUrls: ["./superadmin-login.component.scss"]
})
export class SuperadminLoginComponent implements OnInit {
  constructor(private commonApi: CommonApiService, private router: Router, private session: SessionStorageService, private _errorHandling: ErrorHandlingService) { }

  superAdminLogin = new FormGroup({
    password: new FormControl("", Validators.compose([Validators.required])),
    username: new FormControl("", Validators.compose([Validators.required]))
  });

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

  isValidSuperAdmin() {
    Object.keys(this.superAdminLogin.controls).forEach(field => {
      let control = this.superAdminLogin.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  async superAdminLoginSubmit({ value, valid }: { value; valid: boolean }) {
    this.isValidSuperAdmin();
    if (valid) {
      try {
        value.rememberMe = true;
        await this.commonApi.superAdminLogin(value).subscribe(res => {
          console.log(res);
          if (res) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Successfully Signed In',
              text: res['message'],
              showConfirmButton: false,
              timer: 2000
            })
            this.router.navigate(['/dashboard']);
            this.session.store('firstName', res['trace']['firstName']);
            this.session.store('lastName', res['trace']['lastName']);
            this.session.store('id', res['trace']['id']);
            this.session.store('authorities', 1);
          } else {
          }

        }, error => {
          this._errorHandling.errorresponse(error);
        }
        );
      } catch (error) {
        console.log(error['error']);
        this._errorHandling.errorresponse(error);
      }
    } else {
    }
  }
}
