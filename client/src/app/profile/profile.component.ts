import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo = {};

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/']);
  }

  ngOnInit() {
    if (localStorage.getItem('userInfo') != null) {
      const headers = new HttpHeaders({
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token
      });
      const options = {headers: headers};

        this.http
        .get('http://localhost:3000/user', options)
        .subscribe( (val) => {
          console.log('POST call successful ' + val);
          this.userInfo = val;
        }
        , response => {
          console.log('POST call in error', response);
        });
    } else {
      this.router.navigate(['/']);
    }
  }
}
