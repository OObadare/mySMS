import { Component, inject, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RequestService } from '../services/request.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-message-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-creator.component.html',
  styleUrl: './message-creator.component.css'
})
export class MessageCreatorComponent {
  requestService = inject(RequestService)
  storageService = inject(StorageService)
  textMessage = {
    user_id: null,
    message: "",
    phoneNumber: "",
    status: "unsent"
  }
  currentUser : any
  errorMessage= ""

  ngOnInit() {
    this.currentUser = this.storageService.getUser()
    console.log(this.currentUser)
  }
  
  onSubmit() {
    this.textMessage.user_id = this.currentUser.id
    this.requestService.postData("text_messages", this.textMessage).subscribe({
      next: data => {
        console.log(data)
      },
      error: err => {
        this.errorMessage = err.error.message
        console.log(err.error.message)
      }
    })
  }

}
