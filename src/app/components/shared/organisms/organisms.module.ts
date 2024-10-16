import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { CategoryService } from 'src/app/category/service/category.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/interceptor/token.interceptor.service';
import { ModalComponent } from './modal/modal.component';
import { ReactiveTableComponent } from './reactive-table/reactive-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalComponent,
    ReactiveTableComponent
  ],
  imports: [
    CommonModule,
    MoleculesModule,
    AtomsModule,
    FormsModule
  ],
  exports: [
    ModalComponent,
    ReactiveTableComponent
  ],
  providers: [
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class OrganismsModule { }
