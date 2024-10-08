import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {CategoryService} from "./service/category.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [CategoryService],
})
export class CategoryModule { }
