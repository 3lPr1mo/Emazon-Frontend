import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTemplateComponent } from './main-template/main-template.component';
import {MoleculesModule} from "../shared/molecules/molecules.module";
import {RouterOutlet} from "@angular/router";
import { OrganismsModule } from '../shared/organisms/organisms.module';



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
    OrganismsModule,
    RouterOutlet
  ]
})
export class TemplateModule { }
