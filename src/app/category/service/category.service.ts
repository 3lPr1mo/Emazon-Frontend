import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateCategoryRequest} from "../dtos/request/CreateCategory.request";

@Injectable()
export class CategoryService {

  private apiUrl = 'http://localhost:8080/category'

  constructor(private httpClient: HttpClient) { }

  createCategory(category: CreateCategoryRequest) {
    console.log(category);
    return this.httpClient.post(this.apiUrl, category);
  }
}
