import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { SecondaryButtonComponent } from './secondary-button/secondary-button.component';
import { PrimaryInputComponent } from './primary-input/primary-input.component';



@NgModule({
  declarations: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    PrimaryInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    PrimaryInputComponent
  ]
})
export class AtomsModule { }
