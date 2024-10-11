import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CategoryFormComponent} from "../../shared/molecules/category-form/category-form.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public modalIsVisible: boolean = false;
  public successIsVisible: boolean = false;
  public errorIsVisible: boolean = false;
  public errorMessage: string = "Error al crear la cateogría";

  @ViewChild(CategoryFormComponent) categoryFormComponent!: CategoryFormComponent;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.modalIsVisible = true;
    this.cd.detectChanges();
  }

  closeModal(): void {
    this.modalIsVisible = false;
    this.categoryFormComponent.resetForm();
  }

  openSuccess(): void {
    this.closeModal();
    this.successIsVisible = true;
  }

  closeSuccess(): void {
    this.successIsVisible = false;
  }

  openError(error:string): void {
    this.errorMessage = error;
    this.errorIsVisible = true;
  }

  closeError(): void {
    this.errorIsVisible = false;
    this.modalIsVisible = false;
  }

}
