import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionsComponent } from '../admin-actions/admin-actions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import {
  IActionRequest,
  IActionResponse,
} from 'src/app/shared/interfaces/actions.interface';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { DocumentData, DocumentReference } from 'firebase/firestore';

class MockActionService {
  getAllFirebase() {
    return of([]);
  }
  createFirebase(
    data: IActionRequest
  ): Promise<DocumentReference<DocumentData>> {
    return Promise.resolve({} as DocumentReference<DocumentData>);
  }
}

describe('AdminActionsComponent', () => {
  let component: AdminActionsComponent;
  let fixture: ComponentFixture<AdminActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminActionsComponent],
      imports: [AngularFireStorageModule, HttpClientTestingModule],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ActionService, useClass: MockActionService },
        { provide: ToastrService, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit an existing action', () => {
    spyOn(component, 'editAction').and.callThrough();
    const action: IActionResponse = {
      id: 1,
      date: '02.05.2023',
      name: 'Action Name',
      title: 'Action Title',
      description: 'Action Description',
      image: 'Action Image',
    };
    component.editAction(action);
    fixture.detectChanges();
    expect(component.actionForm.controls['date']?.value).toEqual('2.5.2023');
    expect(component.actionForm.controls['name']?.value).toEqual(action.name);
    expect(component.actionForm.controls['title']?.value).toEqual(action.title);
    expect(component.actionForm.controls['description']?.value).toEqual(
      action.description
    );
    expect(component.actionForm.controls['image']?.value).toEqual(action.image);
    expect(component.editStatus).toBeTruthy();
    expect(component.currentCategoryId).toEqual(action.id);
    expect(component.isUploaded).toBeTruthy();
  });

  it('should initialize the action form correctly', () => {
    component.initActionForm();
    expect(component.actionForm.get('name')?.errors).toEqual({
      required: true,
    });
    expect(component.actionForm.get('title')?.errors).toEqual({
      required: true,
    });
    expect(component.actionForm.get('description')?.errors).toEqual({
      required: true,
    });
    expect(component.actionForm.get('image')?.errors).toEqual({
      required: true,
    });
  });

  it('should return correct value for given control', () => {
    const nameControl = component.actionForm.get('name');
    nameControl?.setValue('Test name');
    expect(component.valueByControl('name')).toBe('Test name');

    const titleControl = component.actionForm.get('title');
    titleControl?.setValue('Test title');
    expect(component.valueByControl('title')).toBe('Test title');

    const descriptionControl = component.actionForm.get('description');
    descriptionControl?.setValue('Test description');
    expect(component.valueByControl('description')).toBe('Test description');

    const imageControl = component.actionForm.get('image');
    imageControl?.setValue('Test image');
    expect(component.valueByControl('image')).toBe('Test image');
  });
});
