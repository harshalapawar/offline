import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/services/excel.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.scss']
})
export class SliderImageComponent implements OnInit {

  data: any = [];
  userId: any;
  fileUpload: any;
  imageUrl: any;
  fileImageUrl: any;
  constructor(private common: CommonApiService, private session: SessionStorageService, public activatedRoute: ActivatedRoute, private excelService: ExcelService) { }

  uploadFile = new FormGroup({
    file: new FormControl("", Validators.compose([Validators.required])),
  })

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
  }

  isValidfile() {
    Object.keys(this.uploadFile.controls).forEach(field => {
      let control = this.uploadFile.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  async uploadFileSubmit({ value, valid }: { value; valid: boolean }) {
    this.isValidfile();
    let formData: FormData = new FormData();
    formData.append("file", this.fileUpload);

    if (valid) {
      this.common.sliderImageFileUpload(formData).subscribe(res => {
        this.fileImageUrl = res['trace'];
        this.imageUrl = res['trace']['imageUrl'];
      });
    } else {

    }
  }

}
