import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gk-written-test',
  templateUrl: './gk-written-test.component.html',
  styleUrls: ['./gk-written-test.component.css']
})
export class GKWrittenTestComponent implements OnInit {
  wittenTestForm : FormGroup;
  submitted : any = false;
  optionQA : any = [];
  id : any;
  answertype  ; any = false;
  constructor(private coreService : CoreService,
    private activatedRoute : ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');;
    this.create_patheykram_form();
  }

  getValue(event){
    console.log(event);
    console.log(this.wittenTestForm.value.answertype);
    if(this.wittenTestForm.value.answertype == 'multi'){
      this.answertype = true;
      console.log('true');  
    }else{
      this.answertype = false;  
      console.log('false');
    }
    //  this.answertype = this.wittenTestForm.value.answertype;
     console.log(this.answertype);
  }

  

  create_patheykram_form(){
    this.wittenTestForm = new FormGroup({
      question : new FormControl('',Validators.required),
      optionA: new FormControl('' ,Validators.required),
      optionB: new FormControl('' ,Validators.required) ,
      optionC: new FormControl('' ,Validators.required),
      optionD:new FormControl('' ,Validators.required),
      answer: new FormControl(''),
      answerA: new FormControl(''),
      answerB: new FormControl(''),
      answerC: new FormControl(''),
      answerD: new FormControl(''),
      answertype : new FormControl('' ,Validators.required),
      marks : new FormControl('' ,Validators.required)
    });
    this.wittenTestForm.controls.answertype.reset('single');
    this.wittenTestForm.controls.answerB.reset(false);
    this.wittenTestForm.controls.answerA.reset(false);
    this.wittenTestForm.controls.answerC.reset(false);
    this.wittenTestForm.controls.answerD.reset(false);
  }

  addQuestionAnswer(){
    console.log(this.wittenTestForm.value.answertype);
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
        answertype : this.wittenTestForm.value.answertype,
      });
    }
    this.wittenTestForm.controls.answertype.reset('single');
    this.wittenTestForm.controls.marks.reset();
    this.wittenTestForm.controls.question.reset();
    this.wittenTestForm.controls.answerB.reset(false);
    this.wittenTestForm.controls.answerA.reset(false);
    this.wittenTestForm.controls.answerC.reset(false);
    this.wittenTestForm.controls.answerD.reset(false);
    this.wittenTestForm.controls.answer.reset();
    this.wittenTestForm.controls.optionA.reset();
    this.wittenTestForm.controls.optionB.reset();
    this.wittenTestForm.controls.optionC.reset();
    this.wittenTestForm.controls.optionD.reset();
    
  }

  get f() { return this.wittenTestForm.controls; }
  
  create_patheykram(){   
    // console.log(this.wittenTestForm);
    this.submitted = true;
    // if(this.wittenTestForm.invalid){
    //   return false
    // }else{
      let submitData = [];
      this.optionQA.map((data ,i)=>{
        let createpatheykram = {
          "question" : data.question,
          "isMutlipleselete" : data.answertype,
          "marks" : data.marks,
          "patheykramId":this.id,
          "gkQuestions" : false,
          "options":[{
            "answerOption" : data.optionA,
            "isAnswer" : data.answerA
          },{
            "answerOption" : data.optionB,
            "isAnswer" : data.answerB
          },{
            "answerOption" : data.optionC,
            "isAnswer" : data.answerC
          },{
            "answerOption" : data.optionD,
            "isAnswer" : data.answerD
          }]
        }
        submitData.push(createpatheykram);
        if(i == this.optionQA.length - 1 ){
          console.log(submitData);
          document.getElementById("preloader").style.display = "block";
          this.coreService.post('written-test/add_questions', {'testquestion' : submitData}).subscribe((data: any) => {
            document.getElementById("preloader").style.display = "none";
            console.log(data);
            if (!data.error) {
              // console.log(data.id);
              this.router.navigate(['/gk-written-test-question',this.id]);
              this.toastrService.success('SucessFull', 'Test Questions Added Sucessfully created');
            } else {
              console.log(!data.message)
            }
          });
        }
      })
  }

}
