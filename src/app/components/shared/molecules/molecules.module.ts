import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {AtomsModule} from "../atoms/atoms.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CategoryFormComponent } from './category-form/category-form.component';
import {CategoryService} from "../../../category/service/category.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptorService} from "../../../interceptor/token.interceptor.service";
import { ModalMessageComponent } from './modal-message/modal-message.component';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    NavBarComponent,
    LoginFormComponent,
    CategoryFormComponent,
    ModalMessageComponent,
  ],
  exports: [
    NavBarComponent,
    LoginFormComponent,
    CategoryFormComponent,
    ModalMessageComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
})
export class MoleculesModule { }
