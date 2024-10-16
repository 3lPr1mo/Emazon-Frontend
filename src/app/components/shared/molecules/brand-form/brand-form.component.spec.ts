import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandFormComponent } from './brand-form.component';
import { BrandService } from '../../../../brand/service/brand.service';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('BrandFormComponent', () => {
  let component: BrandFormComponent;
  let fixture: ComponentFixture<BrandFormComponent>;
  let serviceSpy: BrandService;
  let brandServiceMock: jest.Mocked<BrandService>;

  brandServiceMock = {
    createBrand: jest.fn(),  // Retorna un observable vacío
  } as any as jest.Mocked<BrandService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandFormComponent ],
      providers: [
        FormBuilder,
        { provide: BrandService, useValue: brandServiceMock } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandFormComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(BrandService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should init the form with two controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('description')).toBeTruthy();
  });

  test('should require the name and description', () => {
    const nameControl = component.form.get('name');
    const descriptionControl = component.form.get('description');

    nameControl?.setValue('');
    descriptionControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
    expect(descriptionControl?.valid).toBeFalsy();
  });

  test('should valid form', () => {
    const nameControl = component.form.get('name');
    const descriptionControl = component.form.get('description');

    nameControl?.setValue('aa');
    descriptionControl?.setValue('aa');
    expect(nameControl?.valid).toBeTruthy();
    expect(descriptionControl?.valid).toBeTruthy();
  });

  test('should call create category service if form is valid', () => {

    brandServiceMock.createBrand.mockReturnValue(of());

    component.form.get('name')?.setValue('Nombre aspero');
    component.form.get('description')?.setValue('Descripción aspera');

    component.onSubmit();
    expect(serviceSpy.createBrand).toHaveBeenCalled();
  });

  test('should not submit if form is invalid', () => {
    const createBrand = jest.spyOn(component, 'createBrand');
    component.form.get('name')?.setValue('');
    component.form.get('description')?.setValue('');
    component.onSubmit();
    expect(createBrand).not.toHaveBeenCalled();
  });

  test('should emit brandCreated when category is successfully created', () => {
    brandServiceMock.createBrand.mockReturnValue(of({}));
    jest.spyOn(component.brandCreated, 'emit');
    component.form.setValue({ name: 'Brand1', description: 'Description of Brand1' });
    component.createBrand();
    expect(brandServiceMock.createBrand).toHaveBeenCalledWith({ name: 'Brand1', description: 'Description of Brand1' });
    expect(component.brandCreated.emit).toHaveBeenCalled();
  });

  test('should emit brandNotCreated with error message on 0 error', () => {
    const errorResponse = new HttpErrorResponse({ status: 0, statusText: 'Forbidden' });
    brandServiceMock.createBrand.mockReturnValue(throwError(errorResponse)); // Simular un error 403

    jest.spyOn(component.brandNotCreated, 'emit'); // Espiar el evento categoryNotCreated

    component.form.setValue({ name: 'Brand1', description: 'Description of Brand1' }); // Establecer un valor válido
    component.createBrand();

    expect(component.brandNotCreated.emit).toHaveBeenCalledWith('Conexión fallida con el servidor'); // Verificar el mensaje de error emitido
  });

  test('should emit brandNotCreated with error message on 403 error', () => {
    const errorResponse = new HttpErrorResponse({ status: 403, statusText: 'Forbidden' });
    brandServiceMock.createBrand.mockReturnValue(throwError(errorResponse)); // Simular un error 403

    jest.spyOn(component.brandNotCreated, 'emit'); // Espiar el evento categoryNotCreated

    component.form.setValue({ name: 'Brand1', description: 'Description of Brand1' }); // Establecer un valor válido
    component.createBrand();

    expect(component.brandNotCreated.emit).toHaveBeenCalledWith('Error de autentificación'); // Verificar el mensaje de error emitido
  });

  test('should reset form', () => {
    component.form.setValue({ name: 'Brand1', description: 'Description of Brand1' });
    component.resetForm();
    expect(component.form.value).toStrictEqual({ name: null, description: null })
  });

  test('should disable button', () => {
    component.disable = true;
    component.disableButton(false);
    expect(component.disable).toBeFalsy();
  });

  test('should on value change modify the control value', () => {
    component.onValueChange('name', 'hola');
    expect(component.form.get('name')?.value).toBe('hola');
  });

});
