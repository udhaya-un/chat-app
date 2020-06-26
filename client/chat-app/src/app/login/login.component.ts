import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../config/api.service';
import { AppService } from '../app.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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
    this.apiService.post('http://localhost:3005/chat/user/login', this.user).subscribe(user=>{
      this.appService.saveToken(user.authToken)
      if(user.authToken){
        this.router.navigate(['/chat'])
      }
    })
  }
}
