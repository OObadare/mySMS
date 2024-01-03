import { Component, inject, OnInit, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RequestService } from '../services/request.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  requestService = inject(RequestService)
  storageService = inject(StorageService)
  isSignupFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  errorMessage = '';
  userData = {
    user: {
      email:"",
      password: ""
    }            
  }
  currentUser = {}

  ngOnInit() {
    this.currentUser = this.storageService.getUser()
  }

  // store getuser to a variable? as it is, the cookie and user might be present without the component "knowing" so

  onSubmit(event: any) {
    event.submitter.id == "signup" ? this.onSignup() : this.onLogin()
  }

  public onSignup() {
    this.requestService.postData("signup", this.userData).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.status.message;
        this.isSignupFailed = true;
      }
    });
  }
  
  public onLogin() {
    this.requestService.postData("login", this.userData).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        window.location.reload();
      },
      error: err => {
        console.log(err)
        this.errorMessage = err.error.status.message;
        this.isLoginFailed = true;
      }
    })
  }

  public onSignout() {
    this.requestService.deleteData("logout").subscribe({
      next: _data => {
        this.storageService.clean()
        this.isLoggedIn = false;
        window.location.reload();
      },
      error: err => {
        this.errorMessage = err.error.status.message;
      }
    })

  }
}
