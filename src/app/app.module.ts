import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AtomsModule} from "./components/shared/atoms/atoms.module";
import {MoleculesModule} from "./components/shared/molecules/molecules.module";
import { ModalComponent } from './components/shared/organisms/modal/modal.component';
import {TemplateModule} from "./components/templates/template.module";
import { CategoriesComponent } from './components/pages/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    CategoriesComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AtomsModule,
        MoleculesModule,
        TemplateModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
