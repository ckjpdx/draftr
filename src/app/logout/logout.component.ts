import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit() {
  }

}
