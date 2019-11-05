import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signInfo = new FormGroup( {
    email: new FormControl('taehee.jang@gitple.com'),
    password: new FormControl('q1w2e3r4')
  });

  formCheck() {
    if (this.signInfo.value.email === null || this.signInfo.value.email === undefined || this.signInfo.value.email === '') {
        return false;
    }else if (this.signInfo.value.password === null || this.signInfo.value.password === undefined || this.signInfo.value.password === '') {
      return false;
    } else {
      return true;
    }
  }

  signin () {
    if (this.formCheck()) {
      const signInfo = JSON.stringify(this.signInfo.value);
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      const options = {headers: headers};

      this.http
      .post('http://localhost:3000/signin', signInfo, options)
      .subscribe( (val) => {
        localStorage.setItem('userInfo', JSON.stringify(val));
        console.log('POST call successful');
        alert('Sign In complete!! Go to the profile page.');
        this.router.navigate(['/list']);
      }
      , response => {
        console.log('POST call in error', response);
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
