import { Component, OnInit } from "@angular/core";
import { SessionStorageService } from "ngx-webstorage";
import { Router } from '@angular/router';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;

  firstName: any;
  authorities: any;
  lastName: any;
  constructor(private session: SessionStorageService, private _router: Router) { }

  ngOnInit() {
    this.firstName = this.session.retrieve("firstName");
    this.lastName = this.session.retrieve("lastName");
    this.authorities = this.session.retrieve("authorities");
  }

  logout() {
    this._router.navigate(['']);
    this.session.clear();
  }
}
