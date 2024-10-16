import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateBrandRequest } from '../dtos/CreateBrand.request';

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


});
