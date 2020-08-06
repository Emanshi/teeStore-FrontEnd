import { Component, OnInit } from '@angular/core';
import { Orders } from '../models/orders';
import { ViewOrdersService } from './view-orders.service';
import { Title } from '@angular/platform-browser';
import { AuthenticatorService } from '../auth/authenticator.service';
import { User } from '../models/users';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  loggedInUser: User
  loggedIn: boolean
  today: Date
  deliverDate: Date
  orderId: string
  order: Orders

  constructor(
    private service: ViewOrdersService,
    private auth: AuthenticatorService,
    private title: Title,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) {
    title.setTitle("View Order")
  }

  ngOnInit(): void {
    this.loggedIn = false
    this.today = new Date();

    this.route.queryParams.subscribe(
      params => {
        this.orderId = params['id']
      }
    )

    this.auth.sessionUser.subscribe(
      (data) => {
        this.loggedInUser = data;
        if (data.userName != null) {
          this.loggedIn = true
          this.service.getOrder(this.orderId).subscribe(
            res => {
              this.order = res
              if (this.loggedInUser.userId !== this.order.user.userId) {
                this.snackBar.open('Unauthorized', 'Okay', {
                  duration: 5000,
                  verticalPosition: 'bottom',
                  panelClass: 'warn-snackbar'
                });
                this.router.navigate(['/home'])
              }

              this.deliverDate = new Date(this.order.timeOfOrder);
              this.deliverDate.setDate(this.deliverDate.getDate() + 4)
            }
          )
        }
      }
    )

    if (!this.loggedIn) {
      this.router.navigate(['/login'])
    }
  }

}
