import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

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
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }
  constructor(config: NgbDropdownConfig, private router: Router, private session: SessionStorageService) {
    config.placement = 'bottom-right';
  }
  ngOnInit() {
  }


  signOut() {
    this.session.clear();
    this.router.navigate(['/'])
  }

}
