import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeliveryComponent } from '../../pages/delivery/delivery.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DeliveryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DeliveryComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
