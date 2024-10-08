import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.modalIsVisible = true;
  }

  closeModal(): void {
    this.modalIsVisible = false;
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
