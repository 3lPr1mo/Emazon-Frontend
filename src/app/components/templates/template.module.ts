import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTemplateComponent } from './main-template/main-template.component';
import {MoleculesModule} from "../shared/molecules/molecules.module";
import {RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [
    MainTemplateComponent
  ],
  exports: [
    MainTemplateComponent
  ],
  imports: [
    CommonModule,
    MoleculesModule,
    RouterOutlet
  ]
})
export class TemplateModule { }
