import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { By } from '@angular/platform-browser';
class MockOrderService {
  orderCount = new BehaviorSubject<number>(0);
  loadBasket(): void {}
  updateBasket(): void {}
}
class MockAccountService {
  isUserLogin$ = new BehaviorSubject<number>(0);
  constructor() {
    this.isUserLogin$.next(0);
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
  
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatDialogModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: OrderService, useClass: MockOrderService },
        { provide: AccountService, useClass: MockAccountService },
        { provide: ToastrService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to catalog', () => {
    const body = document.getElementsByTagName('body');
    spyOn(body[0].classList, 'remove');

    const routerSpy = spyOn(component.router, 'navigate');
    component.navigateToCatalog();

    expect(component.showModalCart).toBe(false);
    expect(component.basketHeight).toBe(false);
    expect(component.layerBig).toBe(false);
    expect(body[0].classList.remove).toHaveBeenCalledWith('lockModal');
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should toggle show, layer and lockBurger', () => {
    const bodySpy = spyOn(
      document.getElementsByTagName('body')[0].classList,
      'toggle'
    );

    component.show = false;
    component.layer = false;
    component.burger();

    expect(component.show).toBe(true);
    expect(component.layer).toBe(true);
    expect(bodySpy).toHaveBeenCalledWith('lockBurger');

    component.burger();

    expect(component.show).toBe(false);
    expect(component.layer).toBe(false);
    expect(bodySpy).toHaveBeenCalledWith('lockBurger');
  });
  it('should close the block', () => {
    component.show = true;
    component.layer = true;
    component.closeBlock();
    expect(component.show).toBeFalse();
    expect(component.layer).toBeFalse();
    const body = document.getElementsByTagName('body')[0];
    expect(body.classList.contains('lockBurger')).toBeFalse();
  });

  it('should close the basket modal', () => {
    // Set initial values
    component.showModalCart = true;
    component.layerBig = true;
    component.basketHeight = true;
  
    // Call the method to close the basket modal
    component.closeBusket();
  
    // Verify that the body class is removed
    const body = document.getElementsByTagName('body')[0];
    expect(body.classList.contains('lockModal')).toBe(false);
  
    // Verify that the component properties have the expected values
    expect(component.showModalCart).toBe(false);
    expect(component.layerBig).toBe(false);
    expect(component.basketHeight).toBe(false);
  });

  it('should add a box-shadow class to the header element when the page is scrolled down and remove it when scrolled to the top', () => {
    const headerEl = fixture.debugElement.query(By.css('header'));
    const navEl = headerEl.nativeElement;
    const spy = spyOn(navEl.classList, 'add').and.callThrough();
    const spy2 = spyOn(navEl.classList, 'remove').and.callThrough();
  
    // Scroll down and check that the box-shadow class is added
    window.pageYOffset = 100;
    component.onScroll();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('box-shadow');
  
    // Scroll up and check that the box-shadow class is removed
    window.pageYOffset = 0;
    component.onScroll();
    fixture.detectChanges();
    expect(spy2).toHaveBeenCalledWith('box-shadow');
  });
  
  
});
