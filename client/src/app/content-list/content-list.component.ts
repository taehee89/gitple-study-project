import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  content = [new FormGroup( {
    subject: new FormControl(''),
    content: new FormControl('')
  })];

  add() {
    this.router.navigate(['/write']);
  }

  del(docId: String) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token
    });
    const options = {
      headers: headers
    };

    this.http
    .delete('http://localhost:3000/content/' + docId, options)
    .subscribe( (val: Array<Object>) => {
      console.log('POST call successful value returned in body', val);
      alert('delete complete!!');
      this.getList();
    }
    , response => {
      console.log('POST call in error', response);
    });
  }

  signout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/']);
  }

  getList() {
    const headers = new HttpHeaders({
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token
    });
    const options = {headers: headers};

      this.http
      .get('http://localhost:3000/content', options)
      .subscribe( (val: any) => {
        console.log('POST call successful ' + val);
        this.content = val;
      }
      , response => {
        console.log('POST call in error', response);
        this.signout();
      });
  }

  ngOnInit() {
    if (localStorage.getItem('userInfo') != null) {
      this.getList();
    } else {
      this.router.navigate(['/']);
    }
  }
}
