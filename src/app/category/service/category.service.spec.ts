import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CreateCategoryRequest} from "../dtos/request/CreateCategory.request";

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.post with correct URL and payload', () => {
    const mockCategory: CreateCategoryRequest = {
      name: 'Test',
      description: 'Test description',
    };

    service.createCategory(mockCategory).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/category');
    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe('http://localhost:8080/category');
    expect(req.request.body).toBe(mockCategory);
  });

});
