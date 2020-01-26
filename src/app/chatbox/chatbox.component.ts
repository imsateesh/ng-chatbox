import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'; // 

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  model: any = {}; chatMessages = {}; currentTime = '';

  constructor() { }

  ngOnInit() {
    this.currentTime = moment().format('LT');
  }

  sendMessage() {
    console.log(this.model.message);
    this.chatMessages[ new Date().getTime() ] = { // https://stackoverflow.com/questions/31490713/iterate-over-object-in-angular
      'message' : this.model.message,
      'dateTime' : new Date()
    };

    this.model.message = '';
  }

  showDate(dateTime, type){
    if('mainThread' == type) {
      return moment(dateTime).format('LT');
    }

    return moment().calendar(dateTime); // moment(dateTime).fromNow()
  }
}
