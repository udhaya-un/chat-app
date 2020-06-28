import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../config/web-socket.service';
import { ApiService } from '../config/api.service';
import { Constants } from '../config/Constant';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user: String;
  room: String;
  receiver: String;
  receiver_id: String;
  sender_id: String;
  showMsgBox: Boolean;
  messageText: String;
  isSender: Boolean;
  messageArray: Array<{ user: String, receiver: String, message: String }> = [];
  sendmessageArray: Array<{ user: String, receiver: String, message: String }> = [];
  all_users: any = []
  constructor(private webSocketService: WebSocketService, private apiService: ApiService) {
    webSocketService.receive.subscribe({
      next: (event: { user: String, receiver: String, message: String }) => {
        event['isSender'] = false
        this.messageArray.push(event)
      }
    })
  }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('email')
    this.get_all_user()
  }

  sendMessage() {
    if (this.messageText) {
     var data = { user: this.user, receiver: this.receiver, message: this.messageText }
      this.webSocketService.sendMessage(data);
      var msg = {sender_id: this.sender_id, receiver_id: this.receiver_id, message: this.messageText}
      this.apiService.post(`${Constants.apiBaseUrl}/chat/save`, msg).subscribe(message => {
      })
    }
    data['isSender'] = true
    this.messageArray.push(data)
    this.messageText = ''
  }

  selectedUser(receiver) {
    console.log('receiver', receiver)
    this.receiver_id = receiver._id
    this.get_all_user_chat(receiver._id)
    this.receiver = receiver.email
    this.showMsgBox = true
  }

  get_all_user() {
    this.apiService.get(`${Constants.apiBaseUrl}/user/getall`).subscribe(data => {
      data.forEach(usr => {
        if (usr.email !== sessionStorage.getItem('email')) {
          this.all_users.push(usr)
        }
      });
    })
  }

  get_all_user_chat(receiver_id) {
    this.sender_id = sessionStorage.getItem('id')
    this.apiService.get(`${Constants.apiBaseUrl}/chat/get_by_sender_receiver/${this.sender_id}/${receiver_id}`).subscribe(data => {
      this.messageArray = []
      data.forEach(usr => {
        if (this.sender_id === usr.sender_id){
          usr['isSender'] = true
        }else {
          usr['isSender'] = false
        }
        this.messageArray.push(usr)
      });
    })
  }

}
