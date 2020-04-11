import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic';

// export interface State {
//   flag: string;
//   name: string;
//   population: string;
// }

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
  words : any = [];
  language : any = [];
  ranks: any = [1,2,3,4,5];
  dictionaryHeader : any = ['Chanttisdagi','Hindi','English','.'];
  dictionary:any =[];
  languageActive : any = '';
  showDetails : any = {};
  activeId : any = -1;
  dictionary_words : any = [];
  stateCtrl = new FormControl();
  // filteredStates: Observable<State[]>;
  public Editor = DecoupledEditor;
  states: any = [];
  constructor(private coreService : CoreService, 
    private router : Router,
    private toastrService: ToastrService) {
    this.stateCtrl.valueChanges.subscribe((result) => {
      // console.log(result);
      this.searchWord(result);
    });
   }
  ngOnInit() {
    this.getWords();
    this.getLanguage();
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
  getLanguage(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('dictionary/get_language').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.dictionary_words = data.message;
        data.message.map((lag)=>{
          console.log(lag.lanuage_name != 'Chattisgadi' && lag.lanuage_name != 'Hindi' && lag.lanuage_name  != 'English' );
          if(lag.lanuage_name != 'Chattisgadi' && lag.lanuage_name != 'Hindi' && lag.lanuage_name  != 'English' ){
            this.language.push(lag)  
            console.log(this.language);
          }
        })
        
      } else {
        console.log(!data.message)
      }
    });
  }

 addLangugae(langugae){
    this.languageActive =langugae.lanuage_name;
    this.dictionaryHeader  = ['Chanttisdagi','Hindi','English', langugae.lanuage_name,'.'];
        let dictionaryData = [];
        this.words.map((dic ,i)=>{
          let chanttisgadi = dic.word;
          let english = '';
          let hindi = '';
          let other = '';
          dic.words.map((dicSub ,j)=>{
            if(dicSub.language.lanuage_name == 'English'){
              english = dic.word;
            }else{
            if( dicSub.language.lanuage_name  == 'Hindi'){
              hindi = dic.word;
            }else if(dicSub.language.lanuage_name  == langugae.lanuage_name){
              other = dic.word;
            }}
            if(dic.words.length -1 == j){
              let dics= [];
              if(other == ''){
                other = 'X';
              }
              dics.push({"id" : dic.id,
              'name' : dic.word,
              description : dic.description})
              dics.push({'name' : english})
              dics.push({'name' : hindi})
              dics.push({'name' : other})
              dics.push({'name' : 'Read More'})
              dictionaryData.push(dics);
            }

          });
          if(this.words.length - 1 == i){
            this.dictionary = dictionaryData;
            console.log(this.dictionary)
          }
        })
  }
  searchWord(q){
    console.log(q);
    if(q != ''){
      document.getElementById("preloader").style.display = "block";
    this.coreService.get('dictionary/search_word/'+q).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {

        this.words = data.message;
        this.states = this.words;
        let dictionaryData = [];
        this.words.map((dic ,i)=>{
          let chanttisgadi = dic.word;
          let english = '';
          let hindi = '';
          dic.words.map((dicSub ,j)=>{
            if(dicSub.language.lanuage_name == 'English'){
              english = dic.word;
            }else{
            if( dicSub.language.lanuage_name  == 'Hindi'){
              hindi = dic.word;
            }}
            if(dic.words.length -1 == j){
              let dics= [];
              dics.push({
                "id" : dic.id,
              'name' : dic.word,
              description : dic.description
            })
              dics.push({'name' : english})
              dics.push({'name' : hindi})
              dics.push({'name' : 'Read More'})
              dictionaryData.push(dics)
              // console.log(dictionaryData)
            }

          });
          if(this.words.length - 1 == i){
            this.dictionary = dictionaryData;
            console.log(this.dictionary)
          }
        })
      } else {
        console.log(!data.message)
      }
    });
  }else{
    }
  }

  readMore(data , name, tem){
    console.log(tem);
    console.log(data);
    if(name == 'Read More'){
      this.router.navigate(['/dictionary', tem])
    }
  }

  getWords(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('dictionary/get_word').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.words = data.message;
        let dictionaryData = [];
        this.words.map((dic ,i)=>{
          let chanttisgadi = dic.word;
          let english = '';
          let hindi = '';
          dic.words.map((dicSub ,j)=>{
            if(dicSub.language.lanuage_name == 'English'){
              english = dic.word;
            }else{
            if( dicSub.language.lanuage_name  == 'Hindi'){
              hindi = dic.word;
            }}
            if(dic.words.length -1 == j){
              let dics= [];
              dics.push({
                "id" : dic.id,
              'name' : dic.word,
              description : dic.description
            })
              dics.push({'name' : english})
              dics.push({'name' : hindi})
              dics.push({'name' : 'Read More'})
              dictionaryData.push(dics)
              // console.log(dictionaryData)
            }

          });
          if(this.words.length - 1 == i){
            this.dictionary = dictionaryData;
            console.log(this.dictionary)
          }
        })
      } else {
        console.log(!data.message)
      }
    });
  }


  deleteWord(id){
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('dictionary/delete_word',{id:id}).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.getWords();
        this.toastrService.success('SucessFull', 'Word deleted Sucessfully');
      } else {
        console.log(!data.message)
      }
    });  
  }

}
