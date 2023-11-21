import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoodsService } from '../../shared/services/goods/goods.service';
import { IGoodsResponse } from '../../shared/interfaces/goods.inteface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.scss'],
})
export class RollsComponent implements OnInit, OnDestroy {
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private spinnerService: NgxSpinnerService
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadGoods();
      }
      this.selectFilter('Всі');
    });
  }
  private eventSubscription!: Subscription;

  // array products
  public goodsArray: Array<IGoodsResponse> = [];

  // category name
  public categoryName!: string;

  ngOnInit(): void {
    this.spinnerService.show(); // show spinner
    this.loadGoods();
    this.selectFilter('Всі');
  }

  // This method downloads products from the server that match a specific category.
  loadGoods(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          this.categoryName = params['category'];
          return this.goodsService.getAllByCategoryFirebase(this.categoryName);
        })
      )
      .subscribe((data) => {
        this.goodsArray = data as IGoodsResponse[];
        this.selectFilter('Всі');
        this.spinnerService.hide();
      });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
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

  //  add to basket method
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
}
