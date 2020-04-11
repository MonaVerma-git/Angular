import { Component, OnInit } from '@angular/core';
import { CoreService } from 'app/shared/services/core.service';
// import * as Chartist from 'chartist';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  slider :any = [];
  sliderText :any = [];
  articles:any = [];
  constructor(private coreService : CoreService) { }
  ngOnInit() {
    this.slider.push({
      'text' : 'छत्तसगढ़ी मा प्याकरण  के जम्मो अध्याय जम्मो छत्तीसगढ़ी मा पढ़व लिखव अउ गोठ्यावन',
      'image': '../../assets/img/306130_cf58_3.jpg'
    },
    {
      'text' : 'छत्तसगढ़ी मा प्याकरण  के जम्मो अध्याय जम्मो छत्तीसगढ़ी मा पढ़व लिखव अउ गोठ्यावन',
      'image': '../../assets/img/032.jpg'
    },
    {
      'text' : 'छत्तसगढ़ी मा प्याकरण  के जम्मो अध्याय जम्मो छत्तीसगढ़ी मा पढ़व लिखव अउ गोठ्यावन',
      'image': '../../assets/img/image-slider-2.jpg'
    })
    console.log(this.slider);
    this.sliderText.push({
      'icon':'mail',
      'highLightText':'छत्तीसगढ़ी व्याकरण',
      'subText':'छत्तसगढ़ी मा व्याकरण के जम्मो अध्याय '
    },{
      'icon':'mail',
      'highLightText':'छत्तीसगढ़ी सामान्य ज्ञान ',
      'subText':'छत्तसगढ़ी मा व्याकरण के जम्मो अध्याय '},{

        'icon':'phone',
        'highLightText':'छत्तीसगढ़ी शब्दकोश',
        'subText':'छत्तसगढ़ी के शब्द खोजव  अउ  जानव  '
      },{
        'icon':'phone',
      'highLightText':'सामान्य ज्ञान परीक्षा ',
      'subText':'छत्तसगढ़ी के शब्द खोजव  अउ  जानव  '
      },{
        'icon':'accessibility',
      'highLightText':'छत्तीसगढ़ी अनुवादक ',
      'subText':'छत्तसगढ़ी के हिन्दी अउ अंगेर्जी मा अनुवाद करव '
      },
      {
        'icon':'accessibility',
      'highLightText':'छत्तीसगढ़ी कैलेंडर ',
      'subText':'छत्तसगढ़ी के हिन्दी अउ अंगेर्जी मा अनुवाद करव '
    })
    this.getAllArticle();
  }
  getAllArticle(){
    document.getElementById("preloader").style.display = "block";
    this.coreService.get('article/get_latest_article').subscribe((data: any) => {
      document.getElementById("preloader").style.display = "none";
      console.log(data);
      if (!data.error) {
        this.articles = data.message
      } else {
        console.log(!data.message)
      }
    });
  }
}
