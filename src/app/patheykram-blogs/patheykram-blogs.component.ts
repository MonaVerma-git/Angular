import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patheykram-blogs',
  templateUrl: './patheykram-blogs.component.html',
  styleUrls: ['./patheykram-blogs.component.css']
})
export class PatheykramBlogsComponent implements OnInit {
  articles : any = [];
  subjectId : any ;
  classId : any ;
  constructor(private coreService : CoreService,
    private toastrService: ToastrService,
    private authService: AuthService,private activatedRoute : ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.subjectId =  this.activatedRoute.snapshot.paramMap.get('subjectId');
    this.classId =  this.activatedRoute.snapshot.paramMap.get('classId');
    this.getArticle();
  }

  getArticle(){
    document.getElementById("preloader").style.display = "block";
      this.coreService.get('patheykram/get_all_patheykram/'+this.subjectId + '/' + this.classId).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.articles = data.message
        } else {
          console.log(!data.message)
        }
      });
    }

    removePatheykram(id){
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('patheykram/remove_patheykram',{id: id}).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.getArticle();
          this.toastrService.success('SucessFull', 'Article remove Sucessfully');
        } else {
          console.log(!data.message)
        }
      });
    }
}
