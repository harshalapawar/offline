import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/services/excel.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {


  data: any = [];
  userId: any;
filter: any = {};
 i = 0;
  loader: boolean;
   SearchFormModel: FormGroup;
  constructor(private common: CommonApiService, private session: SessionStorageService, public activatedRoute: ActivatedRoute, private _fb: FormBuilder, private excelService: ExcelService) { }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Order-History');
  }

   onChange() {

    var search = this.data;

    if (this.filter.transactionId) {
      this.i = 0;
      search = search.filter(v => v.transactionId.indexOf(this.filter.transactionId) >= 0);
    } else {
      this.i = this.i + 1;
      if (this.i == 1) {
        this.getAllList();
      }

    }
     console.log(this.data);
    this.data = search;
  }


  ngOnInit() {
this.getAllList();

 this.SearchFormModel = this._fb.group({
      searchText: new FormControl(''),
    });



    
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    if (id == this.session.retrieve('userid')) {
      this.common.getUserOrderHistoryReq(id).subscribe(res => {
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
    } else if (id == this.session.retrieve('eventid')) {
      this.common.getEventOrderHistoryReq(id).subscribe(res => {
        console.log(res);
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
    } else if (id == this.session.retrieve('offerid')) {
      this.common.getOffersOrderHistoryReq(id).subscribe(res => {
        console.log(res);
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

    else if (id == null) {
      this.getAllList();
    }
  }


  getAllList() {
    this.loader = true;
    this.common.getAllOrderHistoryReq().subscribe(res => {
      // console.log(res);
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

}
