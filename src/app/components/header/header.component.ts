import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhoneComponent } from '../../shared/modal/phone/phone.component';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { IGoodsResponse } from '../../shared/interfaces/goods.inteface';
import { LoginComponent } from 'src/app/shared/modal/login/login.component';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private dialog: MatDialog,
    public orderService: OrderService,
    private accountService: AccountService,
    public router: Router,
    private toastService: ToastrService
  ) {}

  public userRole!: string;
  public goodsArray: Array<IGoodsResponse> = [];
  public basketHeight = false;
  public lock = false;

  // This code listens for the window scroll event and changes the style of the HTML element "header" with the class "box-shadow" based on whether the window is being scrolled or not.
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const nav = this.elementRef.nativeElement.querySelector('header');
    if (window.pageYOffset > 0) {
      nav.classList.add('box-shadow');
    } else {
      nav.classList.remove('box-shadow');
    }
  }
  public show = false;
  public layer = false;
  public layerBig = false;

  // login
  public isLogin = false;
  public loginUrl = '';
  public loginHistory = 'my-cabinet/order-history';
  public totalSum!: number;

  ngOnInit(): void {
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
    this.totalSum = this.getTotalSum();

  }

  // burger menu
  burger() {
    this.show = !this.show;
    this.layer = !this.layer;
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('lockBurger');
  }

  //  close
  closeBlock() {
    this.show = false;
    this.layer = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lockBurger');
  }

  //  open modal
  openDialog() {
    this.dialog.open(PhoneComponent);
  }
  //  open modal login
  openModalLogin() {
    this.dialog.open(LoginComponent);
  }

  //  modal
  public showModalCart = false;

  //  open cart modal
  openModalCart() {
    this.showModalCart = !this.showModalCart;
    this.basketHeight = !this.basketHeight;
    this.layerBig = !this.layerBig;
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('lockModal');
  }

  // method count products
  public productCount(product: IGoodsResponse, value: boolean): void {
    const index = this.orderService.basket.findIndex(
      (p) => p.id === product.id
    );
    if (index !== -1) {
      if (value) {
        ++this.orderService.basket[index].count;
      } else if (!value && this.orderService.basket[index].count > 1) {
        --this.orderService.basket[index].count;
      }
    }
  }

  // This method is responsible for closing the cart modal window when the user clicks outside of it.
  onModalWrapperClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const modal = target.closest('.modal');
    const body = document.getElementsByTagName('body')[0];
    if (!modal) {
      this.showModalCart = false;
      this.layerBig = false;
      this.basketHeight = false;
      body.classList.remove('lockModal');
    }
  }
  

  // close busket
  closeBusket(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lockModal');
    this.showModalCart = false;
    this.layerBig = false;
    this.basketHeight = false;
  }

  // This method calculates the price and quantity of the product and displays the total amount
  getTotalSum(): number {
    if (!this.orderService.basket) {
      return 0;
    }
  
    return this.orderService.basket.reduce(
      (total, product) => total + product.price * product.count,
      0
    );
  }

  // remove product
  removeProduct(product: IGoodsResponse, event: any) {
    const index = this.orderService.basket.indexOf(product);
    if (index > -1) {
      this.orderService.basket.splice(index, 1);
      --this.orderService.count;
      localStorage.setItem('basket', JSON.stringify(this.orderService.basket));
      localStorage.setItem('count', JSON.stringify(this.orderService.count));
    }
    // this line to stop the event from propagating
    event.stopPropagation();
  }

  navigateToCatalog() {
    this.showModalCart = false;
    this.basketHeight = false;
    this.layerBig = false;
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('lockModal');

    // navigate to /home
    this.router.navigate(['/home']);
  }

  // This method checks whether the browser's local storage contains a record of the logged-in user.
  checkUserLogin(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    const role = JSON.parse(localStorage.getItem('userRole') || '{}');
    this.userRole = role;
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin/actions';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'my-cabinet/user';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
    }
  }

  // This method checks the user's status. If the status has changed, the user's record is checked for in the browser's local storage and the isLogin, loginUrl, and loginPage variables are set to the appropriate values.
  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    });
  }

  // remove item from localStorage
  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('basket');
    localStorage.removeItem('count');
    this.orderService.loadBasket();
    this.orderService.updateBasket();
    this.orderService.basket = [];
    this.orderService.changeBasket.next(true);
    this.accountService.isUserLogin$.next(true);
    this.toastService.success('Ви успішно вийшли з системи');
  }
}
