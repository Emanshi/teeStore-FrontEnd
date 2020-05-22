import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticatorService } from '../auth/authenticator.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
loggedIn=false;
userName;

  constructor(private auth:AuthenticatorService) { }

  ngOnInit(): void {
    this.auth.sessionUser.subscribe(
      data=> {
        this.userName=data.userName
        if (this.userName!=null) {
          this.loggedIn=true
        }
      }
    )
  }

  logout() {
    this.loggedIn = false;
    this.userName = null;
    this.auth.user.userName=null;
    sessionStorage.clear();
  }

}
