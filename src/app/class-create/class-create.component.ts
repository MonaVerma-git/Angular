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
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})
export class ClassCreateComponent implements OnInit {
  createpatheykramForm : FormGroup;
  submitted : any = false;
  public Editor = ClassicEditor;
  message : any = ''; 
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  option : any = ['options'];
  keyword = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  allKeyword: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  keywords: any = [];
  keywordLength = false;
  subject : any = [];
  class: any = [];
  step : any = false;
  filteredKeyword: Observable<string[]>;
  @ViewChild('keywordInput',{static: false}) keywordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static: false}) matAutocomplete: MatAutocomplete;
  id: any = '';
  constructor(private coreService : CoreService,
    private http: HttpClient,
    private toastrService: ToastrService,
    private activatedRoute : ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.id =  this.activatedRoute.snapshot.paramMap.get('id');
    this.create_patheykram_form();
    // this.getKeyword("dff");
    // this.getSubject();
    this.filteredKeyword = this.keyword.valueChanges.pipe(
      startWith(null), map(keyword =>
        keyword ? this._filter(keyword) : this.allKeyword
      )
    );
  }

  executeStep(){
    this.step = !this.step;
  }

  getKeyword(keyword) {
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('keyword/search_keyword').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.allKeyword = data.message;
      } else {
        console.log(!data.message)
      }
    });  
   
  }
  getSubject(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('subject/get_subject').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.subject = data.message;
        this.createpatheykramForm.controls.subject.reset(this.subject[0].id);
        this.selectClass(this.subject[0].id);

      } else {
        console.log(!data.message)
      }
    });
  }

  selectClass(id){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('class/get_class/'+id).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.class = data.message;
        this.createpatheykramForm.controls.class.reset(this.class[0].id);
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
        } else {
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


  Addkeyword(id, name) {
    if (id == '-1') {
      name = name.split('(')[0];
      let data = {
        "type": 'new',
        "name": name
      }
      this.keywords.push(data);
    } else {
      let data = {
        "type": 'old',
        "id": id,
        "name": name
      }
      this.keywords.push(data);
    }

  }
  private _filter(value: any): string[] {
    value = value.trim();
    console.log(this.allKeyword);
    let allEngineersLessSelected = this.allKeyword.filter(key => this.keywords.indexOf(key) < 0);
    let result = allEngineersLessSelected.filter(key => key.name.toLowerCase().includes((value).trim().toLowerCase()));
    let isAlreadyHas = false;
    this.keywords.map((key) => {
      if (key.name == value.trim()) {
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
          // this.keywords.push(value.trim());
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
        this.createpatheykramForm.value.keyword = "";
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

  create_patheykram_form(){
    this.createpatheykramForm = new FormGroup({
      patheykram_image : new FormControl(''),
      patheykram_title: new FormControl('',Validators.required),
    });
  }

  get f() { return this.createpatheykramForm.controls; }
  
  create_patheykram(){
    this.submitted = true;
    if(this.createpatheykramForm.invalid){
      // return false
    }else{
      let createpatheykram = {      
        name : this.createpatheykramForm.value.patheykram_title,
        patheykramImage : [],
        subjectId : this.id,        
      }
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('class/create_class' , createpatheykram).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        console.log(data);
        if (!data.error) {
          this.router.navigate(['/patheykram']);
          this.toastrService.success('SucessFull', 'Class Sucessfully created');
        } else {
          console.log(!data.message)
        }
      });
    }
  }

}
