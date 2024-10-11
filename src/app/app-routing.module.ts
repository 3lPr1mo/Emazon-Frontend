import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoleculesModule} from "./components/shared/molecules/molecules.module";
import {MainTemplateComponent} from "./components/templates/main-template/main-template.component";
import {CategoriesComponent} from "./components/pages/categories/categories.component";

const routes: Routes = [
  {
    path: 'dashboard',
    children: [{
      path: 'categories',
      component: CategoriesComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MoleculesModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
