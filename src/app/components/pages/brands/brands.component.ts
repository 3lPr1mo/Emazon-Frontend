import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BrandFormComponent } from '../../shared/molecules/brand-form/brand-form.component';
import { Content, ContentPage } from 'src/app/common/dto/response/paged.response';
import { BrandService } from '../../../brand/service/brand.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  public headers = ["name", "description"];
  public page: number = 0;
  public size: number = 3;
  public isAsc: boolean = true;
  public sortBy: string = 'name';
  public totalPages: number = 1;
  public currentPage: number = 0;
  public data: Content[] = [{id: 0, name: '', description: ''}];

  @ViewChild(BrandFormComponent) brandFormComponent!: BrandFormComponent;

  constructor(private cd: ChangeDetectorRef, private service: BrandService) { }

  ngOnInit(): void {
    this.fetchAllBrands();
  }

  fetchAllBrands(page: number = this.page, size: number = this.size, isAsc: boolean = this.isAsc, sortBy:string = this.sortBy){
    this.service.getAllBrands(page, size, isAsc, sortBy).subscribe({
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

  getPagesArray(): number[] {
    return Array.from({length: this.totalPages}, (_, index) => index + 1);
  }

  goToPage(page: number): void {
    this.page = page;
    this.fetchAllBrands()
  }

  setOrder(isAsc: boolean){
    this.isAsc = isAsc;
    this.fetchAllBrands()
  }

  setSize(size: number){
    this.size = size;
    this.page=0;
    this.fetchAllBrands()
  }

  onOrderChange(isAsc: boolean){
    this.isAsc = isAsc;
    this.fetchAllBrands();
  }

  onSizeChange(size: number){
    this.size = size;
    this.page = 0;
    this.fetchAllBrands();
  }

  onPageSelected(page: number){
    this.page = page;
    this.currentPage = page;
    this.fetchAllBrands();
  }

}
