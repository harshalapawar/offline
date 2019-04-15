import { Component } from '@angular/core';
import { map, filter, switchMap } from 'rxjs/operators';
import * as $ from 'jquery';
import { RouterEvent, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'star-admin-angular';


  constructor(public session: SessionStorageService, public _router: Router) { }


  flag: boolean = false;
  userId: any;
  overlayFlag: boolean;

  ngOnInit(): void {
    this._router.events.pipe(filter(e => e instanceof RouterEvent)).subscribe(e => {
      if (e['url'] == '/' || e['url'] == '/super-admin-login') {
        this.flag = false;
      } else {
        this.flag = true;
      }
    });

    // this.overlayFlag = this.global.overlayFlag;
    // console.log(this.overlayFlag);

  }
}
