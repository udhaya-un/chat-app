import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';
import { ApiService } from '../config/api.service';
import * as uuid from 'uuid';
import { Constants } from '../config/Constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  public user = {
    email: '',
    auth_pass: '',
    firstname: '',
    lastname: '',
    username: '',
    xid: ''
  };
  submitted = false;
  public errorMessage: String;
  public isErrorMessage: Boolean;
  public borderStyle: any = {
    email: '#ced4da',
    password: '#ced4da',
    firstname: '#ced4da',
    lastname: '#ced4da',
    username: '#ced4da',
  };
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private appService: AppService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
  });
  this.signUpForm.valueChanges.subscribe(() => {
    this.submitted = false;
    this.errorMessage = '';
    this.isErrorMessage = false;
    this.borderStyle.email = '#ced4da';
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  Register(){
    const { invalid, value } = this.signUpForm;
    this.submitted = true;
    if (invalid) {
      return;
    }
    this.user.xid = uuid.v4()
    this.apiService.post(`${Constants.apiBaseUrl}/user/save`, this.user).subscribe(user=>{
      
    })
  }
}
