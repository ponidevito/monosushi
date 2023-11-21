import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsComponent } from './actions.component';
import { ActionService } from '../../shared/services/action/action.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';


class MockActionService {
  getAllFirebase() {
    return [];
  }
}

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let actionService: ActionService;
  let spinnerService: NgxSpinnerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      imports: [NgxSpinnerModule],
      providers: [
        { provide: NgxSpinnerService, useValue: {} },
        { provide: ActionService, useClass: MockActionService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    actionService = TestBed.inject(ActionService);
    spinnerService = TestBed.inject(NgxSpinnerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
