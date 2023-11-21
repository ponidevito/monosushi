import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollsComponent } from '../rolls/rolls.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BehaviorSubject, of } from 'rxjs';
import { Firestore } from '@firebase/firestore';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { NgxSpinnerModule } from 'ngx-spinner';

class AngularFirestoreStub {
  collection() {
    return {
      valueChanges: () => of([]),
    };
  }
}

class MockGoodsService {
  getAllFirebase() {
    return [];
  }
}
class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  loadBasket(): void {}
  updateBasket(): void {}
}

describe('RollsComponent', () => {
  let component: RollsComponent;
  let fixture: ComponentFixture<RollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RollsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule,NgxSpinnerModule],
      providers: [
        { provide: Firestore, useClass: AngularFirestoreStub },
        { provide: GoodsService, useValue: MockGoodsService },
        { provide: OrderService, useClass: MockOrderService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
