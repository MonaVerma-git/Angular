import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import  * as  environment from '../environment/environment';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})


export class CoreService {

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get<any>(url);
  }

  post(url, object) {
    return this.http.post(url, object);
  }

  postJS(URL){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": URL,
      "method": "POST",
      "headers": {}
    }
    
    return $.ajax(settings).done( (response) =>{});
  }
  getJS(URL){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": URL,
      "method": "GET",
      "headers": {}
    }
    
    return $.ajax(settings).done( (response) =>{});
  }

  // expand collapse feature
  expand() {
    $('#logo').addClass('logo-expand');
    $('.main-header .dashboard-logo').addClass('dashboard-logo-expand');
    $('#show_navbar').addClass('sidebar-expand');
    $('.side-nav div').addClass('side-nav-div-expand');
    $('.side-nav div a i').addClass('side-nav-div-a-i-expand');
    $('.icon-label').addClass('icon-label-expand');
  }

  collapse() {
    $('#logo').removeClass('logo-expand');
    $('.main-header .dashboard-logo').removeClass('dashboard-logo-expand');
    $('#show_navbar').removeClass('sidebar-expand');
    $('.side-nav div').removeClass('side-nav-div-expand');
    $('.side-nav div a i').removeClass('side-nav-div-a-i-expand');
    $('.icon-label').removeClass('icon-label-expand');
  }
}
