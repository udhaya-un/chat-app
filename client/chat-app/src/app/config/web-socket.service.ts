import { Injectable, EventEmitter } from "@angular/core";
import * as io from 'socket.io-client';
import { Observable } from "rxjs/Observable";

export class MyServiceEvent {
    user: string;
    receiver: string;
    message: String;
}

export class WebSocketService {
    socket: io.Socket;
    public send: EventEmitter<MyServiceEvent> = new EventEmitter<MyServiceEvent>();
    public receive: EventEmitter<MyServiceEvent> = new EventEmitter<MyServiceEvent>();

    constructor() {
        this.socket = io.connect('http://localhost:3005');
        this.socket.emit("user_connected", sessionStorage.getItem('email'))
        this.socket.on("user_connected", (username)=>{
        })
        this.newMessage()
    }

    sendMessage(data){
        this.socket.emit('send_message', data);
    }

    newMessage(){
        console.log('i am in new message')
        this.socket.on("new_message", (data)=>{
            this.receive.emit(data)
            
        })
    }
    
}