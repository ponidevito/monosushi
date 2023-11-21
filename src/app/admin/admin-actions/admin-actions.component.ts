import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import {
  IAction,
  IActionResponse,
} from '../../shared/interfaces/actions.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.scss'],
})
export class AdminActionsComponent implements OnInit {
  constructor(
    public ActionService: ActionService,
    private ImageService: ImageService,
    private fb: FormBuilder,
    public toastService: ToastrService
  ) {}
  // FormGroup
  public actionForm!: FormGroup;

  // array actions
  public actions: Array<IAction> = [];

  public isUploaded = false;

  // progress bar
  public uploadPercent!: number;
  public progress!: number;

  // id
  public currentCategoryId!: number | string;

  // show edit
  public editStatus = false;

  // show form
  public showForm = false;

  // ngOnInit
  ngOnInit(): void {
    this.initActionForm();
    this.loadActions();
  }

  // This method creates a form using the Angular FormBuilder (variable fb) and sets initial values and validators for each field in the form.
  initActionForm(): void {
    const myDate = new Date();
    const date = `${myDate.getDate()}.${
      myDate.getMonth() + 1
    }.${myDate.getFullYear()}`;
    this.actionForm = this.fb.group({
      date: date,
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  // This method loads a list of actions using the ActionService service, which uses an HTTP request to the server. By taking the data from the request, the method assigns the received data from the variable data to the array this.actions.
  loadActions(): void {
    this.ActionService.getAllFirebase().subscribe((data) => {
      this.actions = data as IActionResponse[];
    });
  }
  // open button add action (toggle)
  openAction(): void {
    this.showForm = !this.showForm;
  }
  // open button edit action
  openEdit(): void {
    this.showForm = true;
  }
  // method add action
  addActions(): void {
    if (this.editStatus) {
      this.ActionService.updateFirebase(
        this.actionForm.value,
        this.currentCategoryId as string
      ).then(() => {
        this.loadActions();
        this.toastService.success('Акція відредагована!');
      });
    } else {
      this.ActionService.createFirebase(this.actionForm.value).then(() => {
        this.toastService.success('Акція додана!');
      });
    }

    this.editStatus = false;
    this.actionForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.showForm = false;
  }

  // This method uploads an image to the server when the user selects a file in the form.
  upload(event: any): void {
    const file = event.target.files[0];
    this.ImageService.uploadFile('images/actions', file.name, file)
      .then((data) => {
        this.actionForm.patchValue({
          image: data,
        });
        this.isUploaded = true;
      })
      .catch((err) => {
        console.log(err);
      });

    this.ImageService.progress$.subscribe((progress) => {
      this.progress = progress;
    });

    this.ImageService.progress$.subscribe((percent) => {
      this.uploadPercent = percent;
    });
  }

  // edit action
  editAction(action: IActionResponse): void {
    const myDate = new Date();
    const date = `${myDate.getDate()}.${
      myDate.getMonth() + 1
    }.${myDate.getFullYear()}`;
    this.actionForm.patchValue({
      date: date,
      name: action.name,
      title: action.title,
      description: action.description,
      image: action.image,
    });
    this.editStatus = true;
    this.currentCategoryId = action.id;
    this.isUploaded = true;
  }

  // delete action from firebase
  deleteAction(action: IActionResponse): void {
    this.ActionService.deleteFirebase(action.id as string).then(() => {
      this.loadActions();
      this.toastService.success('Акція видалена');
    });
  }

  // delete image from firebase
  deleteImage(): void {
    this.ImageService.deleteUploadFile(this.valueByControl('image')).then(
      () => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.actionForm.patchValue({
          image: null,
        });
      }
    );
  }

  // This method returns the value of a field in the form by its name.
  valueByControl(control: string): string {
    return this.actionForm.get(control)?.value;
  }
}
