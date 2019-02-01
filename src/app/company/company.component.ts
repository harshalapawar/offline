import { Component, OnInit } from "@angular/core";
import { CommonApiService } from "src/services/common-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"]
})
export class CompanyComponent implements OnInit {
  data: any = [];

  constructor(private commonApi: CommonApiService) { }

  addUser = new FormGroup({
    email: new FormControl("", Validators.compose([
      Validators.required,
      Validators.pattern("^($|[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+)$"
      )
    ])
    ),
    firstName: new FormControl("", Validators.compose([Validators.required])),
    countryCode: new FormControl("", Validators.compose([Validators.required])),
    mobileNumber: new FormControl("", Validators.compose([Validators.required])),
    dob: new FormControl("", Validators.compose([Validators.required])),
  });

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList() {
    this.commonApi.companyList().subscribe(
      res => {
        if (this.data == null) {
          this.data = res["trace"]["content"];
        } else {
          this.data = res["trace"]["content"];
        }
        if (this.data != null) {
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
