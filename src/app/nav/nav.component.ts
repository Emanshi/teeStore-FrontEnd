import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
loggedIn;
userName;

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    this.loggedIn = false
    this.userName = "bdhsbhfgb"
  }

}
