import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticatorService } from '../auth/authenticator.service';
import { Router} from '@angular/router';
import { NavService } from './nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
loggedIn=false;
userName;
search:string;

  constructor(private auth:AuthenticatorService,private router:Router,private service:NavService) { }

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

  onKey(event: any) { 
    this.search = event.target.value;
  }

  getProductBySearch(){
    this.router.navigate( ['/products'], { queryParams: { filter: 'search',value:this.search}});
  }

  logout() {
    this.loggedIn = false;
    this.userName = null;
    this.auth.user.userName=null;
    sessionStorage.clear();
  }

}
