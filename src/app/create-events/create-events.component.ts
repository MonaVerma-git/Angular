import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent implements OnInit {
  createForm : FormGroup;
  thithi_name : any;
  nakshtra = [
  "आश्विन", "भरणी", "कृतिका", "रोहिणी", 
  "मृगशिरा", "आर्द्रा" ,"पुनर्वसु", "पुष्य", 
  "आश्लेषा", "मघा", "पूर्वा फाल्गुनी", "उत्तरा फाल्गुनी",
  "हस्त", "चित्रा", "स्वाति", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा", 
  "उत्तराषाढ़ा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वा भाद्रपद", "उत्तरा भाद्रपद" , "रेवती"
  ]
  teharJaynti : any = false;
  mahuratJaynti : any = false;
  constructor(private coreService : CoreService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.create_form();
    $('.fa-calendar').click(function(event) {
      // $("#datepicker").click();
      console.log(event);
      event.preventDefault();
      $('#datepicker').click();
    });
    console.log(this.teharJaynti);
  }

  update(type){
    if(type == 'mahurat' ){
      this.mahuratJaynti = !this.mahuratJaynti;      
    }else{
      this.teharJaynti = !this.teharJaynti;
    }
  }

  create_form(){
    this.createForm = new FormGroup({
      todayDate: new FormControl('',Validators.required),
      chattisgatiMahina: new FormControl('',Validators.required),
      pakhsName: new FormControl('',Validators.required),
      tithiName: new FormControl('',Validators.required),
      nakshraName: new FormControl('',Validators.required),
      nakshraStartDate: new FormControl('',Validators.required),
      nakshraEndDate: new FormControl('',Validators.required),
      mahurate_mahuratName: new FormControl('',Validators.required),
      mahurate_startTime: new FormControl('',Validators.required),
      mahurate_endTime: new FormControl('',Validators.required),
      mahurate_isArticle: new FormControl('',Validators.required),
      mahurate_articleId: new FormControl('',Validators.required),
      jayanti_mahuratName: new FormControl('',Validators.required),
      jayanti_calenderTypeDate: new FormControl('',Validators.required),
      jayanti_calenderTypetithi: new FormControl('',Validators.required),
      jayanti_isArticle: new FormControl('',Validators.required),
      jayanti_articleId: new FormControl('',Validators.required),
    });
    this.createForm.value.jayanti_calenderTypeDate = true;
    this.createForm.value.jayanti_calenderTypetithi = true;
  }

  get f() { return this.createForm.controls; }

   createEvent(){
    console.log(this.createForm.value);
    if(this.createForm.invalid){
      if(!this.mahuratJaynti){
        if(!this.teharJaynti){
          let data = {
            dinakTithi : {
              todate_date : this.createForm.value.todayDate,
              chattisgad_mahina : this.createForm.value.chattisgatiMahina,
              paksh_name : this.createForm.value.pakhsName,
              tithi_name : this.createForm.value.tithiName,
              nakshtra_name : this.createForm.value.nakshraName,
              nakshtra_start_time : this.createForm.value.nakshraStartDate,
              nakshtra_end_time : this.createForm.value.nakshraEndDate,
              is_mahurat : this.mahuratJaynti,
              is_jayanti : this.teharJaynti, 
            }
          }
          this.sumbit(data);
        }else{
          if(this.teharJaynti){
            let data = {
              dinakTithi : {
                todate_date : this.createForm.value.todayDate,
                chattisgad_mahina : this.createForm.value.chattisgatiMahina,
                paksh_name : this.createForm.value.pakhsName,
                tithi_name : this.createForm.value.tithiName,
                nakshtra_name : this.createForm.value.nakshraName,
                nakshtra_start_time : this.createForm.value.nakshraStartDate,
                nakshtra_end_time : this.createForm.value.nakshraEndDate,
                is_mahurat : this.mahuratJaynti,
                is_jayanti : this.teharJaynti, 
              },
              jayanti:{
                mahurat_name : this.createForm.value.jayanti_mahuratName,
                is_article : this.createForm.value.jayanti_isArticle,
                articleId: this.createForm.value.jayanti_articleId,
                calender_type_date: this.createForm.value.jayanti_calenderTypeDate,
                calender_type_tithi: this.createForm.value.jayanti_calenderTypetithi
              }
            }
            this.sumbit(data);
          }
        }
      }else{
        if(!this.teharJaynti){
          let data = {
            dinakTithi : {
              todate_date : this.createForm.value.todayDate,
              chattisgad_mahina : this.createForm.value.chattisgatiMahina,
              paksh_name : this.createForm.value.pakhsName,
              tithi_name : this.createForm.value.tithiName,
              nakshtra_name : this.createForm.value.nakshraName,
              nakshtra_start_time : this.createForm.value.nakshraStartDate,
              nakshtra_end_time : this.createForm.value.nakshraEndDate,
              is_mahurat : this.mahuratJaynti,
              is_jayanti : this.teharJaynti, 
            },
          }
          this.sumbit(data);
        }else{
          if(this.teharJaynti){
            let data = {
              dinakTithi : {
                todate_date : this.createForm.value.todayDate,
                chattisgad_mahina : this.createForm.value.chattisgatiMahina,
                paksh_name : this.createForm.value.pakhsName,
                tithi_name : this.createForm.value.tithiName,
                nakshtra_name : this.createForm.value.nakshraName,
                nakshtra_start_time : this.createForm.value.nakshraStartDate,
                nakshtra_end_time : this.createForm.value.nakshraEndDate,
                is_mahurat : this.mahuratJaynti,
                is_jayanti : this.teharJaynti, 
              },
              jayanti:{
                mahurat_name : this.createForm.value.jayanti_mahuratName,
                is_article : this.createForm.value.jayanti_isArticle,
                articleId: this.createForm.value.jayanti_articleId,
                calender_type_date: this.createForm.value.jayanti_calenderTypeDate,
                calender_type_tithi: this.createForm.value.jayanti_calenderTypetithi
              }
            }
            this.sumbit(data);
          }else{
            return false;
          }
        }
      }
    }else{
      let data = {
        dinakTithi : {
          todate_date : this.createForm.value.todayDate,
          chattisgad_mahina : this.createForm.value.chattisgatiMahina,
          paksh_name : this.createForm.value.pakhsName,
          tithi_name : this.createForm.value.tithiName,
          nakshtra_name : this.createForm.value.nakshraName,
          nakshtra_start_time : this.createForm.value.nakshraStartDate,
          nakshtra_end_time : this.createForm.value.nakshraEndDate,
          is_mahurat : this.mahuratJaynti,
          is_jayanti : this.teharJaynti, 
        },
        mahurat:{
          mahurat_name : this.createForm.value.mahurate_mahuratName,
          mahurat_start_date : this.createForm.value.mahurate_startTime,
          mahurat_end_date : this.createForm.value.mahurate_endTime,
          is_article : this.createForm.value.mahurate_isArticle,
          article_id : this.createForm.value.mahurate_articleId,
        },
        jayanti:{
          mahurat_name : this.createForm.value.jayanti_mahuratName,
          is_article : this.createForm.value.jayanti_isArticle,
          articleId: this.createForm.value.jayanti_articleId,
          calender_type_date: this.createForm.value.jayanti_calenderTypeDate,
          calender_type_tithi: this.createForm.value.jayanti_calenderTypetithi
        }
      }
      this.sumbit(data);
    }
  }
  sumbit(data){
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('events/create_event' , data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.toastrService.success('SucessFull', 'sucessfully Event created');
      } else {
        console.log(!data.message)
      }
    });
  }

  createMahuratesName(){
    let data = {
      "thithi_name" : this.thithi_name,
    }
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('thithis/create_thithis' , data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.toastrService.success('SucessFull', 'sucessfully thithis created');
      } else {
        console.log(!data.message)
      }
    });
  }
  createNakshtraName(){
    let data = {
      "thithi_name" : this.thithi_name,
    }
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('thithis/create_thithis' , data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.toastrService.success('SucessFull', 'sucessfully thithis created');
      } else {
        console.log(!data.message)
      }
    });
  }
  createThithis(){
    let data = {
      "thithi_name" : this.thithi_name,
    }
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('thithis/create_thithis' , data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.toastrService.success('SucessFull', 'sucessfully thithis created');
      } else {
        console.log(!data.message)
      }
    });
  }
}
