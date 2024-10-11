import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormComponent } from './category-form.component';
import {CategoryService} from "../../../../category/service/category.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {PrimaryInputComponent} from "../../atoms/primary-input/primary-input.component";
import {TextAreaComponent} from "../../atoms/text-area/text-area.component";
import {AtomsModule} from "../../atoms/atoms.module";
import {MoleculesModule} from "../molecules.module";

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  let serviceSpy: jasmine.SpyObj<CategoryService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj<CategoryService>('CategoryService', ['createCategory'])

    await TestBed.configureTestingModule({
      declarations: [ CategoryFormComponent, PrimaryInputComponent, TextAreaComponent ],
      imports: [ ReactiveFormsModule, AtomsModule ],
      providers: [
        { provide: CategoryService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form with two controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('description')).toBeTruthy();
  });

  it('should require the name and description', () => {
    const nameControl = component.form.get('name');
    const descriptionControl = component.form.get('description');

    nameControl?.setValue('');
    descriptionControl?.setValue('');
    expect(nameControl?.valid).toBeFalse();
    expect(descriptionControl?.valid).toBeFalse();
  });

  it('should valid form', () => {
    const nameControl = component.form.get('name');
    const descriptionControl = component.form.get('description');

    nameControl?.setValue('aa');
    descriptionControl?.setValue('aa');
    expect(nameControl?.valid).toBeTrue();
    expect(descriptionControl?.valid).toBeTrue();
  });

  it('should call create category service if form is valid', () => {
    spyOn(component, 'createCategory');

    component.form.get('name')?.setValue('Nombre aspero');
    component.form.get('description')?.setValue('Descripción aspera');

    component.onSubmit();
    expect(component.createCategory).toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component, 'createCategory');
    component.form.get('name')?.setValue('');
    component.form.get('description')?.setValue('');
    component.onSubmit();
    expect(component.createCategory).not.toHaveBeenCalled();
  });

});
