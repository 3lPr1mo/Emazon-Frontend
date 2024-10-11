import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { SecondaryButtonComponent } from './secondary-button/secondary-button.component';
import { PrimaryInputComponent } from './primary-input/primary-input.component';
import { TitleComponent } from './title/title.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { CloseButtonComponent } from './close-button/close-button.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    PrimaryInputComponent,
    TitleComponent,
    TextAreaComponent,
    CloseButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    PrimaryInputComponent,
    TitleComponent,
    TextAreaComponent,
    CloseButtonComponent
  ]
})
export class AtomsModule { }
