import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../config/api.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import {Constants} from '../config/Constant'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public user = {
    email: '',
    auth_pass: ''
  };
  public invalidUser: Boolean;
  submitted = false;
  public errorMessage: String;
  public isErrorMessage: Boolean;
  public borderStyle: any = {
    email: '#ced4da',
    password: '#ced4da',
  };

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
  });
  this.loginForm.valueChanges.subscribe(() => {
    this.submitted = false;
    this.errorMessage = '';
    this.isErrorMessage = false;
    this.borderStyle.email = '#ced4da';
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  Login() {
    const { invalid, value } = this.loginForm;
    this.submitted = true;
    if (invalid) {
      return;
    }
    this.apiService.post(`${Constants.apiBaseUrl}/user/login`, this.user).subscribe(user=>{
      console.log(user)
      if (user !== "Incorrect email or Password"){
        this.appService.saveToken(user.authToken)
      sessionStorage.setItem('email', user.email)
      sessionStorage.setItem('id', user.id)
      if(user.authToken){
        this.router.navigate(['/chat'])
      }
      this.invalidUser = false
      } else {
        this.invalidUser = true
      }
      
    })
  }
}
