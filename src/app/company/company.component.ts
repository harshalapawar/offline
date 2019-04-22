import { Component, OnInit } from "@angular/core";
import { CommonApiService } from "src/services/common-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ExcelService } from 'src/services/excel.service';

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"]
})
export class CompanyComponent implements OnInit {
  data: any = [];
  companyId: any;

  loader: boolean;

  constructor(private commonApi: CommonApiService, private session: SessionStorageService, private router: Router, private excelService: ExcelService) { }

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
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Company');
  }

  getCompanyList() {
    this.loader = true;
    this.commonApi.companyList().subscribe(
      res => {
        this.loader = false;
        if (res['trace'].length == 0) {
          this.data = null;
        } else {
          this.data = res["trace"];
        }
      },
      error => {
        this.loader = false;
        console.log(error);
      }
    );
  }

  companyDetails(companyId) {
    this.companyId = this.session.store('companyId', companyId);
    this.router.navigate(['company-details']);
  }
}
