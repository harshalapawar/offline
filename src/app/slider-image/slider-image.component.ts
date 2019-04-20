import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/services/excel.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ErrorHandlingService } from 'src/services/error-handling.service';

declare var $: any;

@Component({
  selector: 'app-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.scss']
})
export class SliderImageComponent implements OnInit {

  data: any = [];
  userId: any;
  fileUpload: any;
  imageFileUrl: any;
  fileImageUrl: any;
  statusCheck: boolean = false;
  constructor(private common: CommonApiService, private session: SessionStorageService, public activatedRoute: ActivatedRoute, private excelService: ExcelService, private router: Router,
    private _errorHandling: ErrorHandlingService) { }

  uploadFile = new FormGroup({
    file: new FormControl("", Validators.compose([Validators.required])),
    status: new FormControl("", Validators.compose([Validators.required])),
    description: new FormControl("", Validators.compose([Validators.required]))
  });

  // sliderForm = new FormGroup({
  //   imageUrl: new FormControl("", Validators.compose([Validators.required]))

  // })

  ngOnInit() {
    this.getSliderImageList();
  }

  getSliderImageList() {
    this.common.silderImageGet().subscribe(res => {
      if (res['trace'].length == 0) {
        this.data = null;
      } else {
        this.data = res["trace"];
        console.log(this.data);

      }
    },
      error => {
        console.log(error);
      }
    );
  }

  fileUploader(event) {
    const elem = event.target;
    if (elem.files.length > 0) {
      this.fileUpload = elem.files[0];
      console.log(this.fileUpload);
    }

    let formData: FormData = new FormData();
    formData.append("file", this.fileUpload);

    // if (valid) {
    this.common.sliderImageFileUpload(formData).subscribe(res => {
      console.log(res);
      this.fileImageUrl = res['trace'];
      this.imageFileUrl = res['trace']['imageUrl'];
    });
  }

  isValidfile() {
    Object.keys(this.uploadFile.controls).forEach(field => {
      let control = this.uploadFile.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }


  status(event) {

    console.log(event.target.value);

    if (event.target.value = true) {
      this.statusCheck = true;
    } else if (event.target.value = false) {
      this.statusCheck = false;
    }

  }

  async uploadFileSubmit({ value, valid }: { value; valid: boolean }) {
    this.isValidfile();
    // let formData: FormData = new FormData();
    // formData.append("file", this.fileUpload);

    // if (valid) {
    //   this.common.sliderImageFileUpload(formData).subscribe(res => {
    //     this.data = res['trace'];
    //     this.fileImageUrl = res['trace'];
    //     this.imageFileUrl = res['trace']['imageUrl'];
    //   });
    // } else {

    // }


    let req_data = {
      "imageUrl": this.imageFileUrl,
      "status": this.statusCheck,
      "description":  value.description
    }

    if (valid) {
      this.common.sliderImagePost(req_data).subscribe(res => {
        if (res) {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Added Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          document.getElementById('exampleModal').click();
          this.router.navigate(['slider-image']);
          this.getSliderImageList();
        }
      }, error => {
        this._errorHandling.errorresponse(error);
      }
      );
    }
  }


  imageActive(id, flag) {

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
        this.common.getImageActive(id, flag).subscribe(res => {
          this.getSliderImageList();
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // this.getApprovalList();
      }
    });
  }


}
