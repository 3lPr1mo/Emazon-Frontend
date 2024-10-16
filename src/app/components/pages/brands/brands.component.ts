import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BrandFormComponent } from '../../shared/molecules/brand-form/brand-form.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  public modalIsVisible: boolean = false;
  public successIsVisible: boolean = false;
  public errorIsVisible: boolean = false;
  public errorMessage: string = "Error al crear la marca";

  @ViewChild(BrandFormComponent) brandFormComponent!: BrandFormComponent;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.modalIsVisible = true;
    this.cd.detectChanges();
  }

  closeModal(): void {
    this.modalIsVisible = false;
    this.brandFormComponent.resetForm();
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
