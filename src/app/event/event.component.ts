import { Component, OnInit } from "@angular/core";
import { CommonApiService } from "src/services/common-api.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExcelService } from 'src/services/excel.service';

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  data: any = [];
  eventId: any;
  SearchFormModel: FormGroup;

  constructor(private commonApi: CommonApiService, private session: SessionStorageService, private router: Router, private _fb: FormBuilder, private excelService: ExcelService) { }
  filter: any = {};
  i = 0;

  onChange() {
    var search = this.data;
    if (this.filter.name) {
      this.i = 0;
      search = search.filter(v => v.name.indexOf(this.filter.name) >= 0);
    } else {
      this.i = this.i + 1;
      if (this.i == 1) {
        this.getEventList();
      }
    }
    this.data = search;
  }
  ngOnInit() {
    this.getEventList();
    this.SearchFormModel = this._fb.group({
      searchText: new FormControl(''),
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'Event');
  }


  getEventList() {
    this.commonApi.eventList().subscribe(
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

  eventDetails(eventId) {
    this.eventId = this.session.store('eventId', eventId);
    this.router.navigate(['event-details']);
  }

  orderEvent(eventid) {
    this.eventId = this.session.store('eventid', eventid);
  }

  eventActive(id, flag) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to proceed with this action",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'yes'
    }).then((result) => {
      if (result.value) {
        this.commonApi.getEventActive(id, flag).subscribe(res => {
          this.getEventList();
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // this.getApprovalList();
      }
    });
  }
}
