import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete, MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {
  createArticleForm : FormGroup;
  submitted : any = false;
  public Editor = ClassicEditor;
  message : any = ''; 
  fileData: File = null;
  previewUrl:any = null;
  id : any;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  option : any = ['options'];
  keyword = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  allKeyword: any =[];
  oldKeyWord: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywords: any = [];
  keywordLength = false;
  filteredKeyword: Observable<string[]>;
  @ViewChild('keywordInput',{static: false}) keywordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static: false}) matAutocomplete: MatAutocomplete;
  
  constructor(private coreService : CoreService,
    private http: HttpClient,
    private activatedRoute : ActivatedRoute,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');
    this.getArticle();
    this.create_article_form();
    this.getKeyword("dff");
    this.keyword.valueChanges.subscribe((result) => {
      if (result != '' && result != null) {
        this.getKeyword(result);
      }
    });
  }

  getArticle(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('article/get_article/' + this.id).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.createArticleForm.controls.article.reset(data.message.article_text);
        this.createArticleForm.controls.article_title.reset(data.message.article_title);
        var tags = data.message.ArticleKeyword;

        for (var i = 0; i < tags.length; i++) {
          let data = {
            "type": 'add',
            'name': tags[i].Keyword.name,
            "id": tags[i].id
          }
          this.keywords.push(data);

        }
        this.oldKeyWord = Object.assign([], this.keywords);
      } else {
        console.log(!data.message)
      }
    });
  }
  getKeyword(keyword) {
    keyword = keyword.trim();
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('keyword/search_keyword').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.allKeyword = data.message;
        this.keywords.map((key) => {
          this.allKeyword.map((allKey, i) => {
            if (allKey.name == key.name) {
              this.allKeyword.splice(i);
              return false;
            }
          })
        })
        let isAlreadyHas = false;
        this.keywords.map((key) => {
          if (key.name == keyword) {
            isAlreadyHas = true;
          }
        })
        if (!isAlreadyHas) {
          let data = {
            "id": '-1',
            "name": keyword.trim() + '(New Label)'
          }
          this.allKeyword.push(data);
        }
        this.filteredKeyword = this.allKeyword;
      } else {
        console.log(!data.message)
      }
    });  
   
  }

  getId(name) {
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('keyword/checkKeyword/' +name).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        if (data.message.length != 0) {
          let data1 = {
            "name": data.message[0].name,
            "type": "old",
            "id": data.message[0].id
          }
          this.allKeyword = this.allKeyword.filter(key => key.id !== data.message[0].id);
          this.keywords.push(data1);
        }
        else {
          name = name.split('(');
          if (name[1] == 'New Label)') {
            let data = {
              "type": 'new',
              "name": name[0]
            }
            this.keywords.push(data);

          }

        }
      } else {
        console.log(!data.message)
      }
    }); 
  }


  // Addkeyword(id, name) {
  //   if (id == '-1') {
  //     name = name.split('(')[0];
  //     let data = {
  //       "type": 'new',
  //       "name": name
  //     }
  //     this.keywords.push(data);
  //   } else {
  //     let data = {
  //       "type": 'old',
  //       "id": id,
  //       "name": name
  //     }
  //     this.keywords.push(data);
  //   }

  // }
  private _filter(value: any): string[] {
    this.getKeyword(value);
    let allEngineersLessSelected = this.allKeyword.filter(key => this.keywords.indexOf(key) < 0);
    let result = allEngineersLessSelected.filter(key => key.name.toLowerCase().includes((value).trim().toLowerCase()));
    let isAlreadyHas = false;
    this.keywords.map((key) => {
      if (key.name == value) {
        isAlreadyHas = true;
      }
    })
    if (!isAlreadyHas) {
      let data = {
        "id": '-1',
        "name": value.trim() + '(New Label)'
      }
      result.push(data)
    }
    return result;
    }
  

   // chips feathure
   add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        if (this.keywords.length >= 5) {
          this.keywordLength = true;
        } else {
          let isAlreadyHas = false;
          let data = {
            "type": 'new',
            "name": value.trim()
          }
          this.keywords.map((key) => {
            if (key.name == data.name) {
              isAlreadyHas = true;
            }
          })
          if (!isAlreadyHas) {
            this.keywords.push(data);

          }
        }
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.keyword.setValue(null);
    }
  }
  chooseFirstOption() {

  }
  remove(keyword): void {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
      if (index == 0) {
        this.createArticleForm.value.keyword = "";
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.keywords.length < 5) {
      this.getId(event.option.value);
      this.keywordInput.nativeElement.value = '';
      this.keyword.setValue(null);
    }

  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
  this.uploadImage();
}
  uploadImage(){
    const formData = new FormData();
    formData.append('files', this.fileData);
     
    this.fileUploadProgress = '0%';
 
    this.http.post('gs://fir-61502.appspot.com/photos/featured', formData, {
      reportProgress: true,
      observe: 'events'   
    })
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        console.log(events.body);          
        alert('SUCCESS !!');
      }
         
    }) 
  }

  create_article_form(){
    this.createArticleForm = new FormGroup({
      article_title: new FormControl('',Validators.required),
      article: new FormControl('',Validators.required),
      keyword: new FormControl('', Validators.required),
    });
  }

  get f() { return this.createArticleForm.controls; }
  
  create_article(){
    let updateKeyword = [];
    this.oldKeyWord.map((oldKey) => {
      let isConditionMatch = false;
      for (let i = 0; i < this.keywords.length; i++) {
        let newKey = this.keywords[i];
        if (oldKey.name != newKey.name) {
          isConditionMatch = true;
        } else {
          if (oldKey.name == newKey.name) {
            newKey.type = 'already'
            isConditionMatch = false;
            break;
          }
        }
      }
      if (isConditionMatch) {
        let data = {
          "type": "removed",
          "id": oldKey.id,
          "name": oldKey.name
        }
        updateKeyword.push(data);
      }
    })
    for (let i = 0; i < this.keywords.length; i++) {
      if (this.keywords[i].type != 'already') {
        updateKeyword.push(this.keywords[i]);
      }
    }
    if (updateKeyword.length == 0 && this.keywords.length != 0) {
      this.createArticleForm.controls.keyword.reset('gvgh');
    }
    if (updateKeyword.length != 0) {
      this.createArticleForm.controls.keyword.reset(updateKeyword);
    }
    if (this.keywords.length != 0) {
      this.createArticleForm.controls['keyword'].setValue(this.keywords);
    }
    console.log(this.createArticleForm);
    this.submitted = true;
    if(this.createArticleForm.invalid){
      // return false
    }else{
      let createArticle = {
        article_title : this.createArticleForm.value.article_title,
        article_text : this.createArticleForm.value.article,
        articleImage : [],
        id:this.id,
        keywords: updateKeyword,
      }
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('article/update_article' , createArticle).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.router.navigate(['/article' , this.id]);
          // this.toasterService.pop('sucess', '', "Article Sucessfully created");
          this.toastrService.success('SucessFull', 'Article Sucessfully created');
        } else {
          console.log(!data.message)
        }
      });
    }
  }

}
