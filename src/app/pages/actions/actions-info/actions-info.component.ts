import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from '../../../shared/services/action/action.service';
import { IActionResponse } from '../../../shared/interfaces/actions.interface';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-actions-info',
  templateUrl: './actions-info.component.html',
  styleUrls: ['./actions-info.component.scss'],
})
export class ActionsInfoComponent implements OnInit {
  public action!: IActionResponse;

  constructor(
    private actionsService: ActionService,
    private activatedRoute: ActivatedRoute,
    private spinnerService: NgxSpinnerService

  ) {}

  // breadcrumbs
  breadcrumbItems = [
    { label: 'Головна', path: '/' },
    { label: 'Акції', path: '/actions' },
    { label: 'Рол Тижня', path: '/акції/рол-тижня' },
  ];

  ngOnInit(): void {
    this.spinnerService.show(); // показати спінер
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.actionsService.getOneFirebase(id).subscribe((data) => {
        this.action = { ...data, id: data['id'].toString() } as IActionResponse;
        this.spinnerService.hide();
      });
    });
  }
  
}
