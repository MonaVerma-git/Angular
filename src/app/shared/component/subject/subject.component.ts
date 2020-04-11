import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/guard/auth.service';
import { CoreService } from 'app/shared/services/core.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  @Input() data = {};
  @Input() type = '';
  @Input() subjectId = '';
  constructor(private coreService : CoreService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.type);
  }
  


  
}
