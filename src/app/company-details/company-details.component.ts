import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { CommonApiService } from 'src/services/common-api.service';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/services/error-handling.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  companyId: any;
  data: any = [];
  bank: any = [];
  company: any = [];

  valid: boolean = true;
  flag: boolean = true;

  fileUpload: any;
  id: any;



  constructor(private commonApi: CommonApiService, private router: Router, private _errorHandling: ErrorHandlingService, public session: SessionStorageService) { }
  email_regex = "^($|[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+)$";
  phone_regex = "^\d{3}\d{3}\d{4}$"
  updateCompany = new FormGroup({
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
    mobileNumber: new FormControl("", Validators.compose([Validators.required, Validators.pattern(this.phone_regex)])),
    countryCode: new FormControl("", Validators.compose([Validators.required])),
    email: new FormControl("", Validators.compose([Validators.required, Validators.pattern(this.email_regex)])),
    dob: new FormControl("", Validators.compose([Validators.required])),
    photoLink: new FormControl("", Validators.compose([Validators.required])),
    micrCode: new FormControl(""),
    gst_id: new FormControl("")
    // file: new FormControl("", Validators.compose([Validators.required]))

  });


  fileUploader(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload = elem.files[0];
    }
  }

  ngOnInit() {
    this.companyId = this.session.retrieve('companyId');
    this.getSingleCompanyDetails(this.companyId);
  }



  getSingleCompanyDetails(companyId) {
    this.commonApi.getSingleCompany(this.companyId).subscribe(res => {
      this.data = res['trace'];
      this.setData();
    });
  }


  setData() {
    this.updateCompany.get('firstName').setValue(this.data.firstName);
    this.updateCompany.get('lastName').setValue(this.data.lastName);
    this.updateCompany.get('email').setValue(this.data.email);
    this.updateCompany.get('dob').setValue(this.data.dob);
    this.updateCompany.get('mobileNumber').setValue(this.data.mobileNumber);
    this.updateCompany.get('countryCode').setValue(this.data.countryCode);
    this.updateCompany.get('companyName').setValue(this.data.company.companyName);
    this.updateCompany.get('link').setValue(this.data.company.link);
    this.updateCompany.get('nameOfOutlet').setValue(this.data.company.nameOfOutlet);
    this.updateCompany.get('photoLink').setValue(this.data.company.photoLink);
    this.updateCompany.get('registrationId').setValue(this.data.company.registrationId);
    this.updateCompany.get('accountNumber').setValue(this.data.bankAccountDetails.accountNumber);
    this.updateCompany.get('accountType').setValue(this.data.bankAccountDetails.accountType);
    this.updateCompany.get('bankBranch').setValue(this.data.bankAccountDetails.bankBranch);
    this.updateCompany.get('bankName').setValue(this.data.bankAccountDetails.bankName);
    this.updateCompany.get('ifscCode').setValue(this.data.bankAccountDetails.ifscCode);
    this.updateCompany.get('nameOfAccount').setValue(this.data.bankAccountDetails.nameOfAccount);
    this.updateCompany.get('bankCity').setValue(this.data.bankAccountDetails.bankCity);
    this.updateCompany.get('micrCode').setValue(this.data.bankAccountDetails.micrCode);
    this.updateCompany.get('gst_id').setValue(this.data.bankAccountDetails.gst_id);
  }

  editCompany() {
    this.valid = false;
    this.flag = false;
  }


  updateCompanySubmit({ value, valid }: { value, valid: boolean }) {


    let req_data = {
      "bankAccountDetails": {
        "accountNumber": value.accountNumber,
        "accountType": value.accountType,
        "bankBranch": value.bankBranch,
        "bankCheck": value.bankCheck,
        "bankCity": value.bankCity,
        "bankName": value.bankName,
        "ifscCode": value.ifscCode,
        "nameOfAccount": value.nameOfAccount
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
      "mobileNumber": value.mobileNumber,
      "id": this.data.id,
    }
    // formData.append("file", value.file);

    try {
      this.commonApi.updateCompany(req_data).subscribe(res => {
        console.log(res);
        if (res) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Company Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['company']);
        } else { }
      }, error => {
        Swal.fire({
          position: 'center',
          type: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      });
    } catch (error) {
      Swal.fire({
        position: 'center',
        type: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
