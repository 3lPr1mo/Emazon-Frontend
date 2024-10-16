import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveTableComponent } from './reactive-table.component';
import { CategoryService } from '../../../../category/service/category.service';
import { ContentPage } from 'src/app/common/dto/response/paged.response'; 
import { Observable, of, throwError } from 'rxjs';
import { CategoryModule } from '../../../../category/category.module';
import { HttpErrorResponse } from '@angular/common/http';

describe('ReactiveTableComponent', () => {
  let component: ReactiveTableComponent;
  let fixture: ComponentFixture<ReactiveTableComponent>;
  let service: CategoryService;

  beforeEach(async () => {
    
    const mockResponse: ContentPage = {
      totalPage: 1,
      first: true,
      last: true,
      pageNumber: 0,
      pageSize: 10,
      totalElements: 1,
      content: [{id: 1, name: 'Category 1', description: 'Description 1'}],
    };
    const categoryServiceMock = {
      getAllCategories: jest.fn().mockReturnValue(of(mockResponse))
    };

    await TestBed.configureTestingModule({
      declarations: [ ReactiveTableComponent ],
      imports: [CategoryModule],
      providers: [
        {provide: CategoryService, useValue: categoryServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveTableComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CategoryService);

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
  
  test('should fetch categories on initialization', () => {
    const fetchSpy = jest.spyOn(component, 'fetchAllCategories');
    component.ngOnInit();
    expect(fetchSpy).toHaveBeenCalled();
  });

  test('should go to the specified page', () => {
    const fetchSpy = jest.spyOn(component, 'fetchAllCategories');
  
    component.goToPage(2);
    
    expect(component.page).toBe(2);
    expect(fetchSpy).toHaveBeenCalled();
  });

  test('should change order when setOrder is called', () => {
    const fetchSpy = jest.spyOn(component, 'fetchAllCategories');
    
    component.setOrder(false);
    
    expect(component.isAsc).toBe(false);
    expect(fetchSpy).toHaveBeenCalled();
  });

  test('should change page size and reset page when setSize is called', () => {
    const fetchSpy = jest.spyOn(component, 'fetchAllCategories');
    
    component.setSize(5);
    
    expect(component.size).toBe(5);
    expect(component.page).toBe(0);
    expect(fetchSpy).toHaveBeenCalled();
  });

  test('should handle server connection error', () => {
    // Espiamos el EventEmitter para capturar los errores emitidos
    const errorMessageSpy = jest.spyOn(component.errorMessage, 'emit');
  
    // Simulamos un error de conexión con el servidor (status 0)
    const httpErrorResponse = new HttpErrorResponse({ status: 0 });
    jest.spyOn(service, 'getAllCategories').mockReturnValue(throwError(() => httpErrorResponse));
  
    // Llamamos a fetchAllCategories para ejecutar el flujo con error
    component.fetchAllCategories();
  
    // Verificamos que se haya emitido el mensaje de error adecuado
    expect(errorMessageSpy).toHaveBeenCalledWith('Conexión fallida con el servidor');
  });

});
