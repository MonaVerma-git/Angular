import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gk-topic',
  templateUrl: './gk-topic.component.html',
  styleUrls: ['./gk-topic.component.css']
})
export class GkTopicComponent implements OnInit {
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
      this.coreService.get('patheykram/get_gk_topic').subscribe((data: any) => {
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
    this._updateName = data.patheykram_title
  }
  create(){
    this._updateName = '';
  }
  updateName(){
    let data = {id: this._updateId , patheykram_title: this._updateName};
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('patheykram/update_gk_patheykram',data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.getClass();
        this.toastrService.success('SucessFull', 'Patheykram Update Sucessfully');
      } else {
        console.log(!data.message)
      }
    });
  }

  createName(){
    let data = {id: this._updateId , patheykram_text: this._updateName};
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('patheykram/create_gk_topic',data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.getClass();
        this.toastrService.success('SucessFull', 'Patheykram Update Sucessfully');
      } else {
        console.log(!data.message)
      }
    });
  }

    removeClass(id){
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('patheykram/remove_patheykram',{id: id}).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.getClass();
          this.toastrService.success('SucessFull', 'Patheykram remove Sucessfully');
        } else {
          console.log(!data.message)
        }
      });
    }
}
