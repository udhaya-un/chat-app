import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../config/web-socket.service';
import { ApiService } from '../config/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    user:String;
    room:String;
    receiver: String;
    messageText:String;
    messageArray:Array<{user:String, receiver: String , message:String}> = [];
    all_users: any = []
  constructor(private webSocketService: WebSocketService, private apiService: ApiService) {
        this.webSocketService.onChange.subscribe({
          next: (event: {user:String, receiver: String , message:String}) => {
            this.messageArray.push(event)
          }
      })
   }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('email')
    this.get_all_user()
  }

sendMessage()
{
    this.webSocketService.sendMessage({user:this.user, receiver: this.receiver, message:this.messageText});
}

selectedUser(receiver){
this.receiver = receiver
}

get_all_user(){
  this.apiService.get('http://localhost:3005/chat/user/getall').subscribe(data=>{
    data.forEach(usr => {
      if(usr.email !== sessionStorage.getItem('email')){
        this.all_users.push(usr)
      }
    });
  })
}

}
