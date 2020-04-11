import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/shared/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userChannel: any;
  permiuminfo:any;
  userHasReadPermition : any;
  createChannelForm: FormGroup;
  previewUrl : any;
  constructor(private coreService: CoreService,private toastrService: ToastrService) { }
  ngOnInit() {
    this.create_form();
    this.getPermiumInfo();
    this.getChannelInfo();
    this.isUserHasRead();
  }
  getPermiumInfo(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('channel/get_all_permium').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.permiuminfo = data.message;
      } else {
        console.log(!data.message)
      }
    }); 
  }

  create_form() {
    this.createChannelForm = new FormGroup({
      image: new FormControl(''),
      title: new FormControl('', Validators.required),
      // address: new FormControl('', Validators.required),
      // mobile: new FormControl('', Validators.required),
      facebook: new FormControl(''),
      google: new FormControl(''),
      linkedin: new FormControl(''),
      twiiter: new FormControl(''),
    });
  }
  get f() {
    return this.createChannelForm.controls;
  }
  getChannelInfo() {
    // this.coreService.get('channel/get_user_channel').subscribe((data: any) => {
    //   if (!data.error) {
    //     this.userChannel = data.message;

    //   } else {
    //     console.log(!data.message)
    //   }
    // });
  }

  isUserHasRead() {
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('channel/is_user_has_read').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      if (!data.error) {
        this.userHasReadPermition = data.message;
      } else {
        console.log(!data.message)
      }
    });
  }

  create_channel(){
    $('#createChannel').modal('hide');
    if (this.createChannelForm.valid) {
      let data = {
        "name": this.createChannelForm.value.title,
        "image":this.createChannelForm.value.image || 'image',
        "totalLike":0,
        "totalMessage":0,
        "facebookLink":this.createChannelForm.value.facebook,
        "linkedinLink":this.createChannelForm.value.linkedin,
        "googleLink":this.createChannelForm.value.google,
        "twitterLink":this.createChannelForm.value.twiiter
      }
      document.getElementById("preloader").style.display = "block";
      this.coreService.post('channel/create_channel',data).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        if (!data.error) {
          this.getChannelInfo();
          this.toastrService.success('SucessFull', 'Channel Sucessfully created');  
        } else {
          console.log(!data.message)
        }
      });
    } else {
      return false;
    }
  }

  setUserPermium(){
    document.getElementById("preloader").style.display = "block";
      this.coreService.post('channel/set_user_permium',{}).subscribe((data: any) => {
        document.getElementById("preloader").style.display = "none";
        if (!data.error) {
          this.isUserHasRead();
          this.toastrService.success('SucessFull', 'User Read Permition Sucessfully created');  
        } else {
          console.log(!data.message)
        }
      });
  }
  // set_user_permium
  // is_user_has_read
}
