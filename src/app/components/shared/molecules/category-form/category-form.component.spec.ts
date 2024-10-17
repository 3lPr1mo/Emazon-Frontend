import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormComponent } from './category-form.component';
import {CategoryService} from "../../../../category/service/category.service";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimaryInputComponent} from "../../atoms/primary-input/primary-input.component";
import {TextAreaComponent} from "../../atoms/text-area/text-area.component";
import {AtomsModule} from "../../atoms/atoms.module";
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { exec } from 'child_process';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let serviceSpy: CategoryService;
  let categoryServiceMock: jest.Mocked<CategoryService>

  beforeEach(async () => {

    categoryServiceMock = {
      createCategory: jest.fn()
    } as any as jest.Mocked<CategoryService>

    await TestBed.configureTestingModule({
      declarations: [ CategoryFormComponent, PrimaryInputComponent, TextAreaComponent ],
      imports: [ ReactiveFormsModule, AtomsModule ],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  test('should create', () => {
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

    categoryServiceMock.createCategory.mockReturnValue(of());

    component.form.get('name')?.setValue('Nombre aspero');
    component.form.get('description')?.setValue('Descripción aspera');

    component.onSubmit();
    expect(serviceSpy.createCategory).toHaveBeenCalled();
  });

  test('should not submit if form is invalid', () => {
    const createCategory = jest.spyOn(component, 'createCategory');
    component.form.get('name')?.setValue('');
    component.form.get('description')?.setValue('');
    component.onSubmit();
    expect(createCategory).not.toHaveBeenCalled();
  });

  test('should emit categoryCreated when category is successfully created', () => {
    categoryServiceMock.createCategory.mockReturnValue(of({}));
    jest.spyOn(component.categoryCreated, 'emit');
    component.form.setValue({name: 'Category1', description: 'Description category1'});
    component.createCategory();
    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith({name: 'Category1', description: 'Description category1'});
    expect(component.categoryCreated.emit).toHaveBeenCalled();
  });

  test('should emit categoryNotCreated with error message on 0 error', () => {
    const errorResponse = new HttpErrorResponse({ status: 0, statusText: 'Forbidden' });
    categoryServiceMock.createCategory.mockReturnValue(throwError(errorResponse)); // Simular un error 403

    jest.spyOn(component.categoryNotCreated, 'emit'); // Espiar el evento categoryNotCreated

    component.form.setValue({ name: 'Category1', description: 'Description of Category1' }); // Establecer un valor válido
    component.createCategory();

    expect(component.categoryNotCreated.emit).toHaveBeenCalledWith('Conexión fallida con el servidor'); // Verificar el mensaje de error emitido
  });

  test('should emit categoryNotCreated with error message on 403 error', () => {
    const errorResponse = new HttpErrorResponse({ status: 403, statusText: 'Forbidden' });
    categoryServiceMock.createCategory.mockReturnValue(throwError(errorResponse)); // Simular un error 403

    jest.spyOn(component.categoryNotCreated, 'emit'); // Espiar el evento categoryNotCreated

    component.form.setValue({ name: 'Category1', description: 'Description of Category1' }); // Establecer un valor válido
    component.createCategory();

    expect(component.categoryNotCreated.emit).toHaveBeenCalledWith('Error no de autentificación'); // Verificar el mensaje de error emitido
  });

  test('should emit categoryNotCreated with error message are none of 0 and 403', () => {
    const errorResponse = new HttpErrorResponse({});
    categoryServiceMock.createCategory.mockReturnValue(throwError(() => errorResponse));
    jest.spyOn(component.categoryNotCreated, 'emit');
    
    component.form.setValue({ name: 'Category1', description: 'Description of Category1' });
    component.createCategory();
    
    expect(component.categoryNotCreated.emit).toHaveBeenCalled();
  });

  test('shoudl change value on onValueChange', () => {
    component.form.setValue({ name: 'Category1', description: 'Description of Category1' })
    component.onValueChange('name', 'a');
    expect(component.form.get('name')?.value).toBe('a')
  });

});
