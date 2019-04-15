import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonApiService } from 'src/services/common-api.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/services/error-handling.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  fileUpload: any;
  imageUpload: any;


  constructor(private commonApi: CommonApiService, private router: Router, private _errorHandling: ErrorHandlingService,
    private session: SessionStorageService) { }
  email_regex = "^($|[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+)$";
  // phone_regex = "^\d{3}\d{3}\d{4}$"
  addCompany = new FormGroup({
    companyName: new FormControl("", Validators.compose([Validators.required])),
    registrationId: new FormControl("", Validators.compose([Validators.required])),
    nameOfOutlet: new FormControl("", Validators.compose([Validators.required])),
    link: new FormControl("", Validators.compose([Validators.required])),
    nameOfAccount: new FormControl("", Validators.compose([Validators.required])),
    accountNumber: new FormControl("", Validators.compose([Validators.required])),
    accountType: new FormControl("", Validators.compose([Validators.required])),
    ifscCode: new FormControl("", Validators.compose([Validators.required])),
    bankName: new FormControl("", Validators.compose([Validators.required])),
    bankBranch: new FormControl("", Validators.compose([Validators.required])),
    bankCity: new FormControl("", Validators.compose([Validators.required])),
    firstName: new FormControl("", Validators.compose([Validators.required])),
    lastName: new FormControl("", Validators.compose([Validators.required])),
    mobileNumber: new FormControl("", Validators.compose([Validators.required])),
    countryCode: new FormControl("", Validators.compose([Validators.required])),
    email: new FormControl("", Validators.compose([Validators.required, Validators.pattern(this.email_regex)])),
    dob: new FormControl("", Validators.compose([Validators.required])),
    // file: new FormControl("", Validators.compose([Validators.required])),
    photoLink: new FormControl("", Validators.compose([Validators.required])),
    micrCode: new FormControl(""),
    gst_id: new FormControl("")

  });


  ngOnInit() {
  }

  // fileUploader(event) {
  //   const elem = event.target;
  //   if (elem.files.length > 0) {
  //     this.fileUpload = elem.files[0];
  //   }
  // }

  // imageUploader(event) {
  //   const elemImage = event.target;
  //   if (elemImage.files.length > 0) {
  //     this.imageUpload = elemImage.files[0];
  //   }
  // }


  isValidCompany() {
    Object.keys(this.addCompany.controls).forEach(field => {
      let control = this.addCompany.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  async addCompanySubmit({ value, valid }: { value; valid: boolean }) {

    this.isValidCompany();

    let req_data = {
      "bankAccountDetails": {
        "accountNumber": value.accountNumber,
        "accountType": value.accountType,
        "bankBranch": value.bankBranch,
        "bankCity": value.bankCity,
        "bankName": value.bankName,
        "ifscCode": value.ifscCode,
        "nameOfAccount": value.nameOfAccount,
        "gst_id": value.gst_id,
        "micrCode": value.micrCode,
      },
      "company": {
        "companyName": value.companyName,
        "link": value.link,
        "nameOfOutlet": value.nameOfOutlet,
        "photoLink": value.photoLink,
        "registrationId": value.registrationId
      },
      "countryCode": value.countryCode,
      "dob": value.dob,
      "email": value.email,
      "firstName": value.firstName,
      "lastName": value.lastName,
      "mobileNumber": value.mobileNumber
    }
    if (valid) {

      try {
        this.commonApi.addCompany(req_data).subscribe(res => {
          console.log(res);

          if (res) {
            console.log(res);

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Company Registered Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            this.addCompany.reset();
            this.router.navigate(['company']);
          } else {
          }
        }, error => {
          this._errorHandling.errorresponse(error);
        }
        );
      } catch (error) {
        this._errorHandling.errorresponse(error);
      }
    } else {

    }
  }

}
