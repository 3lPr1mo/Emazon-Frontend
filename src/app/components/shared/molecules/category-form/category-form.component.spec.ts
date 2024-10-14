import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormComponent } from './category-form.component';
import {CategoryService} from "../../../../category/service/category.service";
import {ReactiveFormsModule} from "@angular/forms";
import {PrimaryInputComponent} from "../../atoms/primary-input/primary-input.component";
import {TextAreaComponent} from "../../atoms/text-area/text-area.component";
import {AtomsModule} from "../../atoms/atoms.module";
import { of } from 'rxjs';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let serviceSpy: CategoryService;
  let categoryServiceMock!: {createCategory: jest.Mock}

  beforeEach(async () => {

    //const spy = jasmine.createSpyObj<CategoryService>('CategoryService', ['createCategory'])

    categoryServiceMock = {
      createCategory: jest.fn()
    }

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

});
