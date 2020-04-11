import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email : any = '';
  vEmail : any = true;
  message: any = '';
  password : any = '';
  vPassword : any = true;
  error : any = true ;
  constructor(private coreService : CoreService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    let token = localStorage.getItem('accessToken');
    if(token){
      this.router.navigate(['/dashboard']);
    }else{
      
    }
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
}
