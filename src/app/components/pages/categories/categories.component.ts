import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CategoryFormComponent} from "../../shared/molecules/category-form/category-form.component";
import { CategoryService } from '../../../category/service/category.service';
import { Content, ContentPage } from 'src/app/common/dto/response/paged.response';
import { HttpErrorResponse } from '@angular/common/http';

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
  public headers = ["name", "description"];
  public page: number = 0;
  public size: number = 3;
  public isAsc: boolean = true;
  public sortBy: string = 'name';
  public totalPages: number = 1;
  public currentPage: number = 0;
  public data: Content[] = [{id: 0, name: '', description: ''}];

  @ViewChild(CategoryFormComponent) categoryFormComponent!: CategoryFormComponent;

  constructor(private cd: ChangeDetectorRef, private service: CategoryService) { }

  ngOnInit(): void {
    this.fetchAllCategories();
  }

  fetchAllCategories(page: number = this.page, size: number = this.size, isAsc: boolean = this.isAsc, sortBy:string = this.sortBy) {
    this.service.getAllCategories(page, size, isAsc, sortBy).subscribe({
      next: (dataInfo: ContentPage) => {
        this.data = dataInfo.content;
        this.totalPages = dataInfo.totalPage;
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 0) {
          this.errorMessage = 'Conexión fallida con el servidor';
          return;
        }
        if(err.status === 403) {
          this.errorMessage = 'Error de autentificación';
          return;
        }
        return this.errorMessage = err.message;
      }
    });
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
    this.fetchAllCategories();
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

  getPagesArray(): number[] {
    return Array.from({length: this.totalPages}, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    this.page = page;
    this.fetchAllCategories()
  }

  setOrder(isAsc: boolean){
    this.isAsc = isAsc;
    this.fetchAllCategories()
  }

  setSize(size: number){
    this.size = size;
    this.page=0;
    this.fetchAllCategories()
  }

  onOrderChange(isAsc: boolean){
    this.isAsc = isAsc;
    this.fetchAllCategories();
  }

  onSizeChange(size: number){
    this.size = size;
    this.page = 0;
    this.fetchAllCategories();
  }

  onPageSelected(page: number){
    this.page = page;
    this.currentPage = page;
    this.fetchAllCategories();
  }

}
