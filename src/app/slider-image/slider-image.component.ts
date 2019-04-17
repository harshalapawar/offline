import { Component, OnInit } from '@angular/core';
import { CommonApiService } from 'src/services/common-api.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from 'src/services/excel.service';

@Component({
  selector: 'app-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.scss']
})
export class SliderImageComponent implements OnInit {

  data: any = [];
  userId: any;
  constructor(private common: CommonApiService, private session: SessionStorageService, public activatedRoute: ActivatedRoute, private excelService: ExcelService) { }


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

}
