import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaComponent } from './text-area.component';
import { NG_VALUE_ACCESSOR, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { forwardRef } from '@angular/core';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreaComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { 
          provide: FormGroupDirective, 
          useValue: {
            control: new FormGroup({
              testControl: new FormControl(null)
            })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    component.controlName = 'testControl';
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should init form control with max length validation', () => {
    component.maxLength=10;
    component.ngOnInit();
    expect(component.control.errors).toBeNull();
    component.control.setValue('This text is to long');
    component.control.updateValueAndValidity();
    expect(component.control.errors?.['maxlength']).toBeTruthy();
  });

  /*test('should return required message', () => {
    component.maxLength=10
    component.ngOnInit();
    expect(component.control.errors).toBeNull();
    component.control.setErrors({required: true});
    component.control.updateValueAndValidity();
    expect(component.getErrorMessage()).toBe('Este campo es requerido');
  });*/

  test('should return required error message', () => {
    component.control.setErrors({required: true});
    expect(component.getErrorMessage()).toBe('Este campo es requerido');
  });

  test('should return minlenght error message', () => {
    component.control.setErrors({minlength: {requiredLength: 5, actualLength: 3}});
    expect(component.getErrorMessage()).toBe('Debe tener al menos 5 caracteres');
  });

  test('should return error message for maxLength', () => {
    component.control.setValidators([Validators.maxLength(5)]);
    component.control.setValue('Longer than five');
    component.control.updateValueAndValidity();
    
    const errorMessage = component.getErrorMessage();
    expect(errorMessage).toBe('Debe tener máximo 5 caracteres');
  })

  test('should return null string when are not errors', () => {
    component.control.setValue('si');
    expect(component.getErrorMessage()).toBe('');
  });

});
