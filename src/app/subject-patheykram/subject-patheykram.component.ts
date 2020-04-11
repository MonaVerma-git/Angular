import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subject-patheykram',
  templateUrl: './subject-patheykram.component.html',
  styleUrls: ['./subject-patheykram.component.css']
})
export class SubjectPatheykramComponent implements OnInit {
  class : any = [];
  id : any = 0;
  _updateId : any = 0;
  _updateName : any = '';
  constructor(private coreService : CoreService,
    private toastrService: ToastrService, private activatedRoute : ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');
    this.getSubject(); 
  }

  getSubject(){
    document.getElementById("preloader").style.display = "block";
      this.coreService.get('subject/get_subject/'+this.id).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.class = data.message
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
    this.coreService.post('subject/update',{id: this._updateId , name: this._updateName}).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.getSubject();
        this.toastrService.success('SucessFull', 'Subject update Sucessfully');
      } else {
        console.log(!data.message)
      }
    });
  }

    removeSubject(id){
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('subject/remove',{id: id}).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.getSubject();
          this.toastrService.success('SucessFull', 'Subject remove Sucessfully');
        } else {
          console.log(!data.message)
        }
      });
    }
}
