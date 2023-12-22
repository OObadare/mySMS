import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RequestService } from '../request.service';


@Component({
  selector: 'app-message-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-creator.component.html',
  styleUrl: './message-creator.component.css'
})
export class MessageCreatorComponent {
  requestService = inject(RequestService)
  textMessage = {
    user_id: null,
    message: "",
    phoneNumber: "",
    status: "unsent"
  }
  
  onSubmit() {
    this.requestService.postData("text_messages", this.textMessage)
  }

}
