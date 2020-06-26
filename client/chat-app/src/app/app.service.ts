import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class AppService {
  
    constructor() { }
  
    public saveToken(token: string) {
      sessionStorage.removeItem('authToken');
      window.sessionStorage.setItem('authToken', token);
    }

    public getToken(){
        return sessionStorage.getItem('authToken')
    }
  }