import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'; // 
import { throwError } from 'rxjs';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  model: any = {}; chatMessages = {}; threadID = ''; chatThreadMessages = [];

  constructor() { }

  ngOnInit() {
    // this.currentTime = moment().format('LT');
  }

  sendMessage() {
    if ( this.model.hasOwnProperty('message') && this.model.message.length > 0 ) {
      this.chatMessages[ new Date().getTime() ] = { // https://stackoverflow.com/questions/31490713/iterate-over-object-in-angular
        'message' : this.model.message,
        'dateTime' : new Date()
      };
    }

    this.model.message = '';
  }

  postReply(){
    if ( this.model.hasOwnProperty('replyMessage') && this.model.replyMessage.length > 0 ) {
      let replymsg = {
        'message' : this.model.replyMessage,
        'dateTime' : new Date()
      };

      let replies = this.chatMessages[this.threadID]['replies'] || [];
      replies.push(replymsg);

      this.chatMessages[this.threadID]['replies'] = replies;

      this.chatThreadMessages = this.chatMessages[this.threadID]['replies'];

      this.model.replyMessage = '';
    }
  }

  openChatReply(threadID){
    this.threadID = threadID;
    this.chatThreadMessages = this.chatMessages[this.threadID]['replies'];
  }

  closeChatReply(){
    this.threadID = '';
  }

  showDate(dateTime, type){
    if( 'mainThread' == type ) {
      return moment(dateTime).format('LT');
    }

    return moment().calendar(dateTime); // moment(dateTime).fromNow()
  }
}
