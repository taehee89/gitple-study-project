import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-content-write',
  templateUrl: './content-write.component.html',
  styleUrls: ['./content-write.component.scss']
})
export class ContentWriteComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.docId = route.snapshot.params['id'];
  }

  docId: String;

  content = new FormGroup( {
    subject: new FormControl(''),
    content: new FormControl('')
  });

  add() {
    if (!_.isEmpty(this.content.value.subject)) {
      const contentData = JSON.stringify(this.content.value);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token
      });
      const options = {headers: headers};

      this.http
      .post('http://localhost:3000/content', contentData, options)
      .subscribe( (val) => {
        alert('write complete!! Go to the list page.');
        this.router.navigate(['/list']);
      }
      , response => {
        console.log('POST call in error', response);
      });
    } else {
      alert('The subject field is required');
    }
  }

  update() {
    const contentData = JSON.stringify(this.content.value);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token
    });
    const options = {headers: headers};

    this.http
    .put('http://localhost:3000/content/' + this.docId, contentData, options)
    .subscribe( (val) => {
      alert('update complete!! Go to the list page.');
      this.router.navigate(['/list']);
    }
    , response => {
      console.log('POST call in error', response);
    });
  }

  cancel() {
    this.router.navigate(['/list']);
  }

  getContent() {
    const headers = new HttpHeaders({
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token
    });
    const options = {headers: headers};

    this.http
    .get('http://localhost:3000/content/' + this.docId, options)
    .subscribe( (val: any) => {
      this.content.setValue({
        subject: val.subject,
        content: val.content
      });
    }
    , response => {
      console.log('POST call in error', response);
    });
  }

  ngOnInit() {
    if (localStorage.getItem('userInfo') != null) {
      if (this.docId != null) {
        this.getContent();
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
