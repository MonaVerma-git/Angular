import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';

@Component({
  selector: 'app-rachnakar-details',
  templateUrl: './rachnakar-details.component.html',
  styleUrls: ['./rachnakar-details.component.css']
})
export class RachnakarDetailsComponent implements OnInit {
  @Input() rachnakar = {};
  @Input() user = {};
  @Input() totalArtical = 0;
  ranks: any = [1,2,3,4,5];
  userHasReadPermition : any ;
  constructor(private coreService : CoreService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isUserHasRead();
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
  goToSocialLink(link){
    console.log(link);
    window.open(link, "_blank", "toolbar=yes,scrollbars=yes");
    // window.open(link/ , '_blank')
  }
}
