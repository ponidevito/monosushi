import { TestBed } from '@angular/core/testing';
import { ActionService } from '../action/action.service';

class MockActionService {
  getAllFirebase() {
    return [];
  }
}

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ActionService, useValue: { MockActionService } },
      ],
    });
    service = TestBed.inject(ActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});

