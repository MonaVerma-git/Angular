import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patheykram',
  templateUrl: './patheykram.component.html',
  styleUrls: ['./patheykram.component.css']
})
export class PatheykramComponent implements OnInit {
  subjects : any = [];
  _updateId : any = 0;
  _updateName : any = '';
  constructor(private coreService : CoreService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getClass(); 
  }

  getClass(){
    document.getElementById("preloader").style.display = "block";
      this.coreService.get('class/get_class').subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.subjects = data.message
        } else {
          console.log(!data.message)
        }
      });
  }

  edit(data){
    this._updateId = data.id,
    this._updateName = data.name
  }
  updateName(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('class/update',{id: this._updateId , name: this._updateName}).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.getClass();
        this.toastrService.success('SucessFull', 'Class Update Sucessfully');
      } else {
        console.log(!data.message)
      }
    });
  }

    removeClass(id){
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('class/remove',{id: id}).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.getClass();
          this.toastrService.success('SucessFull', 'Class remove Sucessfully');
        } else {
          console.log(!data.message)
        }
      });
    }
}
