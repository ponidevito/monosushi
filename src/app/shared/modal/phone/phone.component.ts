import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  public name!: string;
  public phone!: number;
}
