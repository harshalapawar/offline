import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import * as $ from 'jquery';
import { CommonApiService } from 'src/services/common-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public sidebarOpened = false;
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    var open = $('.open-nav'),
      close = $('.close'),
      overlay = $('.overlay');
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
      this.commonApi.overlayFlag = !this.commonApi.overlayFlag;
      overlay.show();
      $('li a').on('click', function () {
        $('.sidebar-offcanvas').removeClass('active');
        overlay.hide();
        console.log("enter");
        
      });
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
      overlay.hide();
    }
  }
  constructor(config: NgbDropdownConfig, private router: Router, private session: SessionStorageService, private commonApi: CommonApiService) {
    config.placement = 'bottom-right';
  }
  ngOnInit() {
  }


  signOut() {
    this.session.clear();
    this.router.navigate(['/'])
  }

}
