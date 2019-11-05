import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentWriteComponent } from './content-write/content-write.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    ContentListComponent,
    ContentWriteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'list', component: ContentListComponent },
      { path: 'write', component: ContentWriteComponent },
      { path: 'write/:id', component: ContentWriteComponent }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
