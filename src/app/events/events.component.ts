import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jQuery from 'jquery';
declare var $: any;
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoreService } from 'app/shared/services/core.service';
import { AuthService } from 'app/shared/guard/auth.service';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  constructor(private coreService: CoreService,
    private authService: AuthService, private _formBuilder: FormBuilder,
    private router: Router) {
  }
  @ViewChild('calendar',{ read: true, static: false }) calendarComponent: FullCalendarComponent;
  // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    // { title: 'Event Now', start: new Date() }
  ];
  ngOnInit(){
    this.getAllEvents();
    this.getAllJaynties();
    this.getAllMahuretes()
  }
  getAllEvents(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('events/get_events').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        data.message.map((info) =>{
          let todatDate = new Date(info.todate_date);
          let date = "" + (todatDate.getMonth() + 1) + "-"+ (todatDate.getDate() ) + "-" + todatDate.getFullYear
          () + " " + info.nakshtra_start_time;

          this.calendarEvents = this.calendarEvents.concat({
                    id:1,
                    title: info.nakshtra_name,
                    duration : info.nakshtra_start_time,
                    start: new Date(date) ,  
                    // allDay: arg.allDay
          })
        })

        // this.toasterService.pop('sucess', '', "Event Sucessfully created");
      } else {
        console.log(!data.message)
      }
    });
  }

  getAllMahuretes(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('events/get_mahurates').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        data.message.map((info) =>{
          let todatDate = new Date(info.DinakTithi.todate_date);
          let date = "" + (todatDate.getMonth() + 1) + "-"+ (todatDate.getDate() ) + "-" + todatDate.getFullYear
          () + " " + info.mahurat_start_time;

          this.calendarEvents = this.calendarEvents.concat({
            id:2,
                    title: info.mahurat_name,
                    // duration : info.nakshtra_start_time,
                    start: new Date(date) ,  
                    // allDay: arg.allDay
          })
        })

        // this.toasterService.pop('sucess', '', "Event Sucessfully created");
      } else {
        console.log(!data.message)
      }
    });
  }
  getAllJaynties(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('events/get_jaynties').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        data.message.map((info) =>{
          let todatDate = new Date(info.DinakTithi.todate_date);
          let date = "" + (todatDate.getMonth() + 1) + "-"+ (todatDate.getDate() ) + "-" + todatDate.getFullYear
          () + " " + info.DinakTithi.nakshtra_start_time;

          this.calendarEvents = this.calendarEvents.concat({
            id:3,
                    title: info.mahurat_name,
                    // duration : info.nakshtra_start_time,
                    start: new Date(date) ,  
                    // allDay: arg.allDay
          })
        })

        // this.toasterService.pop('sucess', '', "Event Sucessfully created");
      } else {
        console.log(!data.message)
      }
    });
  }
  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    console.log(arg);
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      // this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      //   title: 'New Event',
      //   start: arg.date,
      //   allDay: arg.allDay
      // })
    }
  }
}