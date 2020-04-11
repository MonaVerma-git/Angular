import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles : any = [];
  userChannel : any ;
  constructor(private coreService : CoreService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // this.getChannelInfo(); 
    this.getArticle();
  }

  getArticle(){
    document.getElementById("preloader").style.display = "block";
      this.coreService.get('article/get_all_user_channel_article').subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.articles = data.message
        } else {
          console.log(!data.message)
        }
      });
    }

    removeArticle(id){
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('article/remove',{id: id}).subscribe((data: any) => {
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
