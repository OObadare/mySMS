import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-message-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-creator.component.html',
  styleUrl: './message-creator.component.css'
})
export class MessageCreatorComponent {
  textMessage = {
    userId: null,
    message: "",
    phoneNumber: "",
    messageStatus: "unsent"
  }
  
  onSubmit() {
    console.log(this.textMessage)
  }

  
}
