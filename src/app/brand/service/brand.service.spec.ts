import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateBrandRequest } from '../dtos/CreateBrand.request';
import { Content, ContentPage } from 'src/app/common/dto/response/paged.response';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.post with correct URL and payload', () => {
    const mockCategory: CreateBrandRequest = {
      name: 'Test',
      description: 'Test description',
    };

    service.createBrand(mockCategory).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/brand');
    expect(req.request.method).toBe('POST');
    expect(req.request.url).toBe('http://localhost:8080/brand');
    expect(req.request.body).toBe(mockCategory);
  });

  test('should return ContentPage with correct URL and Payload', () => {
    
    const mockContent: Content[] = [{
    id:          1,
    name:        'Brand1',
    description: 'Description brand1'
    }];
    
    const mockBrand: ContentPage = {
      totalPage:     0,
      totalElements: 1,
      pageNumber:    0,
      pageSize:      3,
      first:         true,
      last:          true,
      content:       mockContent
    };


    service.getAllBrands(0,3,true,'name').subscribe((response) => {
      expect(response).toEqual(mockBrand)
    });
    const req = httpMock.expectOne(`http://localhost:8080/brand?page=0&size=3&isAsc=true&sortBy=name`);
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('http://localhost:8080/brand?page=0&size=3&isAsc=true&sortBy=name');
    req.flush(mockBrand);
  });

});
