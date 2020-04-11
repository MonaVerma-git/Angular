import { Component, OnInit } from '@angular/core';
import {CoreService} from '../../app/shared/services/core.service';
import {AuthService} from '../../app/shared/guard/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : any = '';
  backEndError : any = '';
  vEmail : any = true;
  message: any = '';
  password : any = '';
  vPassword : any = true;
  error : any = true ;
  constructor(private coreService : CoreService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  validateEmail() {
    if (this.email == '') {
      this.message = `Email can't be empty.`;
      this.vEmail = false;
    } else if (this.message == '' && this.email.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$") == null) {
      this.message = `please insert valid email address`;
      this.vEmail = false;
    } else {
      this.vEmail = true;
    }
  }

  validEmail() {
    this.vEmail = true;
  }

  validatePassword() {
    if (this.password == '' ) {
      this.message = `Password can't be empty.`;
      this.vPassword = false;
    }
  }

  validPassword() {
    this.vPassword = true;
  }

  login(){

    this.backEndError = '';
    if((this.email != '' && this.password != '') && 
    (this.email != null && this.password != null)){
      let data = {
        'email': this.email,
        'password': this.password
      }
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('admin/login' , data).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.authService.setLocalStorage(data);
          this.router.navigate(['/dashboard']);
        } else {
          this.backEndError = data.message;
          this.error = true;
        }
      });                 
        }else{
          if(this.email == ''){
              this.message = `Email can't be empty.`;
              this.vEmail = false;                      
          }else{
            if(this.password == ''){
              this.message = `Password can't be empty.`;
              this.vPassword = false;                      
          }
        }
      }
  }
  closeError(){
    this.error = false;
    this.backEndError  = '';
  }
}
