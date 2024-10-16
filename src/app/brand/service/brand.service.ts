import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBrandRequest } from '../dtos/CreateBrand.request';
import { Observable } from 'rxjs';
import { ContentPage } from 'src/app/common/dto/response/paged.response';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = 'http://localhost:8080/brand'

  constructor(private httpClient: HttpClient) { }

  createBrand(brand: CreateBrandRequest) {
    return this.httpClient.post(this.apiUrl, brand);
  }

  getAllBrands(page: number, size: number, isAsc: boolean, sortBy: string): Observable<ContentPage> {
    return this.httpClient.get<ContentPage>(`${this.apiUrl}?page=${page}&size=${size}&isAsc=${isAsc}&sortBy=${sortBy}`);
  }
}
