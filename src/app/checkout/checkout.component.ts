import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/users';
import { AuthenticatorService } from '../auth/authenticator.service';
import { CartService } from '../cart/cart.service';
import { Title } from '@angular/platform-browser';
import { Cart } from '../models/cart';
import { RemoveProductDialog } from '../cart/remove.product.dialog';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../profile/profile.service';
import { CheckoutService } from './checkout.service';
import { Address } from '../models/address';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product';
import { ViewProductService } from '../view-product/view-product.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Card } from '../models/card';
import { DeleteCardDialog } from './delete.card.dialog';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  type: string
  value: string
  loggiedIn: boolean
  loggedInUser: User
  cart: Cart
  deliveryDate: Date
  cartCost: number
  cartTotal: number
  deliveryFee: number
  viewUser: User
  selectedSize: string
  addressAccordian: boolean
  cartAccordian: boolean
  payAccordian: boolean
  addressSelected: Address
  cardSelected: Card
  payMode: string
  upiVpa: string
  validVPA: boolean
  vpaColor: string
  payValid: boolean
  newAddressForm: FormGroup
  newCardForm: FormGroup
  addressSelector: string
  cardSelector: string
  cardList: Card[]
  saveCard: boolean

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticatorService,
    private dialog: MatDialog,
    private cartService: CartService,
    private profileService: ProfileService,
    private productService: ViewProductService,
    private snackBar: MatSnackBar,
    private service: CheckoutService,
    private title: Title
  ) {
    title.setTitle('CheckOut')
  }

  ngOnInit(): void {
    this.addressAccordian = true
    this.loggiedIn = false
    this.auth.sessionUser.subscribe(
      (data) => {
        this.loggedInUser = data;
        if (data.userName != null) {
          this.loggiedIn = true
          this.profileService.getUser(this.loggedInUser).subscribe(
            res => this.viewUser = res
          )
        }
      }
    )

    if (!this.loggiedIn) {
      this.router.navigate(['/login'])
    }

    this.route.queryParams.subscribe(
      params => {
        this.type = params['type']
        this.value = params['value']
        this.selectedSize = params['size']
      }
    )

    if (this.type == 'cart') {
      this.cartService.getCart(this.loggedInUser.userId).subscribe(
        res => {
          this.cart = res
          this.calculateCost()
        }
      )
    } else {
      let p: Product
      this.productService.getProductById(this.value).subscribe(
        res => {
          this.cart = { cartId: '', totalCost: res.cost, products: [res], user: this.loggedInUser, sizes: [this.selectedSize], quantities: [1] }
          this.calculateCost()
        }
      )
    }

    this.vpaColor = 'primary'

    this.payValid = false

    this.deliveryDate = new Date()
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 4)
  }

  addressFormInit() {
    this.newAddressForm = this.fb.group({
      street: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      pinCode: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]]
    })
  }

  cardFormInit() {
    this.saveCard = true
    this.newCardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern("^[0-9]{16}$")]],
      cardHolderName: ['', [Validators.required, Validators.maxLength(50)]],
      cvv: ['', [Validators.required, Validators.pattern("^[0-9]{3}$")]],
      expiryMonthYear: ['', [Validators.required, this.validateExpiry]]
    })
  }

  addQty(i: number) {
    this.cart.quantities[i] = this.cart.quantities[i] + 1
    this.calculateCost()
    this.cartService.changed = true
  }

  subQty(i: number) {
    this.cart.quantities[i] = this.cart.quantities[i] - 1
    this.calculateCost()
    this.cartService.changed = true
  }

  calculateCost() {
    this.cartCost = 0
    this.cartTotal = 0
    for (let i = 0; i < this.cart.products.length; i++) {
      this.cartCost += this.cart.products[i].cost * (1 - this.cart.products[i].discount / 100) * this.cart.quantities[i]
      this.cartTotal += this.cart.products[i].cost * this.cart.quantities[i]
    }
    if (this.cartCost > 1499 || this.cart.products.length == 0) {
      this.deliveryFee = 0
    } else {
      this.deliveryFee = 250
    }
    this.cart.totalCost = this.cartCost + this.deliveryFee
    this.cartService.cart = this.cart
  }

  removeProductConfirmer(i: number): void {
    const dialogRef = this.dialog.open(RemoveProductDialog, {
      width: '250px',
      data: i
    });

    dialogRef.afterClosed().subscribe(result => {
      this.removeProduct(result)
    });
  }

  removeProduct(i: number) {
    this.cartService.removeProduct(this.loggedInUser.userId, this.cart.products[i].productId, this.cart.sizes[i]).subscribe(
      res => {
        console.log('Product removed with result : ' + res)
        this.cart.products.splice(i, 1)
        this.cart.quantities.splice(i, 1)
        this.cart.sizes.splice(i, 1)
        this.calculateCost()
      },
      err => alert(err.error.errorMessage)
    )
  }

  setAddress(index: number) {
    this.addressSelected = this.viewUser.addresses[index]
  }

  setCard(i) {
    this.cardSelected = this.cardList[i]
  }

  proceedAddressSelected() {
    if (!this.addressSelected && this.addressSelector != 'new') {
      this.snackBar.open('Please select an address', 'Okay', {
        duration: 50000,
        verticalPosition: 'bottom',
        panelClass: 'warn-snackbar'
      });
    } else if (this.addressSelector == 'new') {
      if (this.newAddressForm.invalid) {
        this.snackBar.open('Please enter appropiate address', 'Okay', {
          duration: 50000,
          verticalPosition: 'bottom',
          panelClass: 'warn-snackbar'
        });
      } else {
        this.addressSelected = this.newAddressForm.value
        this.profileService.addAddress(this.addressSelected, this.viewUser.userId).subscribe(
          res => this.addressSelected.addressId = res,
          err => alert("Address could not be added. " + JSON.stringify(err))
        )
        this.addressAccordian = false
        this.cartAccordian = true
      }
    }
    else {
      this.addressAccordian = false
      this.cartAccordian = true
    }
  }

  deleteCardConfirmer(aId) {
    const dialogRef = this.dialog.open(DeleteCardDialog, {
      width: '250px',
      data: aId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteCard(result)
    });
  }

  deleteCard(data) {
    if (data != null) {
      this.service.deleteCard(data).subscribe(
        res => {
          console.log('Card no ' + res + ' deleted');
          this.snackBar.open('Card deleted', 'Okay', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'primary-snackbar'
          });
          this.getAllCards()
        },
        err => {
          console.log(JSON.stringify(err));
          this.snackBar.open('Unable to delete Card', 'Okay', {
            duration: 50000,
            verticalPosition: 'bottom',
            panelClass: 'warn-snackbar'
          });
          this.cardList=[]
        }
      )
    }
  }

  proceedCartConfirmed() {
    if (!this.addressSelected) {
      alert('Please select an address')
    } else {
      if (this.cartService.changed == true && this.type == 'cart') {
        this.cartService.updateCart(this.cart.cartId).subscribe(
          res => console.log('Cart saved with res : ' + res),
          err => alert(JSON.stringify(err))
        )
        this.cartService.changed = false
      }

      this.getAllCards()

      this.cartAccordian = false
      this.payAccordian = true
    }
  }

  getAllCards() {
    this.service.getAllCards(this.viewUser.userId).subscribe(
      res => this.cardList = res,
      err => console.log('Card retrieval error : ' + JSON.stringify(err))
    )
  }

  validateVPA() {
    let reg: RegExp = /^[a-zA-z0-9]+[A-Za-z0-9_.-]+[A-Za-z0-9]+@[a-zA-Z]+$/
    this.validVPA = reg.test(this.upiVpa)
    if (!this.validVPA) {
      this.vpaColor = 'warn'
      this.payValid = false
    } else {
      this.vpaColor = 'accent'
      this.payValid = true
    }
  }

  placeOrder() {
    if (this.payMode == 'card' && this.newCardForm.invalid) {
      this.snackBar.open('Please enter valid card details', 'Okay', {
        duration: 50000,
        verticalPosition: 'bottom',
        panelClass: 'warn-snackbar'
      });
    } else {
      if (this.saveCard) {
        this.service.addCard(this.newCardForm.value, this.viewUser.userId).subscribe(
          res => console.log('Card persisted with id : ' + res),
          err => alert(JSON.stringify(err))
        )
      }
      this.service.placeOrder(this.cart, this.addressSelected.addressId, this.payMode).subscribe(
        res => {
          this.snackBar.open('Congrats! Order has been placed', 'Thanks', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'primary-snackbar'
          });
          this.router.navigate(['/order'], { queryParams: { id: res } });
        },
        err => alert(JSON.stringify(err))
      )
    }
  }

  validateExpiry(control: AbstractControl): { [key: string]: any } | null {
    let expiry: string = control.value;
    let parts = expiry.split('-')
    if (Number(parts[0]) < 0 || Number(parts[0]) > 12 || Number(parts[1]) > 99) {
      return { 'expiryInvalid': true };
    }
    let today = new Date()
    let expire = new Date(2000 + Number(parts[1]), Number(parts[0]))
    if (today > expire || expire.getFullYear() - today.getFullYear() > 6) {
      return { 'expiryInvalid': true };
    }
    return null;
  }
}
