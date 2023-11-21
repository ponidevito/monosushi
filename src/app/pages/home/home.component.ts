import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { IAction, IActionResponse } from 'src/app/shared/interfaces/actions.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private goodsService: GoodsService,
    private orderService: OrderService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private actionService: ActionService,

  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadGoods();
      }
      this.selectFilter('Всі');
    });
  }
  public actionsArray: Array<IAction> = [];
  private eventSubscription!: Subscription;

  public categoryName!: string;

  //  array goods
  public goodsArray: Array<IGoodsResponse> = [];

  ngOnInit() {
    this.spinnerService.show(); // show spinner
    this.loadGoods();
    this.homeSwiper();
    this.selectFilter('Всі');
    this.loadActions();

  }

  // This method loads a list of actions using the ActionService service, which uses an HTTP request to the server. By taking the data from the request, the method assigns the received data from the variable data to the array this.actions.
  loadGoods(): void {
    this.goodsService.getAllFirebase().subscribe((data) => {
      this.goodsArray = data as IGoodsResponse[];
      this.selectFilter('Всі');
      this.spinnerService.hide(); // show spinner
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  //  swiper
  homeSwiper(): void {
    const mySwiper = new Swiper('.swiper-container', {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 2,
      spaceBetween: 15,
      speed: 1000,
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      //   // Responsive breakpoints
      breakpoints: {
        //   // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        //   // when window width is >= 480px
        992: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });
  }



  // method count products
  public productCount(product: IGoodsResponse, value: boolean): void {
    const index = this.goodsArray.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      if (value) {
        ++this.goodsArray[index].count;
      } else if (!value && this.goodsArray[index].count > 1) {
        --this.goodsArray[index].count;
      }
    }
  }

  // add to basket method
  addToBasket(product: IGoodsResponse): void {
    this.orderService.addToBasket(product);
  }

  // filtered array
  public filteredData: Array<IGoodsResponse> = [];

  // initialize the variable with "All" value
  selectedFilter: string = 'Всі';

  // The selectFilter(filter: string) method filters the goods based on the passed filter parameter.
  selectFilter(filter: string) {
    this.selectedFilter = filter; // We update the value of selectedFilter.
    if (filter === 'Всі') {
      this.filteredData = this.goodsArray;
    } else {
      this.filteredData = this.goodsArray.filter((product) =>
        product.name.includes(filter)
      );
    }
  }



  // The loadActions() method sends a request to Firebase using the ActionService service and retrieves data about all available actions in the form of an array of IActionResponse[].
  loadActions(): void {
    this.actionService.getAllFirebase().subscribe((data) => {
      this.actionsArray = data as IActionResponse[];
      this.spinnerService.hide();
    });
  }
 
}
