import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryInputComponent } from './primary-input.component';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';

describe('PrimaryInputComponent', () => {
  let component: PrimaryInputComponent;
  let fixture: ComponentFixture<PrimaryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryInputComponent ],
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

    fixture = TestBed.createComponent(PrimaryInputComponent);
    component = fixture.componentInstance;
    component.controlName = 'testControl';
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should initialize form control with maxLength validation', () => {
    component.maxLength = 10;
    component.ngOnInit();
    expect(component.control.errors).toBeNull(); // No errors initially

    // Set value longer than maxLength
    component.control.setValue('This text is too long');
    component.control.updateValueAndValidity();
    expect(component.control.errors?.['maxlength']).toBeTruthy();
  });

  test('should return error message for required field', () => {
    component.control.setValidators([Validators.required]);
    component.control.setValue(null);
    component.control.updateValueAndValidity();

    const errorMessage = component.getErrorMessage();
    expect(errorMessage).toBe('Este campo es requerido');
  });

  test('should return error message for maxLength', () => {
    component.control.setValidators([Validators.maxLength(5)]);
    component.control.setValue('Longer than five');
    component.control.updateValueAndValidity();

    const errorMessage = component.getErrorMessage();
    expect(errorMessage).toBe('Debe tener máximo 5 caracteres');
  });

  test('should set and get value correctly', () => {
    const testValue = 'Sample text';
    component.value = testValue;

    expect(component.value).toBe(testValue);
    expect(component.control.value).toBe(testValue);
  });

});
