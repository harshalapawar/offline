import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonApiService } from 'src/services/common-api.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { ErrorHandlingService } from 'src/services/error-handling.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-event-type',
  templateUrl: './add-event-type.component.html',
  styleUrls: ['./add-event-type.component.scss']
})
export class AddEventTypeComponent implements OnInit {

  loader: boolean;
  constructor(public common: CommonApiService, public router: Router, public session: SessionStorageService, public error: ErrorHandlingService) { }

  addEventType = new FormGroup({
    discription: new FormControl("", Validators.compose([Validators.required])),
    typeId: new FormControl("", Validators.compose([Validators.required])),
    // createDate: new FormControl("", Validators.compose([Validators.required]))
  });

  ngOnInit() {
  }

  async addEventTypeSubmit({ value, valid }: { value; valid: boolean }) {

    if (valid) {
      this.loader = true;
      try {
        this.common.addEventType(value).subscribe(res => {
          this.loader = false;
          if (res) {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Event Type Added Successfully',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['event-type']);
            this.addEventType.reset();

          } else {

          }
        }, error => {
          this.loader = false;
          this.error.errorresponse(error);
        }
        );
      } catch (error) {
        this.loader = false;
        this.error.errorresponse(error);
      }
    } else {

    }

  }

}
