import { TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token.interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('TokenInterceptorService', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let service: TokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenInterceptorService,
        { 
          provide: HTTP_INTERCEPTORS, 
          useClass: TokenInterceptorService, 
          multi: true 
        }
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(TokenInterceptorService);
  });

  afterEach(() => {
    httpMock.verify();
  })

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should add Authorization header if token exist', () => {
    const testUrl = '/test';
    const expectedToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQURPUiIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyOTAzMDMzNCwiZXhwIjoxNzI5MjkzMjgwfQ.Ypfd81-2ItSa_MZ8dWI4rb224p0_LxZ4ehvcSAr2Cs4';

    httpClient.get(testUrl).subscribe();

    const httpRequest = httpMock.expectOne(testUrl);
    
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe(expectedToken);

    httpRequest.flush({});

  });

});
