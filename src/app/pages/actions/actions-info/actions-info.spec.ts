import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActionsInfoComponent } from '../actions-info/actions-info.component';
import { CapitalizePipe } from '../../../shared/pipes/capitalize/capitalize.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ActionService } from 'src/app/shared/services/action/action.service';

class MockActionService {
  getAllFirebase() {
    return of([]);
  }
}

describe('ActionsInfoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsInfoComponent, CapitalizePipe],
      imports: [RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ActionService, useClass: MockActionService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ActionsInfoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
