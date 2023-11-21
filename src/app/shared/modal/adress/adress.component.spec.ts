import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressComponent } from './adress.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';


describe('AdressComponent', () => {
  let component: AdressComponent;
  let fixture: ComponentFixture<AdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule,    
    ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: Firestore, useValue: {} }
        
      ],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();

    fixture = TestBed.createComponent(AdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
