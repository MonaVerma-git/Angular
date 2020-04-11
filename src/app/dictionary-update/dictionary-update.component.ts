import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  MatAutocomplete } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-dictionary-update',
  templateUrl: './dictionary-update.component.html',
  styleUrls: ['./dictionary-update.component.css']
})
export class DictionaryUpdateComponent implements OnInit {
  createForm : FormGroup;
  submitted : any = false;
  public Editor = ClassicEditor;
  message : any = ''; 
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  add_language : any = '';
  language: any = [];
  step : any = false;
  word : any = [];

  dictionaryWord : any = [];
  id:any = '';
  filteredKeyword: Observable<string[]>;
  @ViewChild('keywordInput',{static: false}) keywordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static: false}) matAutocomplete: MatAutocomplete;
  constructor(private coreService : CoreService,
    private http: HttpClient,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');
    this.geDictionaryUpdate();
    this.create_form();
    this.selectLanguage();
  }


  geDictionaryUpdate(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('dictionary/get_word/'+this.id).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.dictionaryWord = data.message;
        // this.language = data.message;
        this.word.push({
          "word" : data.message.word,
          "languageId" : data.message.language.id,
          "language" : data.message.language.lanuage_name,
          "isDeleted" : false,
          'type' : 'old',
          'id':data.message
        })
        data.message.words.map((word,i)=>{
          this.word.push({
            "word" : word.word,
            "languageId" : word.language.id,
            "language" : word.language.lanuage_name,
            "isDeleted" : false,
            'type' : 'old',
            'id':word.id
          });
        })
        this.createForm.controls.description.reset(data.message.description)
      } else {
        console.log(!data.message)
      }
    });
  }



  executeStep(){
    this.step = !this.step;
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

  create_form(){
    this.createForm = new FormGroup({
      langauge : new FormControl(''),
      word : new FormControl(''),  
      description : new FormControl('',Validators.required),
    });
  }

  get f() { return this.createForm.controls; }
  
  create_dictionary_word(){
    
    
    this.submitted = true;
    if(this.createForm.invalid){
      // return false
    }else{
      let createWord = {
        "description" : this.createForm.value.description,
        "dictionary" : this.word,
        id:this.id
      }
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('dictionary/update_language' , createWord).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.router.navigate(['/dictionary']);
          this.toastrService.success('SucessFull', 'Word Updated Sucessfully');
        } else {
          console.log(!data.message)
        }
      });
    }
  }

  deleteWord(i){
    this.word[i].isDeleted = true;
  }

  addWord(){
    if(this.createForm.value.word == '' || 
    this.createForm.value.language == ''){

    }else{
      console.log('check');
    this.language.map((lan)=>{
      console.log(lan.id + "==" + this.createForm.value.langauge )
      if(lan.id == this.createForm.value.langauge){
        this.word.push({
          "word" : this.createForm.value.word,
          "languageId" : this.createForm.value.langauge,
          "language" : lan.lanuage_name,
          "type":'new',
          "isDeleted" : false
        });
        this.createForm.controls.word.reset('')
        this.createForm.controls.langauge.reset(this.language[1].id);
        console.log(this.word);
      }
    })

    } 
    
  }



  AddLanguage(value){
    if(value == 'Add'){
      $('#addLanguage').modal('show')
    }
  }

  selectLanguage(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('dictionary/get_language').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.language = data.message;
        
        this.language.push({
          lanuage_name : 'Add Language',
          id : 'Add'
        })
        this.createForm.controls.langauge.reset(data.message[data.message.length - 2 ].id);
      } else {
        console.log(!data.message)
      }
    });  
  }

  createLanguage(){
    $('#addLanguage').modal('show')
    let createLanguageData = {
      "language" : this.add_language
    }
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('dictionary/create_language',createLanguageData).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.selectLanguage();
      } else {
        console.log(!data.message)
      }
    });  
  }

  
}
