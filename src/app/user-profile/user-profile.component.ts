import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/shared/services/core.service';
import { AuthService } from 'app/shared/guard/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
// import { $ } from 'protractor';?

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInfo : any;
  isEditActive : any;
  updateForm : FormGroup;
  achivementForm : FormGroup;
  updateChannelForm : FormGroup;
  achivement : any = [];
  isChannelDetails : any = false;
  isEditChannel : any = false;
  constructor(private coreService: CoreService, private toastrService: ToastrService,
    private authService: AuthService, private _formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
   this.getProfileData();
   this.createForm();
  }

  updateOn(){
    this.isEditActive = !this.isEditActive;
    this.updateForm.controls.name.reset(this.userInfo.name);
    this.updateForm.controls.dob.reset(this.dateConver(this.userInfo.dob));
    this.updateForm.controls.gender.reset(this.userInfo.gender); 
    this.updateForm.controls.mobile.reset(this.userInfo.mobileNo); 
    this.updateForm.controls.address.reset(this.userInfo.address); 
  }
  updateChennelOn(){
    this.isEditChannel = !this.isEditChannel;
    this.updateChannelForm.controls.facebook.reset(this.userInfo.channel[0].channelsociallink[0].facebookLink);
    this.updateChannelForm.controls.google.reset(this.userInfo.channel[0].channelsociallink[0].googleLink);
    this.updateChannelForm.controls.linked.reset(this.userInfo.channel[0].channelsociallink[0].linkedinLink); 
    this.updateChannelForm.controls.twitter.reset(this.userInfo.channel[0].channelsociallink[0].twitter); 
    this.updateChannelForm.controls.name.reset(this.userInfo.channel[0].name); 
  }
  updateChennelDetailsOn(){
    this.isChannelDetails = !this.isChannelDetails;
  }



  dateConver(datavalue): any { 
    let data = new Date(datavalue); 
    let month: any; 
    let day: any; 
    if (data.getMonth().toString().length == 1) { 
      month = "-0" + (data.getMonth() + 1) 
    } else { 
      month = "-" + (data.getMonth() + 1) 
    } 
    if (data.getDate().toString().length == 1) { 
      day = "-0" + (data.getDate()) 
    } else { 
      day = "-" + (data.getDate()) 
    } 
    // this.dob = (data.getFullYear() + "" + month + "" + day); 
    return (data.getFullYear() + "" + month + "" + day); 
  } 

  createForm(){
    this.updateForm = new FormGroup({
      name: new FormControl('',Validators.required),
      dob: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required),
      mobile: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
    });

    this.updateChannelForm = new FormGroup({
      name: new FormControl('',Validators.required),
      facebook: new FormControl('',Validators.required),
      linked: new FormControl('',Validators.required),
      google: new FormControl('',Validators.required),
      twitter: new FormControl('',Validators.required),
    });

    this.achivementForm = new FormGroup({
      title: new FormControl('',Validators.required),
      name: new FormControl('',Validators.required),
    });
  }

  
  getProfileData(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('users/getUser').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.userInfo = data.message;
        if(this.userInfo){
          this.userInfo.dob =  new Date(this.userInfo.dob);
        }
        this.isEditActive = false;
      } else {

        console.log(!data.message)
      }
    });
  }
  
  updateProfileData(){
    console.log(this.updateForm);
    if(this.updateForm.invalid){
      return true;
    }else{
    let data = {
      name : this.updateForm.value.name,
      gender : this.updateForm.value.gender,
      dob : this.updateForm.value.dob,
      address : this.updateForm.value.address,
      mobile : this.updateForm.value.mobile
    }
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('users/update_user' ,data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.toastrService.success('SucessFull', 'Profile Update sucessfully');
        this.isEditActive = false;   
        this.getProfileData();
       } else {

        console.log(!data.message)
      }
    });
  }
  }
  create_channel(){
    if(this.achivementForm.valid){
      let data = {
        title: new FormControl('',Validators.required),
        subtitle: new FormControl('',Validators.required),
        name: new FormControl('',Validators.required),
      }
      this.achivement.push({
        "title" : this.achivementForm.value.title,
        "name": this.achivementForm.value.name,
      })
      this.achivementForm.controls.title.reset('');
      this.achivementForm.controls.name.reset('');
    }else{
      // return false;
    }
  }

  submit (){
    $('#createChannel').modal('hide');
    console.log(this.achivement);
    let data = {
      'achivement' : this.achivement
    }
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('channel/set_channel_details' ,data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.toastrService.success('SucessFull', 'Details added  sucessfully');
        this.achivement= [];
        this.getProfileData();
       } else {
        console.log(!data.message)
      }
    });
  }

  updateChannel(){
    this.isEditChannel = !this.isEditChannel;
    let data = {
        "name": this.updateChannelForm.value.name,
        "facebookLink":this.updateChannelForm.value.facebook,
        "linkedinLink":this.updateChannelForm.value.linked,
        "googleLink":this.updateChannelForm.value.google,
        "twitterLink":this.updateChannelForm.value.twitter,
        "id" : this.userInfo.channel[0].id
    }
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('channel/update_channel' ,data).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.toastrService.success('SucessFull', 'Details Removed  sucessfully');
        this.getProfileData();
       } else {
        console.log(!data.message)
      }
    });
  }

  deleteChannelDetails(id){
    document.getElementById("preloader").style.display = "block";
    this.coreService.post('channel/delete_channel_details' ,{id:id}).subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.toastrService.success('SucessFull', 'Details Removed  sucessfully');
        this.getProfileData();
       } else {
        console.log(!data.message)
      }
    });
  }

//   router.post('/update_channel',jwt.validateUserToken, ChannelRouter.updateChannel);
// router.post('/delete_channel_details',jwt.validateUserToken,ChannelRouter.deleteChannelDetails);
}
