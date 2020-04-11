import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CoreService } from 'app/shared/services/core.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnInit {
  articles : any = [];
  articleContent : any ;
  id: any = '';
  ranks: any = [1,2,3,4,5];
  public Editor = DecoupledEditor;
  constructor(private coreService : CoreService,
    private toasterService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');
  //   this.activatedRoute.queryParams.subscribe(params => {
  //     this.id = params['id'];
  //     console.log(params);
  //     // console.log(date); // Print the parameter to the console. 
  // });
    this.getArticle();
    this.getAllArticle();
  }


  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement(),
      editor.isReadOnly = true
    );
  }

  config = {
    mediaEmbed: {
      previewsInData: true
    },
    removePlugins: 'toolbar'
  }

  getArticle(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('article/get_article/' + this.id).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.articleContent = data.message
      } else {
        console.log(!data.message)
      }
    });
  }
  getAllArticle(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('article/get_latest_article').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.articles = data.message
      } else {
        console.log(!data.message)
      }
    });
  }
}
