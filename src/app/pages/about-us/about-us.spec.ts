import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AboutUsComponent } from '../about-us/about-us.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AboutUsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [],
      declarations: [],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AboutUsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
