import { Component, inject } from '@angular/core';
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

  onSubmit(event: any) {
    event.submitter.id == "signup" ? this.onSignup() : this.onLogin()
  }

  onSignup() {
    this.requestService.postData("signup", this.userData).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
      }
    });
  }
  
  onLogin() {
    this.requestService.postData("login", this.userData).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    })
  }

  onSignout() {
    this.requestService.postData("logout", this.userData).subscribe({
      next: _data => {
        this.isLoggedIn = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    })
  }
}
