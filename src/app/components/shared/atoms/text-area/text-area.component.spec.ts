import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaComponent } from './text-area.component';
import { NG_VALUE_ACCESSOR, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
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

  test('should emit value on input change', () => {
    const emitSpy = jest.spyOn(component.onValueChange, 'emit');
    const setValueSpy = jest.spyOn(component.control, 'setValue');
    
    const newValue = 'New value'
    component.value = newValue;

    expect(setValueSpy).toHaveBeenCalledWith(newValue, {emitEvent: false});
    expect(emitSpy).toHaveBeenCalledWith(newValue);
    expect(component['_value']).toBe(newValue);
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

  test('should call onChange when onInput is triggered', () => {
    const value = 'test value';
    const onChangeSpy = jest.spyOn(component, 'onChange');
    component.onInput({target: {value}});
    expect(onChangeSpy).toHaveBeenCalledWith(value);
  });

  test('should set the value when writeValue is called', () => {
    const value = 'new value';
    component.writeValue(value);
    expect(component.value).toBe(value);
  });

});
