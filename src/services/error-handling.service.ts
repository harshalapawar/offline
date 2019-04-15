import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private session: SessionStorageService, private router: Router) { }


  successresponse(res) {
    if (res['status'] == 500) {
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Error',
        text: res['message'],
        showConfirmButton: false,
        timer: 2000
      })
      this.session.clear();
      this.router.navigate(['/']);
    } else if (res['status'] == 200) {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Successfully',
        text: res['message'],
        showConfirmButton: false,
        timer: 2000
      })
      return true;
    } else {

    }
  }


  errorresponse(error) {
    if (error['error']['status'] == 500) {
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Error',
        text: error['error']['message'],
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
}
