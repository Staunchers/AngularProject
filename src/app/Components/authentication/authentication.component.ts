import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private mode:string;
  private authForm;
  private cnfPwdArr;
  constructor(private activeRoute:ActivatedRoute, private router:Router)
  {
    this.authForm = new FormGroup(
      {
        'email':new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null,[Validators.required, Validators.minLength(6)]),
        'cnfPwdArray':new FormArray([])
      });

    this.activeRoute.params.subscribe(
      params =>
      {
      this.mode =  params['mode'];
      if(this.mode == 'SignUp' && (<FormArray>this.authForm.get('cnfPwdArray')).controls.length < 1 )
      {
        const cnfrmPassword = new FormControl(null,[Validators.required,this.Validator_ConfirmPassword.bind(this)]);
        this.authForm.get('cnfPwdArray').push(cnfrmPassword);
        this.cnfPwdArr = (<FormArray>this.authForm.get('cnfPwdArray')).controls;
      }
      });
  }

  ngOnInit() {

  }

  SubmitForm()
  {
    console.log(this.authForm);
  }

  Validator_ConfirmPassword(control:FormControl){
    var pwd = (<FormControl>this.authForm.get('password')).value;
    if ( pwd == null || pwd == '')
    {
      return null;
    }
    if(control.value != (<FormControl>this.authForm.get('password')).value)
    {
      return {notMatching:true}
    }
    return null;
  }
}
