import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Content, ContentPage } from 'src/app/category/dtos/response/categories.response';
import { CategoryService } from '../../../../category/service/category.service';

@Component({
  selector: 'app-reactive-table',
  templateUrl: './reactive-table.component.html',
  styleUrls: ['./reactive-table.component.scss']
})
export class ReactiveTableComponent implements OnInit {

  public data: Content[] = [{id: 0, name: '', description: ''}];
  public isAsc: boolean = true;
  page: number = 0;
  size: number = 3;
  sortBy: string = 'name';
  totalPages: number = 1;
  currentPage: number = 1;

  errorMessage = new EventEmitter<string>();
  //@Input() isAsc: boolean = true;
  
  constructor(private service: CategoryService) { }

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
          this.errorMessage.emit('Conexión fallida con el servidor');
          return;
        }
        if(err.status === 403) {
          this.errorMessage.emit('Error de autentificación');
        }
        return this.errorMessage.emit(err.message);
      }
    });
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
    this.fetchAllCategories()
  }

}
