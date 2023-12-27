import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  requestService = inject(RequestService)
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
    this.requestService.postData("signup", this.userData)
  }
  
  onLogin() {
    this.requestService.postData("login", this.userData)
  }

  onSignout() {
    this.requestService.postData("logout", this.userData)
  }
}
