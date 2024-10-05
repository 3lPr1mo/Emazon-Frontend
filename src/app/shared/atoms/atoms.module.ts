import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { SecondaryButtonComponent } from './secondary-button/secondary-button.component';



@NgModule({
  declarations: [
    PrimaryButtonComponent,
    SecondaryButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrimaryButtonComponent,
    SecondaryButtonComponent
  ]
})
export class AtomsModule { }
