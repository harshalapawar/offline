import { Component, OnInit } from "@angular/core";
import { CommonApiService } from "src/services/common-api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
  data: any = [];

  constructor(private commonApi: CommonApiService) {}

  ngOnInit() {
    this.getEventList();
  }

  getEventList() {
    this.commonApi.eventList().subscribe(
      res => {
        if (res == null) {
          this.data = res["trace"];
          console.log(this.data);
        } else {
          this.data = res["trace"];
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
