import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  route_path: String
  isLoggedIn: Boolean
  constructor(private router: Router, private location: Location) { 
    router.events.subscribe(route => {
      this.route_path = location.path()
      if (this.route_path === '/chat') {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
      
  });
  
  }

  ngOnInit(): void {
  }
  Logout(){
    sessionStorage.removeItem('authToken')
  }
}
