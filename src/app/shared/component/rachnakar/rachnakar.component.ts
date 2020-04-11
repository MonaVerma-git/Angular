import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';

@Component({
  selector: 'app-rachnakar',
  templateUrl: './rachnakar.component.html',
  styleUrls: ['./rachnakar.component.css']
})
export class RachnakarComponent implements OnInit {
  @Input() rachnakar = {};
  constructor(private coreService : CoreService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    
  }
  


  
}
