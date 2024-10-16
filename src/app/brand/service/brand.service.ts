import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBrandRequest } from '../dtos/CreateBrand.request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = 'http://localhost:8080/brand'

  constructor(private httpClient: HttpClient) { }

  createBrand(brand: CreateBrandRequest) : Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, brand);
  }
}
