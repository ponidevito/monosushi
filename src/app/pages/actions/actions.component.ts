import { Component, OnInit } from '@angular/core';
import {
  IAction,
  IActionResponse,
} from 'src/app/shared/interfaces/actions.interface';
import { ActionService } from '../../shared/services/action/action.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  constructor(
    private ActionService: ActionService,
    private spinnerService: NgxSpinnerService
  ) {}

  // array action
  public actionsArray: Array<IAction> = [];

  ngOnInit(): void {
    this.spinnerService.show(); // показати спінер
    this.loadActions();
  }
  // The loadActions() method sends a request to Firebase using the ActionService service and retrieves data about all available actions in the form of an array of IActionResponse[].
  loadActions(): void {
    this.ActionService.getAllFirebase().subscribe((data) => {
      this.actionsArray = data as IActionResponse[];
      this.spinnerService.hide();
    });
  }
 
 
}
