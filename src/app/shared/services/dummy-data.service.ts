import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {
  timings: any = [
    {id:0, timing: '12:00'},
    {id:1, timing: '12:30'},
    {id:2, timing: '01:00'},
    {id:3, timing: '01:30'},
    {id:4, timing: '02:00'},
    {id:5, timing: '02:30'},
    {id:6, timing: '03:00'},
    {id:7, timing: '03:30'},
    {id:8, timing: '04:00'},
    {id:9, timing: '04:30'},
    {id:10, timing: '05:00'},
    {id:11,timing: '05:30'},
    {id:12, timing: '06:00'},
    {id:13, timing: '06:30'},
    {id:14, timing: '07:00'},
    {id:15, timing: '07:30'},
    {id:16, timing: '08:00'},
    {id:17, timing: '08:30'},
    {id:18, timing: '09:00'},
    {id:19, timing: '09:30'},
    {id:20, timing: '10:00'},
    {id:21, timing: '10:30'},
    {id:22, timing: '11:00'},
    {id:23, timing: '11:30'},
    {id:24, timing: '12:00'},
    {id:25, timing: '12:30'},
    {id:26, timing: '13:00'},
    {id:27, timing: '13:30'},
    {id:28, timing: '14:00'},
    {id:29, timing: '14:30'},
    {id:30, timing: '15:00'},
    {id:31, timing: '15:30'},
    {id:32, timing: '16:00'},
    {id:33, timing: '16:30'},
    {id:34, timing: '17:00'},
    {id:35, timing: '17:30'},
    {id:36, timing: '18:00'},
    {id:37, timing: '18:30'},
    {id:38, timing: '19:00'},
    {id:39, timing: '19:30'},
    {id:40, timing: '20:00'},
    {id:41, timing: '20:30'},
    {id:42, timing: '21:00'},
    {id:43, timing: '21:30'},
    {id:44, timing: '22:00'},
    {id:45, timing: '22:30'},
    {id:46, timing: '23:00'},
    {id:47, timing: '23:30'},
    {id:48, timing: '24:00'}
  ];
  days = [
    {id:1, day:'sunday'},
    {id:2, day:'monday'},
    {id:3, day:'tuesday'},
    {id:4, day:'wednessday'},
    {id:5, day:'thursday'},
    {id:6, day:'friday'},
    {id:7, day:'saturday'},
  ];
  bloodGrp = [
    {bg : 'A-'},
    {bg : 'A+'},
    {bg : 'B-'},
    {bg : 'B+'},
    {bg : 'AB-'},
    {bg : 'AB+'},
    {bg : 'O-'},
    {bg : 'O+'}
  ];
  medicine_type = [
    {id:1, type: 'Tablet'},
    {id:2, type: 'Injection'},
    {id:3, type: 'Oral Liquid'},
    {id:5, type: 'Powder for oral liquid'},
    {id:6, type: 'Powder for injection'},
    {id:7, type: 'Capsule'},
    {id:8, type: 'Ontiment'},        
  ];
  medicine = [
    {medicineType:'Tablet', med: [
      {name:'Elavil'},
      {name:'Exforge'},
      {name:'Norvasc'},
      {name:'Exforge HCT'},
      {name:'Ortho Micronor'},
    ]},
    {medicineType:'Injection', med: [
      {name:'acetaminophen'},
      {name:'Activase'},
      {name:'Actonel'},
      {name:'acyclovir'},
      {name:'Marcaine'},
    ]},
    {medicineType:'Oral Liquid', med: [
      {name:'Exelyte Liquid 45ml'},
      {name:'Duphalac Oral Solution Lemon'},
      {name:'ORS Apple Liquid 200ml'},
      {name:'Heptulac Fiber Oral Solution'},
      {name:'SALEVA'},
    ]},
    {medicineType:'Ontiment', med: [
      {name:'Vanos Cream'},
      {name:'Pandel Cream'},
      {name:'Elocon'},
      {name:'Dermatope'},
      {name:'Cyclocort'},
    ]},
    {medicineType:'Powder for oral liquid', med: [
      {name:'Muout Plus'},
      {name:'Pegmove'},
      {name:'Pentasure Dls'},
      {name:'Electral'},
      {name:'Pegicol'},
    ]},
    {medicineType:'Powder for injection', med: [
      {name:'AMPICILLIN'},
      {name:'Nutrova Collagen+Antioxidants'},
      {name:'Jiva Romnashtak Lep'}
    ]},
    {medicineType:'Capsule', med: [
      {name:'Upcount'},
      {name:'Dabur Lipistat'},
      {name:'Himalaya Vrikshamla'},
      {name:'Ecoflora'},
      {name:'Eglow Vitamin E'},
    ]}
  ];
  dose = [
    {name:'morning'},
    {name:'apply to affected area'},
    {name:'before meals'},
    {name:'before meals and at bedtime'},
    {name:'alternate'},
    {name:'in the morning; before noon'},
    {name:'before dinner'},
    {name:'twice a day'}
  ]
  clinics = [
    { id: '1', clinic_name: 'Promise Clinic', clinic_phone: '9685731208', clinic_address_1: "Vijay nagar", clinic_postal_code: "545863", clinic_city: "Indore", clinic_state: "MP", clinic_country: "India"},
    { id: '2', clinic_name: 'Riverview Clinic', clinic_phone: '9685731208', clinic_address_1: "Vijay nagar", clinic_postal_code: "545863", clinic_city: "Indore", clinic_state: "MP", clinic_country: "India"},
    { id: '3', clinic_name: 'Jade Forest Clinic', clinic_phone: '9685731208', clinic_address_1: "Vijay nagar", clinic_postal_code: "545863", clinic_city: "Indore", clinic_state: "MP", clinic_country: "India"},
    { id: '4', clinic_name: 'United Hospital Clinic', clinic_phone: '9685731208', clinic_address_1: "Vijay nagar", clinic_postal_code: "545863", clinic_city: "Indore", clinic_state: "MP", clinic_country: "India"},
    { id: '5', clinic_name: 'Glow Skin Clinic', clinic_phone: '9685731208', clinic_address_1: "Vijay nagar", clinic_postal_code: "545863", clinic_city: "Indore", clinic_state: "MP", clinic_country: "India"},
    { id: '6', clinic_name: 'Flowerhill Hospital', clinic_phone: '9685731208', clinic_address_1: "Vijay nagar", clinic_postal_code: "545863", clinic_city: "Indore", clinic_state: "MP", clinic_country: "India"}
  ];
  patients = [
    { id: '1', name: 'Alexander Hall', email: 'mcglynn.emely@hahn.org', gender: 'Female', dob: 'Wed Jun 05 2000 17:35:45 GMT+0530', boadGroup: 'O+', appointments: [
      { id: '1', date: '2019-06-07', clinic: {}, timing: { day: 'Monday', startTime: '9:00:00', endTime: '12:00:00' } },
      { id: '7', date: '2019-05-30', clinic: {}, timing: { day: 'Monday', startTime: '9:00:00', endTime: '12:00:00' }, vitalSigns: {
        weight: '58', temperature: '98.6', bloodPressure: '80/120', respiratoryRate: '65'
      }, clinicalNotes: {

      }, prescriptions: {

      } }
    ]},
    { id: '2', name: 'Ashley Davis', email: 'mills_reggie@hotmail.com', gender: 'Female', dob: 'Wed Jun 05 2000 17:35:45 GMT+0530', boadGroup: 'A+', appointments: [
      { id: '2', date: '2019-06-07', clinic: {}, timing: { day: 'Monday', startTime: '9:00:00', endTime: '12:00:00' } }
    ]},
    { id: '3', name: 'Benjamin Medina', email: 'samara_rath@beahan.io', gender: 'Male', dob: 'Wed Jun 05 2000 17:35:45 GMT+0530', boadGroup: 'AB+', appointments: [
      { id: '3', date: '2019-06-07', clinic: {}, timing: { day: 'Monday', startTime: '9:00:00', endTime: '12:00:00' } }
    ]},
    { id: '4', name: 'Cheryl Peterson', email: 'vivien.breitenberg@herbert.net', gender: 'Male', dob: 'Wed Jun 05 2000 17:35:45 GMT+0530', boadGroup: 'B+', appointments: [
      { id: '4', date: '2019-06-07', clinic: {}, timing: { day: 'Monday', startTime: '18:00:00', endTime: '21:00:00' } }
    ]},
    { id: '5', name: 'Donna Pearson', email: 'aracely.nicolas@yahoo.com', gender: 'Female', dob: 'Wed Jun 05 2000 17:35:45 GMT+0530', boadGroup: 'O-', appointments: [
      { id: '5', date: '2019-06-07', clinic: {}, timing: { day: 'Monday', startTime: '18:00:00', endTime: '21:00:00' } }
    ]},
    { id: '6', name: 'Elizabeth Sullivan', email: 'haag.roman@hotmail.com', gender: 'Female', dob: 'Wed Jun 05 2000 17:35:45 GMT+0530', boadGroup: 'A-', appointments: [
      { id: '6', date: '2019-06-07', clinic: {}, timing: { day: 'Monday', startTime: '18:00:00', endTime: '21:00:00' } }
    ]}
  ];
  setting :{
    name: 'Elizabeth Sullivan'
    email:'haag.roman@hotmail.com'
    gender : 'Female',
    dateOfBirth:"29/09/1997",
    mobile:"7894561230",
    address:'indore',
    companyName:'Partylal.com'
  }
  contry_code: [ 
    { 
      "code": "+7 840", 
      "name": "Abkhazia" 
    }, 
    { 
      "code": "+93", 
      "name": "Afghanistan" 
    }, 
    { 
      "code": "+355", 
      "name": "Albania" 
    }, 
    { 
      "code": "+213", 
      "name": "Algeria" 
    }, 
    { 
      "code": "+1 684", 
      "name": "American Samoa" 
    }, 
    { 
      "code": "+376", 
      "name": "Andorra" 
    }, 
    { 
      "code": "+244", 
      "name": "Angola" 
    }, 
    { 
      "code": "+1 264", 
      "name": "Anguilla" 
    }, 
    { 
      "code": "+1 268", 
      "name": "Antigua and Barbuda" 
    }, 
    { 
      "code": "+54", 
      "name": "Argentina" 
    }, 
    { 
      "code": "+374", 
      "name": "Armenia" 
    }, 
    { 
      "code": "+297", 
      "name": "Aruba" 
    }, 
    { 
      "code": "+247", 
      "name": "Ascension" 
    }, 
    { 
      "code": "+61", 
      "name": "Australia" 
    }, 
    { 
      "code": "+672", 
      "name": "Australian External Territories" 
    }, 
    { 
      "code": "+43", 
      "name": "Austria" 
    }, 
    { 
      "code": "+994", 
      "name": "Azerbaijan" 
    }, 
    { 
      "code": "+1 242", 
      "name": "Bahamas" 
    }, 
    { 
      "code": "+973", 
      "name": "Bahrain" 
    }, 
    { 
      "code": "+880", 
      "name": "Bangladesh" 
    }, 
    { 
      "code": "+1 246", 
      "name": "Barbados" 
    }, 
    { 
      "code": "+1 268", 
      "name": "Barbuda" 
    }, 
    { 
      "code": "+375", 
      "name": "Belarus" 
    }, 
    { 
      "code": "+32", 
      "name": "Belgium" 
    }, 
    { 
      "code": "+501", 
      "name": "Belize" 
    }, 
    { 
      "code": "+229", 
      "name": "Benin" 
    }, 
    { 
      "code": "+1 441", 
      "name": "Bermuda" 
    }, 
    { 
      "code": "+975", 
      "name": "Bhutan" 
    }, 
    { 
      "code": "+591", 
      "name": "Bolivia" 
    }, 
    { 
      "code": "+387", 
      "name": "Bosnia and Herzegovina" 
    }, 
    { 
      "code": "+267", 
      "name": "Botswana" 
    }, 
    { 
      "code": "+55", 
      "name": "Brazil" 
    }, 
    { 
      "code": "+246", 
      "name": "British Indian Ocean Territory" 
    }, 
    { 
      "code": "+1 284", 
      "name": "British Virgin Islands" 
    }, 
    { 
      "code": "+673", 
      "name": "Brunei" 
    }, 
    { 
      "code": "+359", 
      "name": "Bulgaria" 
    }, 
    { 
      "code": "+226", 
      "name": "Burkina Faso" 
    }, 
    { 
      "code": "+257", 
      "name": "Burundi" 
    }, 
    { 
      "code": "+855", 
      "name": "Cambodia" 
    }, 
    { 
      "code": "+237", 
      "name": "Cameroon" 
    }, 
    { 
      "code": "+1", 
      "name": "Canada" 
    }, 
    { 
      "code": "+238", 
      "name": "Cape Verde" 
    }, 
    { 
      "code": "+ 345", 
      "name": "Cayman Islands" 
    }, 
    { 
      "code": "+236", 
      "name": "Central African Republic" 
    }, 
    { 
      "code": "+235", 
      "name": "Chad" 
    }, 
    { 
      "code": "+56", 
      "name": "Chile" 
    }, 
    { 
      "code": "+86", 
      "name": "China" 
    }, 
    { 
      "code": "+61", 
      "name": "Christmas Island" 
    }, 
    { 
      "code": "+61", 
      "name": "Cocos-Keeling Islands" 
    }, 
    { 
      "code": "+57", 
      "name": "Colombia" 
    }, 
    { 
      "code": "+269", 
      "name": "Comoros" 
    }, 
    { 
      "code": "+242", 
      "name": "Congo" 
    }, 
    { 
      "code": "+243", 
      "name": "Congo, Dem. Rep. of (Zaire)" 
    }, 
    { 
      "code": "+682", 
      "name": "Cook Islands" 
    }, 
    { 
      "code": "+506", 
      "name": "Costa Rica" 
    }, 
    { 
      "code": "+385", 
      "name": "Croatia" 
    }, 
    { 
      "code": "+53", 
      "name": "Cuba" 
    }, 
    { 
      "code": "+599", 
      "name": "Curacao" 
    }, 
    { 
      "code": "+537", 
      "name": "Cyprus" 
    }, 
    { 
      "code": "+420", 
      "name": "Czech Republic" 
    }, 
    { 
      "code": "+45", 
      "name": "Denmark" 
    }, 
    { 
      "code": "+246", 
      "name": "Diego Garcia" 
    }, 
    { 
      "code": "+253", 
      "name": "Djibouti" 
    }, 
    { 
      "code": "+1 767", 
      "name": "Dominica" 
    }, 
    { 
      "code": "+1 809", 
      "name": "Dominican Republic" 
    }, 
    { 
      "code": "+670", 
      "name": "East Timor" 
    }, 
    { 
      "code": "+56", 
      "name": "Easter Island" 
    }, 
    { 
      "code": "+593", 
      "name": "Ecuador" 
    }, 
    { 
      "code": "+20", 
      "name": "Egypt" 
    }, 
    { 
      "code": "+503", 
      "name": "El Salvador" 
    }, 
    { 
      "code": "+240", 
      "name": "Equatorial Guinea" 
    }, 
    { 
      "code": "+291", 
      "name": "Eritrea" 
    }, 
    { 
      "code": "+372", 
      "name": "Estonia" 
    }, 
    { 
      "code": "+251", 
      "name": "Ethiopia" 
    }, 
    { 
      "code": "+500", 
      "name": "Falkland Islands" 
    }, 
    { 
      "code": "+298", 
      "name": "Faroe Islands" 
    }, 
    { 
      "code": "+679", 
      "name": "Fiji" 
    }, 
    { 
      "code": "+358", 
      "name": "Finland" 
    }, 
    { 
      "code": "+33", 
      "name": "France" 
    }, 
    { 
      "code": "+596", 
      "name": "French Antilles" 
    }, 
    { 
      "code": "+594", 
      "name": "French Guiana" 
    }, 
    { 
      "code": "+689", 
      "name": "French Polynesia" 
    }, 
    { 
      "code": "+241", 
      "name": "Gabon" 
    }, 
    { 
      "code": "+220", 
      "name": "Gambia" 
    }, 
    { 
      "code": "+995", 
      "name": "Georgia" 
    }, 
    { 
      "code": "+49", 
      "name": "Germany" 
    }, 
    { 
      "code": "+233", 
      "name": "Ghana" 
    }, 
    { 
      "code": "+350", 
      "name": "Gibraltar" 
    }, 
    { 
      "code": "+30", 
      "name": "Greece" 
    }, 
    { 
      "code": "+299", 
      "name": "Greenland" 
    }, 
    { 
      "code": "+1 473", 
      "name": "Grenada" 
    }, 
    { 
      "code": "+590", 
      "name": "Guadeloupe" 
    }, 
    { 
      "code": "+1 671", 
      "name": "Guam" 
    }, 
    { 
      "code": "+502", 
      "name": "Guatemala" 
    }, 
    { 
      "code": "+224", 
      "name": "Guinea" 
    }, 
    { 
      "code": "+245", 
      "name": "Guinea-Bissau" 
    }, 
    { 
      "code": "+595", 
      "name": "Guyana" 
    }, 
    { 
      "code": "+509", 
      "name": "Haiti" 
    }, 
    { 
      "code": "+504", 
      "name": "Honduras" 
    }, 
    { 
      "code": "+852", 
      "name": "Hong Kong SAR China" 
    }, 
    { 
      "code": "+36", 
      "name": "Hungary" 
    }, 
    { 
      "code": "+354", 
      "name": "Iceland" 
    }, 
    { 
      "code": "+91", 
      "name": "India" 
    }, 
    { 
      "code": "+62", 
      "name": "Indonesia" 
    }, 
    { 
      "code": "+98", 
      "name": "Iran" 
    }, 
    { 
      "code": "+964", 
      "name": "Iraq" 
    }, 
    { 
      "code": "+353", 
      "name": "Ireland" 
    }, 
    { 
      "code": "+972", 
      "name": "Israel" 
    }, 
    { 
      "code": "+39", 
      "name": "Italy" 
    }, 
    { 
      "code": "+225", 
      "name": "Ivory Coast" 
    }, 
    { 
      "code": "+1 876", 
      "name": "Jamaica" 
    }, 
    { 
      "code": "+81", 
      "name": "Japan" 
    }, 
    { 
      "code": "+962", 
      "name": "Jordan" 
    }, 
    { 
      "code": "+7 7", 
      "name": "Kazakhstan" 
    }, 
    { 
      "code": "+254", 
      "name": "Kenya" 
    }, 
    { 
      "code": "+686", 
      "name": "Kiribati" 
    }, 
    { 
      "code": "+965", 
      "name": "Kuwait" 
    }, 
    { 
      "code": "+996", 
      "name": "Kyrgyzstan" 
    }, 
    { 
      "code": "+856", 
      "name": "Laos" 
    }, 
    { 
      "code": "+371", 
      "name": "Latvia" 
    }, 
    { 
      "code": "+961", 
      "name": "Lebanon" 
    }, 
    { 
      "code": "+266", 
      "name": "Lesotho" 
    }, 
    { 
      "code": "+231", 
      "name": "Liberia" 
    }, 
    { 
      "code": "+218", 
      "name": "Libya" 
    }, 
    { 
      "code": "+423", 
      "name": "Liechtenstein" 
    }, 
    { 
      "code": "+370", 
      "name": "Lithuania" 
    }, 
    { 
      "code": "+352", 
      "name": "Luxembourg" 
    }, 
    { 
      "code": "+853", 
      "name": "Macau SAR China" 
    }, 
    { 
      "code": "+389", 
      "name": "Macedonia" 
    }, 
    { 
      "code": "+261", 
      "name": "Madagascar" 
    }, 
    { 
      "code": "+265", 
      "name": "Malawi" 
    }, 
    { 
      "code": "+60", 
      "name": "Malaysia" 
    }, 
    { 
      "code": "+960", 
      "name": "Maldives" 
    }, 
    { 
      "code": "+223", 
      "name": "Mali" 
    }, 
    { 
      "code": "+356", 
      "name": "Malta" 
    }, 
    { 
      "code": "+692", 
      "name": "Marshall Islands" 
    }, 
    { 
      "code": "+596", 
      "name": "Martinique" 
    }, 
    { 
      "code": "+222", 
      "name": "Mauritania" 
    }, 
    { 
      "code": "+230", 
      "name": "Mauritius" 
    }, 
    { 
      "code": "+262", 
      "name": "Mayotte" 
    }, 
    { 
      "code": "+52", 
      "name": "Mexico" 
    }, 
    { 
      "code": "+691", 
      "name": "Micronesia" 
    }, 
    { 
      "code": "+1 808", 
      "name": "Midway Island" 
    }, 
    { 
      "code": "+373", 
      "name": "Moldova" 
    }, 
    { 
      "code": "+377", 
      "name": "Monaco" 
    }, 
    { 
      "code": "+976", 
      "name": "Mongolia" 
    }, 
    { 
      "code": "+382", 
      "name": "Montenegro" 
    }, 
    { 
      "code": "+1664", 
      "name": "Montserrat" 
    }, 
    { 
      "code": "+212", 
      "name": "Morocco" 
    }, 
    { 
      "code": "+95", 
      "name": "Myanmar" 
    }, 
    { 
      "code": "+264", 
      "name": "Namibia" 
    }, 
    { 
      "code": "+674", 
      "name": "Nauru" 
    }, 
    { 
      "code": "+977", 
      "name": "Nepal" 
    }, 
    { 
      "code": "+31", 
      "name": "Netherlands" 
    }, 
    { 
      "code": "+599", 
      "name": "Netherlands Antilles" 
    }, 
    { 
      "code": "+1 869", 
      "name": "Nevis" 
    }, 
    { 
      "code": "+687", 
      "name": "New Caledonia" 
    }, 
    { 
      "code": "+64", 
      "name": "New Zealand" 
    }, 
    { 
      "code": "+505", 
      "name": "Nicaragua" 
    }, 
    { 
      "code": "+227", 
      "name": "Niger" 
    }, 
    { 
      "code": "+234", 
      "name": "Nigeria" 
    }, 
    { 
      "code": "+683", 
      "name": "Niue" 
    }, 
    { 
      "code": "+672", 
      "name": "Norfolk Island" 
    }, 
    { 
      "code": "+850", 
      "name": "North Korea" 
    }, 
    { 
      "code": "+1 670", 
      "name": "Northern Mariana Islands" 
    }, 
    { 
      "code": "+47", 
      "name": "Norway" 
    }, 
    { 
      "code": "+968", 
      "name": "Oman" 
    }, 
    { 
      "code": "+92", 
      "name": "Pakistan" 
    }, 
    { 
      "code": "+680", 
      "name": "Palau" 
    }, 
    { 
      "code": "+970", 
      "name": "Palestinian Territory" 
    }, 
    { 
      "code": "+507", 
      "name": "Panama" 
    }, 
    { 
      "code": "+675", 
      "name": "Papua New Guinea" 
    }, 
    { 
      "code": "+595", 
      "name": "Paraguay" 
    }, 
    { 
      "code": "+51", 
      "name": "Peru" 
    }, 
    { 
      "code": "+63", 
      "name": "Philippines" 
    }, 
    { 
      "code": "+48", 
      "name": "Poland" 
    }, 
    { 
      "code": "+351", 
      "name": "Portugal" 
    }, 
    { 
      "code": "+1 787", 
      "name": "Puerto Rico" 
    }, 
    { 
      "code": "+974", 
      "name": "Qatar" 
    }, 
    { 
      "code": "+262", 
      "name": "Reunion" 
    }, 
    { 
      "code": "+40", 
      "name": "Romania" 
    }, 
    { 
      "code": "+7", 
      "name": "Russia" 
    }, 
    { 
      "code": "+250", 
      "name": "Rwanda" 
    }, 
    { 
      "code": "+685", 
      "name": "Samoa" 
    }, 
    { 
      "code": "+378", 
      "name": "San Marino" 
    }, 
    { 
      "code": "+966", 
      "name": "Saudi Arabia" 
    }, 
    { 
      "code": "+221", 
      "name": "Senegal" 
    }, 
    { 
      "code": "+381", 
      "name": "Serbia" 
    }, 
    { 
      "code": "+248", 
      "name": "Seychelles" 
    }, 
    { 
      "code": "+232", 
      "name": "Sierra Leone" 
    }, 
    { 
      "code": "+65", 
      "name": "Singapore" 
    }, 
    { 
      "code": "+421", 
      "name": "Slovakia" 
    }, 
    { 
      "code": "+386", 
      "name": "Slovenia" 
    }, 
    { 
      "code": "+677", 
      "name": "Solomon Islands" 
    }, 
    { 
      "code": "+27", 
      "name": "South Africa" 
    }, 
    { 
      "code": "+500", 
      "name": "South Georgia and the South Sandwich Islands" 
    }, 
    { 
      "code": "+82", 
      "name": "South Korea" 
    }, 
    { 
      "code": "+34", 
      "name": "Spain" 
    }, 
    { 
      "code": "+94", 
      "name": "Sri Lanka" 
    }, 
    { 
      "code": "+249", 
      "name": "Sudan" 
    }, 
    { 
      "code": "+597", 
      "name": "Suriname" 
    }, 
    { 
      "code": "+268", 
      "name": "Swaziland" 
    }, 
    { 
      "code": "+46", 
      "name": "Sweden" 
    }, 
    { 
      "code": "+41", 
      "name": "Switzerland" 
    }, 
    { 
      "code": "+963", 
      "name": "Syria" 
    }, 
    { 
      "code": "+886", 
      "name": "Taiwan" 
    }, 
    { 
      "code": "+992", 
      "name": "Tajikistan" 
    }, 
    { 
      "code": "+255", 
      "name": "Tanzania" 
    }, 
    { 
      "code": "+66", 
      "name": "Thailand" 
    }, 
    { 
      "code": "+670", 
      "name": "Timor Leste" 
    }, 
    { 
      "code": "+228", 
      "name": "Togo" 
    }, 
    { 
      "code": "+690", 
      "name": "Tokelau" 
    }, 
    { 
      "code": "+676", 
      "name": "Tonga" 
    }, 
    { 
      "code": "+1 868", 
      "name": "Trinidad and Tobago" 
    }, 
    { 
      "code": "+216", 
      "name": "Tunisia" 
    }, 
    { 
      "code": "+90", 
      "name": "Turkey" 
    }, 
    { 
      "code": "+993", 
      "name": "Turkmenistan" 
    }, 
    { 
      "code": "+1 649", 
      "name": "Turks and Caicos Islands" 
    }, 
    { 
      "code": "+688", 
      "name": "Tuvalu" 
    }, 
    { 
      "code": "+1 340", 
      "name": "U.S. Virgin Islands" 
    }, 
    { 
      "code": "+256", 
      "name": "Uganda" 
    }, 
    { 
      "code": "+380", 
      "name": "Ukraine" 
    }, 
    { 
      "code": "+971", 
      "name": "United Arab Emirates" 
    }, 
    { 
      "code": "+44", 
      "name": "United Kingdom" 
    }, 
    { 
      "code": "+1", 
      "name": "United States" 
    }, 
    { 
      "code": "+598", 
      "name": "Uruguay" 
    }, 
    { 
      "code": "+998", 
      "name": "Uzbekistan" 
    }, 
    { 
      "code": "+678", 
      "name": "Vanuatu" 
    }, 
    { 
      "code": "+58", 
      "name": "Venezuela" 
    }, 
    { 
      "code": "+84", 
      "name": "Vietnam" 
    }, 
    { 
      "code": "+1 808", 
      "name": "Wake Island" 
    }, 
    { 
      "code": "+681", 
      "name": "Wallis and Futuna" 
    }, 
    { 
      "code": "+967", 
      "name": "Yemen" 
    }, 
    { 
      "code": "+260", 
      "name": "Zambia" 
    }, 
    { 
      "code": "+255", 
      "name": "Zanzibar" 
    }, 
    { 
      "code": "+263", 
      "name": "Zimbabwe" 
    } 
  ]; 
  constructor() { }
}
