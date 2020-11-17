import { Injectable } from '@angular/core';
import MessageType from './message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  showLoader:boolean;

  messages = [];

  constructor() { }

  addMessage(message:string, type:MessageType) {
    this.messages.push({
      message, type
    });
  }

  deleteMessage(index) {
    this.messages.splice(index, 1);
  }
}
