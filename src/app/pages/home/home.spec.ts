import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { BehaviorSubject, of } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { NgxSpinnerModule } from 'ngx-spinner';

class MockGoodsService {
  getAllFirebase() {
    return of([]);
  }
}
class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  loadBasket(): void {}
  updateBasket(): void {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, NgxSpinnerModule],
      providers: [
        { provide: GoodsService, useClass: MockGoodsService },
        { provide: OrderService, useClass: MockOrderService },
      ],

   
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
