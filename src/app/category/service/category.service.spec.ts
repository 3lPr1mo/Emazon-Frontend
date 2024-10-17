import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CreateCategoryRequest} from "../dtos/request/CreateCategory.request";
import { ContentPage } from 'src/app/common/dto/response/paged.response';

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

  test('should return ContentPage with correct URL', () => {
    const mockContentPage : ContentPage = {
      totalPage:     0,
      totalElements: 1,
      pageNumber:    0,
      pageSize:      3,
      first:         true,
      last:          true,
      content:       [{id: 1, name: 'a', description: 'aa'}]
    }

    service.getAllCategories(0,3,true,'name').subscribe(
      data => {
        expect(data).toEqual(mockContentPage);
      }
    );

    const req = httpMock.expectOne(
      'http://localhost:8080/category?page=0&size=3&isAsc=true&sortBy=name'
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockContentPage);

  });

});
