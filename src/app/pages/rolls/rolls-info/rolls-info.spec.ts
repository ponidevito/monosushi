import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollsInfoComponent } from '../rolls-info/rolls-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize/capitalize.pipe';

class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  loadBasket(): void {}
  updateBasket(): void {}
}
class MockGoodsService {
  orderCount = new BehaviorSubject<number>(0);
  getAllFirebase() {
    return of([]);
  }
}

describe('RollsInfoComponent', () => {
  let component: RollsInfoComponent;
  let fixture: ComponentFixture<RollsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RollsInfoComponent,    CapitalizePipe
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgxSpinnerModule
      ],
      providers: [
        { provide: ToastrService, useValue: {} },
        { provide: GoodsService, useClass: MockGoodsService },
        { provide: OrderService, useClass: MockOrderService },

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RollsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
