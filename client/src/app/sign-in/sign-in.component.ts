import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-sign',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signInfo = new FormGroup( {
    email: new FormControl('taehee.jang@gitple.com'),
    password: new FormControl('q1w2e3r4')
  });

  signin() {
    if (!_.isEmpty(this.signInfo.value.email) && !_.isEmpty(this.signInfo.value.password)) {
      const signInfo = JSON.stringify(this.signInfo.value);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = {headers: headers};

      this.http
      .post('http://localhost:3000/signin', signInfo, options)
      .subscribe( (val) => {
        localStorage.setItem('userInfo', JSON.stringify(val));
        alert('Sign In complete!! Go to the profile page.');
        this.router.navigate(['/list']);
      }
      , response => {
        alert('User not found!');
      });
    } else {
      alert('The all field is required');
    }
  }

  ngOnInit() {
    if (localStorage.getItem('userInfo') != null) {
      this.router.navigate(['/list']);
    }
  }
}
