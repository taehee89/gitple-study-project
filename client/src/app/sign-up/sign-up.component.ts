import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  user = new FormGroup( {
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  formCheck() {
    if (this.user.value.name === null || this.user.value.name === undefined || this.user.value.name === '') {
      return false;
    }else if (this.user.value.email === null || this.user.value.email === undefined || this.user.value.email === '') {
        return false;
    }else if (this.user.value.password === null || this.user.value.password === undefined || this.user.value.password === '') {
      return false;
    } else {
      return true;
    }
  }

  // sign up funtion, method: post
  signup() {
    if (this.formCheck()) {
      const userData = JSON.stringify(this.user.value);
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      const options = {headers: headers};

      this.http
      .post('http://localhost:3000/signup', userData, options)
      .subscribe( (val) => {
        console.log('POST call successful value returned in body', val);
        alert('Sign up complete!! Go to the login page.');
        this.router.navigate(['/']);
      }
      , response => {
        console.log('POST call in error', response);
      });
    } else {
      alert('The all field is required');
    }
  }

  ngOnInit() {
    if (localStorage.getItem('userInfo') != null) {
      this.router.navigate(['/']);
    }
  }
}
