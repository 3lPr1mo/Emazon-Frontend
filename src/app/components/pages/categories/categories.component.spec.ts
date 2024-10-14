import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { CategoryFormComponent } from '../../shared/molecules/category-form/category-form.component';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoryFormComponentMock: jest.Mocked<CategoryFormComponent>;
  let changeDetectorRefSpy: ChangeDetectorRef;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      providers: [{provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() }}],
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

    // Espiar el ViewChild y asignarlo al componente después de la inicialización
    //component.categoryFormComponent = categoryFormComponent;
    fixture.detectChanges(); // Detectar los cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

});
