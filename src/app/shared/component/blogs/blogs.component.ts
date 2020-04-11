import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  @Input() data = {};
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
  
  goto(id){
    if(this.userHasReadPermition){
      this.router.navigate(['/user/article-content' ,id]);
    }else{
      // LOgin Block`
    }
  }

}
