import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/shared/services/core.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    isShow : boolean;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' ,isShow : true },
    { path: '/events', title: 'Events',  icon: 'event', class: '' ,isShow : false },
    { path: '/article', title: 'Article',  icon: 'file_copy', class: '' ,isShow : false },
    { path: '/patheykram', title: 'Patheykram',  icon: 'subject', class: '' ,isShow : false },
    { path: '/dictionary' , title: 'Dictionary' ,icon : 'book' , class : '' , isShow : true},
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: ''  ,isShow : true},
    { path: '/gk-written-test', title: 'GK Test',  icon:'menu_book', class: ''  ,isShow : true},
    { path: '/login', title: 'logout',  icon:'input', class: '' ,isShow : true },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  permission : any = [];
  constructor(private coreService : CoreService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.getProfileData();

  }
  logout(input){
    if(input == 'input'){
      localStorage.removeItem('accessToken');
    }

  }

  getProfileData(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('admin/get_user_data').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.permission = data.message;
        // this.menuItems.map((routes)=>{
          this.permission.subadminPermission.map((per ,i)=>{
            if(per.permissionId == 1){
              this.menuItems[1].isShow = true;
              console.log(this.menuItems);
            }
            if(per.permissionId == 2){
              this.menuItems[3].isShow = true;
            }
            if(per.permissionId == 3){
              this.menuItems[2].isShow = true;
              console.log(this.menuItems);
            }
            if(per.permissionId == 4){
              // this.menuItems[1].isShow = true;
            }
            if(this.permission.subadminPermission.length -1 == i){
              console.log(this.menuItems);
            }
          })
          // })
        
      } else {
        console.log(!data.message)
      }
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
