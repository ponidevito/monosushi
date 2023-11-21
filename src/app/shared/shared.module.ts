import { NgModule } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatMenuModule } from '@angular/material/menu';



export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


const MATERIAL = [
  MatExpansionModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule
  
];

// other modules
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionComponent } from '../components/accordion/accordion.component';
import { GoogleMapsModule } from '@angular/google-maps';




// capitalize
import { CapitalizePipe } from '../shared/pipes/capitalize/capitalize.pipe';



@NgModule({
    declarations: [
      CapitalizePipe,
      AccordionComponent,
      

  ],
    imports: [
        ...MATERIAL,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        GoogleMapsModule,
        NgxMaskModule.forRoot()

      ],
    
    exports: [
        ...MATERIAL,
        FormsModule,
        ReactiveFormsModule,
        CapitalizePipe,
        AccordionComponent,
        NgxSpinnerModule,
        GoogleMapsModule,
        NgxMaskModule

    ],
    providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' },

    ],
})
export class SharedModule { }
