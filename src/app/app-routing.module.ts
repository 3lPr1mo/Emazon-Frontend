import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoleculesModule} from "./components/shared/molecules/molecules.module";
import {MainTemplateComponent} from "./components/templates/main-template/main-template.component";
import {CategoriesComponent} from "./components/pages/categories/categories.component";
import { BrandsComponent } from './components/pages/brands/brands.component';
import { OrganismsModule } from './components/shared/organisms/organisms.module';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
      path: 'categories',
      component: CategoriesComponent
      },
      {
        path: 'brands',
        component: BrandsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MoleculesModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
