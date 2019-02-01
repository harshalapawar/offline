import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { CommonApiService } from 'src/services/common-api.service';

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

  constructor(private session: SessionStorageService, private commonApi: CommonApiService) { }

  ngOnInit() {
    this.companyId = this.session.retrieve('companyId');
    this.getSingleCompanyDetails(this.companyId);
  }



  getSingleCompanyDetails(companyId) {
    this.commonApi.getSingleCompany(this.companyId).subscribe(res => {
      this.data = res['trace'];
      this.bank = res['trace']['bankAccountDetails'];
      this.company = res['trace']['company']

    });

  }
}
