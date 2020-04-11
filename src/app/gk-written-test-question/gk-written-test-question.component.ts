import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gk-written-test-question',
  templateUrl: './gk-written-test-question.component.html',
  styleUrls: ['./gk-written-test-question.component.css']
})
export class GKWrittenTestQuestionComponent implements OnInit {
  wittenTestForm: FormGroup;
  submitted: any = false;
  optionQA: any = [];
  question: any = [];
  id: any = [];
  options : any  = [];
  showQuestion: any;
  answertype : any = false;
  constructor(private coreService: CoreService,
    private toastrService: ToastrService,
    private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.getGKID();
    this.getQuestion();
    this.create_patheykram_form();
  }

  getGKID(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('written-test/get_gk_id').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.id = data.message.id;
        this.getQuestion();
        console.log(this.options);
      } else {
        console.log(!data.message)
      }
    });
    
  }

  getQuestion() {
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('written-test/get_all_question/' + this.id).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.question = data.message
        this.showQuestion = this.question[0];
        this.showQuestion.index = 1;
        console.log(this.showQuestion);
        this.answertype = this.showQuestion.isMutlipleSelet
        if(this.answertype){
          this.wittenTestForm.controls.answertype.reset('multi');
        }else{
          this.wittenTestForm.controls.answertype.reset('single');
        }
        
        this.wittenTestForm.controls.marks.reset(this.showQuestion.marks);
        this.wittenTestForm.controls.question.reset(this.showQuestion.question);
        this.wittenTestForm.controls.answerB.reset(false);
        this.wittenTestForm.controls.answerA.reset(false);
        this.wittenTestForm.controls.answerC.reset(false);
        this.wittenTestForm.controls.answerD.reset(false);
        if (this.showQuestion.isMutlipleSelet) {
          
          if (this.showQuestion.writtenTestOption[0].WrittenTestAnswers.length > 0) {
            this.wittenTestForm.controls.answerA.reset(true);
          }
          if (this.showQuestion.writtenTestOption[1].WrittenTestAnswers.length > 0) {
            this.wittenTestForm.controls.answerB.reset(true);
          }
          if (this.showQuestion.writtenTestOption[2].WrittenTestAnswers.length > 0) {
            this.wittenTestForm.controls.answerC.reset(true);
          }
          if (this.showQuestion.writtenTestOption[3].WrittenTestAnswers.length > 0) {
            this.wittenTestForm.controls.answerD.reset(true);
          }
        } else {
          
          if (this.showQuestion.writtenTestOption[0].WrittenTestAnswers.length > 0) {
            this.wittenTestForm.controls.answer.reset('a');
            this.wittenTestForm.controls.answerA.reset(true);
          }
          if (this.showQuestion.writtenTestOption[1].WrittenTestAnswers.length > 0) {
            this.wittenTestForm.controls.answer.reset('b');
            this.wittenTestForm.controls.answerB.reset(true);
          }
          if (this.showQuestion.writtenTestOption[2].WrittenTestAnswers.length > 0) {
            this.wittenTestForm.controls.answer.reset('c');
            this.wittenTestForm.controls.answerC.reset(true);
          }
          if (this.showQuestion.writtenTestOption[3].WrittenTestAnswers.length > 0) {
            this.wittenTestForm.controls.answer.reset('d');
            this.wittenTestForm.controls.answerD.reset(true);
          }
        }
        this.wittenTestForm.controls.optionA.reset(this.showQuestion.writtenTestOption[0].option);
        this.wittenTestForm.controls.optionB.reset(this.showQuestion.writtenTestOption[1].option);
        this.wittenTestForm.controls.optionC.reset(this.showQuestion.writtenTestOption[2].option);
        this.wittenTestForm.controls.optionD.reset(this.showQuestion.writtenTestOption[3].option);

        this.options.push({
          "answerOption" : this.wittenTestForm.value.optionA,
          "isAnswer" : this.wittenTestForm.value.answerA ,   
          "type" : "old",
          "_isDeleted" : false,
          "id" : this.showQuestion.writtenTestOption[0].id
        },{
          "answerOption" : this.wittenTestForm.value.optionB,
          "isAnswer" : this.wittenTestForm.value.answerB ,   
          "type" : "old",
          "_isDeleted" : false,
          "id" : this.showQuestion.writtenTestOption[1].id
        },{
          "answerOption" : this.wittenTestForm.value.optionC,
          "isAnswer" : this.wittenTestForm.value.answerC ,   
          "type" : "old",
          "_isDeleted" : false,
          "id" : this.showQuestion.writtenTestOption[2].id
        },{
          "answerOption" : this.wittenTestForm.value.optionD,
          "isAnswer" : this.wittenTestForm.value.answerD ,   
          "type" : "old",
          "_isDeleted" : false,
          "id" : this.showQuestion.writtenTestOption[3].id
        })
        console.log(this.options);
      } else {
        console.log(!data.message)
      }
    });
  }
  create_patheykram_form() {
    this.wittenTestForm = new FormGroup({
      question: new FormControl('', Validators.required),
      optionA: new FormControl('', Validators.required),
      optionB: new FormControl('', Validators.required),
      optionC: new FormControl('', Validators.required),
      optionD: new FormControl('', Validators.required),
      answer: new FormControl(''),
      answerA: new FormControl(''),
      answerB: new FormControl(''),
      answerC: new FormControl(''),
      answerD: new FormControl(''),
      answertype: new FormControl('', Validators.required),
      marks: new FormControl('', Validators.required)
    });

  }
  get f() { return this.wittenTestForm.controls; }
  removeWrittenTest(id) {
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('written-test/remove_question', { id: id }).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.getQuestion();
        this.toastrService.success('SucessFull', 'Question  remove Sucessfully');
      } else {
        console.log(!data.message);
      }
    });
  }

 updateWrittenTest() {

  if(!this.answertype){
      
    if(this.wittenTestForm.value.answer == 'a'){
      this.wittenTestForm.controls.answerA.reset(true);
    }
    if(this.wittenTestForm.value.answer == 'b'){
      this.wittenTestForm.controls.answerB.reset(true);
    }
    if(this.wittenTestForm.value.answer == 'c'){
      this.wittenTestForm.controls.answerC.reset(true);
    }
    if(this.wittenTestForm.value.answer == 'd'){
      this.wittenTestForm.controls.answerD.reset(true);
    }
    this.optionQA.push({
      question : this.wittenTestForm.value.question,
      optionA: this.wittenTestForm.value.optionA,
      optionB: this.wittenTestForm.value.optionB,
      optionC: this.wittenTestForm.value.optionC,
      optionD: this.wittenTestForm.value.optionD,
      // answer:  this.wittenTestForm.value.answer,
      answerA: this.wittenTestForm.value.answerA,
      answerB: this.wittenTestForm.value.answerB,
      answerC: this.wittenTestForm.value.answerC,
      answerD: this.wittenTestForm.value.answerD,
      marks: this.wittenTestForm.value.marks,
      answertype : this.answertype,
    });
  }else{
    this.optionQA.push({
      question : this.wittenTestForm.value.question,
      optionA: this.wittenTestForm.value.optionA,
      optionB: this.wittenTestForm.value.optionB,
      optionC: this.wittenTestForm.value.optionC,
      optionD: this.wittenTestForm.value.optionD,
      // answer:  this.wittenTestForm.value.answer,
      answerA: this.wittenTestForm.value.answerA,
      answerB: this.wittenTestForm.value.answerB,
      answerC: this.wittenTestForm.value.answerC,
      answerD: this.wittenTestForm.value.answerD,
      marks: this.wittenTestForm.value.marks,
      answertype : this.answertype,
    });
  }

   this.options.map((data,i)=>{
     if(i == 0 ){
      data.answerOption = this.wittenTestForm.value.optionA;
      if(data.isAnswer != this.wittenTestForm.value.answerA){
        
        if(data.isAnswer && !this.wittenTestForm.value.answerA){
          data.isAnswer = this.wittenTestForm.value.answerA ;
          // data.type = "";
          data._isDeleted = true;
        }else{
          data.isAnswer = this.wittenTestForm.value.answerA ;
          data.type = "new";
          data._isDeleted = false;
        }
      
      }
     }
     if(i == 1){
      data.answerOption = this.wittenTestForm.value.optionB;
      if(data.isAnswer != this.wittenTestForm.value.answerB){
        if(data.isAnswer && !this.wittenTestForm.value.answerB){
          data.isAnswer = this.wittenTestForm.value.answerB ;
          // data.type = "";
          data._isDeleted = true;
        }else{
          data.isAnswer = this.wittenTestForm.value.answerB ;
          data.type = "new";
          data._isDeleted = false;
        }
      }
     }
     if(i == 2){
      data.answerOption = this.wittenTestForm.value.optionC;
      if(data.isAnswer != this.wittenTestForm.value.answerC){
        if(data.isAnswer && !this.wittenTestForm.value.answerC){
          data.isAnswer = this.wittenTestForm.value.answerC ;
          // data.type = "";
          data._isDeleted = true;
        }else{
          data.isAnswer = this.wittenTestForm.value.answerC ;
          data.type = "new";
          data._isDeleted = false;
        }
      }
     }
     if(i==3){
      data.answerOption = this.wittenTestForm.value.optionD;
      if(data.isAnswer != this.wittenTestForm.value.answerD){
        if(data.isAnswer && !this.wittenTestForm.value.answerD){
          data.isAnswer = this.wittenTestForm.value.answerD ;
          // data.type = "";
          data._isDeleted = true;
        }else{
          data.isAnswer = this.wittenTestForm.value.answerD ;
          data.type = "new";
          data._isDeleted = false;
        }
      }
     }
    
    
   })
  // this.options.push({
  //   "answerOption" : this.wittenTestForm.value.optionA,
  //   "isAnswer" : this.wittenTestForm.value.answerA ,   
  //   "type" : "old",
  //   "_isDeleted" : false,
  //   "id" : this.showQuestion.writtenTestOption[0].id
  // },{
  //   "answerOption" : this.wittenTestForm.value.optionB,
  //   "isAnswer" : this.wittenTestForm.value.answerB ,   
  //   "type" : "old",
  //   "_isDeleted" : false,
  //   "id" : this.showQuestion.writtenTestOption[1].id
  // },{
  //   "answerOption" : this.wittenTestForm.value.optionC,
  //   "isAnswer" : this.wittenTestForm.value.answerC ,   
  //   "type" : "old",
  //   "_isDeleted" : false,
  //   "id" : this.showQuestion.writtenTestOption[2].id
  // },{
  //   "answerOption" : this.wittenTestForm.value.optionD,
  //   "isAnswer" : this.wittenTestForm.value.answerD ,   
  //   "type" : "old",
  //   "_isDeleted" : false,
  //   "id" : this.showQuestion.writtenTestOption[3].id
  // })
  let createpatheykram = {
    "question" : this.wittenTestForm.value.question,
    "isMutlipleselete" : this.answertype,
    "marks" : this.wittenTestForm.value.marks,
    "patheykramId":this.id,
    "gkQuestions" : false,
    "options":this.options,
    'id' : this.showQuestion.id 
  }
  if(createpatheykram.isMutlipleselete == 'true'){
    createpatheykram.isMutlipleselete = true;
  }else{
    createpatheykram.isMutlipleselete = false;
  }
  console.log(createpatheykram);
  document.getElementById("preloader").style.display = "block";
    this.coreService.post('written-test/update_question', createpatheykram).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.getQuestion();
        this.toastrService.success('SucessFull', 'Question Updated Sucessfully');
      } else {
        console.log(!data.message)
      }
    });
  }
  displayContent(i){
    this.showQuestion = this.question[i];
    this.showQuestion.index = i + 1;
  }
}
