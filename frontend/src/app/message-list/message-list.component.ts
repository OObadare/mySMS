import { Component, OnInit, inject } from '@angular/core';
import { RequestService } from '../services/request.service';
import { MessageDisplayComponent } from '../message-display/message-display.component';
import { AsyncPipe, NgIf } from '@angular/common';


@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [MessageDisplayComponent, NgIf, AsyncPipe],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  requestService = inject(RequestService)
  data: any

  fetchMessages() {
    this.requestService.getData("text_messages").subscribe( response => {
      this.data = response
    })
  }

  ngOnInit(): void {this.fetchMessages()}

}
