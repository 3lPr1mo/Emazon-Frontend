import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateCategoryRequest} from "../dtos/request/CreateCategory.request";
import { Observable } from 'rxjs';
import { ContentPage } from 'src/app/common/dto/response/paged.response';

@Injectable()
export class CategoryService {

  private apiUrl = 'http://localhost:8080/category'

  constructor(private httpClient: HttpClient) { }

  createCategory(category: CreateCategoryRequest) {
    return this.httpClient.post(this.apiUrl, category);
  }

  getAllCategories(page: number, size: number, isAsc: boolean, sortBy: string) : Observable<ContentPage> {
    return this.httpClient.get<ContentPage>(`${this.apiUrl}?page=${page}&size=${size}&isAsc=${isAsc}&sortBy=${sortBy}`);
  }
}
