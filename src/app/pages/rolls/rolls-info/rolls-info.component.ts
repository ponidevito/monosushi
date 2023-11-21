import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods.inteface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { GoodsService } from '../../../shared/services/goods/goods.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rolls-info',
  templateUrl: './rolls-info.component.html',
  styleUrls: ['./rolls-info.component.scss'],
})
export class RollsInfoComponent implements OnInit {
  public product: IGoodsResponse = {
    id: '',
    name: '',
    ingredients: '',
    category: {
      id: '',
      name: '',
      path: '',
      image: '',
    },
    price: 0,
    weight: 0,
    image: '',
    count: 1,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private goodsService: GoodsService,
    private spinnerService: NgxSpinnerService
  ) {}

  // breadcrumb
  public category!: string;
  breadcrumbItems = [
    { label: 'Головна', path: '/' },
    { label: this.getCategoryLabel(), path: '/product/' + this.category },
    { label: 'Рол Тижня', path: '/акції/рол-тижня' },
  ];

  ngOnInit(): void {
    this.spinnerService.show(); // show spinner
    this.loadGoods();
  }

  // The loadGoods() method retrieves the value of the category parameter from the activatedRoute, which contains the category of goods that should be loaded.
  loadGoods(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.category = params['category'];
      this.breadcrumbItems = [
        { label: 'Головна', path: '/' },
        { label: this.getCategoryLabel(), path: '/product/' + this.category },
        { label: 'Рол Тижня', path: '/акції/рол-тижня' },
      ];

      this.goodsService.getOneFirebase(id).subscribe((data) => {
        this.product = { ...data, id: data['id'].toString() } as IGoodsResponse;
        this.spinnerService.hide(); // show spinner
      });
    });
  }

  // This code defines the label of a product category based on the value of the category variable.
  getCategoryLabel(): string {
    if (this.category === 'rolls') {
      return 'Роли';
    } else if (this.category === 'drinks') {
      return 'Напої';
    } else if (this.category === 'souces') {
      return 'Cоуси';
    } else if (this.category === 'seti') {
      return 'Сети';
    } else {
      return '';
    }
  }

  // method count products
  productCount(product: IGoodsResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  // add to basket
  addToBasket(product: IGoodsResponse): void {
    this.orderService.addToBasket(product);
  }
}
