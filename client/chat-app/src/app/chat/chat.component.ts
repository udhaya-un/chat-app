import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../config/web-socket.service';
import { ApiService } from '../config/api.service';
import { Constants } from '../config/Constant';
import { retry } from 'rxjs/operators';


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
  loggedInUser: String;
  users_unread_chat: any = []
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
    this.sender_id = sessionStorage.getItem('id')
    this.loggedInUser = sessionStorage.getItem('user')
    this.get_all_user()
    // this.check_msg_read_not()
  }

  sendMessage() {
    if (this.messageText) {
      var data = { user: this.user, receiver: this.receiver, message: this.messageText }
      this.webSocketService.sendMessage(data);
      var msg = { sender_id: this.sender_id, receiver_id: this.receiver_id, message: this.messageText }
      this.apiService.post(`${Constants.apiBaseUrl}/chat/save`, msg).subscribe(message => {
      })
    }
    data['isSender'] = true
    this.messageArray.push(data)
    this.messageText = ''
  }

  selectedUser(receiver) {
    this.receiver_id = receiver._id
    this.get_all_user_chat(receiver._id)
    this.receiver = receiver.email
    this.showMsgBox = true
    this.read_chat()
  }

   get_all_user() {
    this.apiService.get(`${Constants.apiBaseUrl}/user/getall`).subscribe(data => {
      data.forEach(usr => {
        if (usr.email !== sessionStorage.getItem('email')) {
          this.all_users.push(usr)
        }
      });
    })
    setTimeout(()=>{
      this.check_msg_read_not(this.all_users)
    }, 1000)
  }

  get_all_user_chat(receiver_id) {
    this.apiService.get(`${Constants.apiBaseUrl}/chat/get_by_sender_receiver/${this.sender_id}/${receiver_id}`).subscribe(data => {
      this.messageArray = []
      if (data) {
        data.forEach(da => {
          da.read = true
        });
        this.get_deleted_chat_by_sender(data)
      }
    })
  }

  get_deleted_chat_by_sender(users) {
    this.apiService.get(`${Constants.apiBaseUrl}/chat/deleted_chat_by_sender/${this.sender_id}`).subscribe(data => {
      if (data.length === 0) {
        users.map(userMsg => {
          if (this.sender_id === userMsg.sender_id) {
            userMsg['isSender'] = true
          } else {
            userMsg['isSender'] = false
          }
          this.messageArray.push(userMsg)
        })
      } else {
        users.map(userMsg => {
          if (this.sender_id === userMsg.sender_id) {
            userMsg['isSender'] = true
          } else {
            userMsg['isSender'] = false
          }
          if (!data.messages.includes(userMsg._id)) {
            this.messageArray.push(userMsg)
          }
        })
      }
    })

  }

  deleteMessages() {
    this.apiService.get(`${Constants.apiBaseUrl}/chat/delete_chat_by_sender/${this.sender_id}/${this.receiver_id}`).subscribe(data => {
      this.get_all_user_chat(this.receiver_id)
    })
  }

  check_msg_read_not(users) {
    setInterval(() => {
      this.apiService.get(`${Constants.apiBaseUrl}/chat/unread/${this.sender_id}`).subscribe(data => {
        let unreadChats = []
        data.map(d=>{
          if(this.sender_id === d.receiver_id && d.read === false){
            unreadChats.push(d.sender_id)
          }
        })
        users.forEach(data=>{
         let count = this.get_count(unreadChats, data._id)
         data['count'] = count
         data['']
        })
      })
  }, 2000)
  }

  read_msg(){
    this.check_msg_read_not(this.all_users)
  }

  get_count(array, receiver){
    let count = 0
    this.users_unread_chat = []

    array.forEach((v) => {
      if (v === receiver){
        count++
      }
    })
    return count
  }

  read_chat(){
    this.apiService.put(`${Constants.apiBaseUrl}/chat/read/${this.sender_id}/${this.receiver_id}`, {read:true}).subscribe(data => {
      if (data){
        this.check_msg_read_not(this.all_users)
      }
    })
  }
}
