import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { CategoryFormComponent } from '../../shared/molecules/category-form/category-form.component';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryService } from '../../../category/service/category.service';
import { ContentPage } from 'src/app/common/dto/response/paged.response';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryFormComponentMock: jest.Mocked<CategoryFormComponent>;
  let changeDetectorRefSpy: ChangeDetectorRef;
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
      declarations: [ CategoriesComponent ],
      providers: [
        {provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() }},
        {provide: CategoryService, useValue: categoryServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    changeDetectorRefSpy = TestBed.inject(ChangeDetectorRef);

    // Crear un mock de CategoryFormComponent
    categoryFormComponentMock = {
      resetForm: jest.fn(), // Mock del método resetForm
    } as unknown as jest.Mocked<CategoryFormComponent>;


    service = TestBed.inject(CategoryService);
    fixture.detectChanges(); // Detectar los cambios iniciales
  });

  it('should create', () => {
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
  
    // Simulamos un error de conexión con el servidor (status 0)
    const httpErrorResponse = new HttpErrorResponse({ status: 0 });
    jest.spyOn(service, 'getAllCategories').mockReturnValue(throwError(() => httpErrorResponse));
  
    // Llamamos a fetchAllCategories para ejecutar el flujo con error
    component.fetchAllCategories();
  
    // Verificamos que se haya emitido el mensaje de error adecuado
    expect(component.errorMessage).toBe('Conexión fallida con el servidor');
  });

  test('should handle auth conection error', () => {
    const httpErrorResponse = new HttpErrorResponse({ status: 403 });
    jest.spyOn(service, 'getAllCategories').mockReturnValue(throwError(() => httpErrorResponse));
    component.fetchAllCategories();
    expect(component.errorMessage).toBe('Error de autentificación');
  });

  test('shoudl handle error message', () => {
    jest.spyOn(service, 'getAllCategories').mockReturnValue(throwError(() => new HttpErrorResponse({status: 401})));
    component.fetchAllCategories();
    expect(component.errorMessage).toBeTruthy();
  });

  it('should open the modal and trigger change detection', () => {
    component.openModal();

    expect(component.modalIsVisible).toBe(true);
    expect(changeDetectorRefSpy.detectChanges).toHaveBeenCalledTimes(0);
  });

  it('should close the modal and reset the form', () => {

    component.categoryFormComponent = categoryFormComponentMock;

    component.modalIsVisible = true; // Forzar el modal abierto
    component.closeModal();

    expect(component.modalIsVisible).toBe(false);
    expect(component.categoryFormComponent.resetForm).toHaveBeenCalled();
  });

  it('should open success and close the modal', () => {

    component.categoryFormComponent = categoryFormComponentMock;

    jest.spyOn(component, 'closeModal');
    component.openSuccess();

    expect(component.successIsVisible).toBe(true);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should close the success message', () => {
    component.successIsVisible = true; // Forzar el éxito abierto
    component.closeSuccess();

    expect(component.successIsVisible).toBe(false);
  });

  it('should open error with a given message', () => {
    const errorMessage = 'Some error occurred';
    component.openError(errorMessage);

    expect(component.errorMessage).toBe(errorMessage);
    expect(component.errorIsVisible).toBe(true);
  });

  it('should close the error message and the modal', () => {
    component.errorIsVisible = true;
    component.modalIsVisible = true;
    component.closeError();

    expect(component.errorIsVisible).toBe(false);
    expect(component.modalIsVisible).toBe(false);
  });

  test('should change isAsc on fuction onOrderChange', () => {
    jest.spyOn(component, 'fetchAllCategories');
    component.onOrderChange(false);
    expect(component.isAsc).toBeFalsy();
    expect(component.fetchAllCategories).toHaveBeenCalledTimes(1);
  });

  test('should change size and page when onSizeChange is invoke', () => {
    jest.spyOn(component, 'fetchAllCategories');
    component.onSizeChange(3);
    expect(component.size).toBe(3);
    expect(component.fetchAllCategories).toHaveBeenCalled();
  })

  test('should change page and currentPage when onPageSelected is invoke', () => {
    jest.spyOn(component, 'fetchAllCategories');
    component.onPageSelected(1);
    expect(component.page).toBe(1);
    expect(component.currentPage).toBe(1);
    expect(component.fetchAllCategories).toHaveBeenCalled();
  });

});
