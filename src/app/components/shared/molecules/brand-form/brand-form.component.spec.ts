import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandFormComponent } from './brand-form.component';
import { BrandService } from '../../../../brand/service/brand.service';
import { FormBuilder } from '@angular/forms';

describe('BrandFormComponent', () => {
  let component: BrandFormComponent;
  let fixture: ComponentFixture<BrandFormComponent>;
  let mockBrandService: any;

  mockBrandService = {
    createBrand: jest.fn(),  // Retorna un observable vacío
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandFormComponent ],
      providers: [
        FormBuilder,
        { provide: BrandService, useValue: mockBrandService } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
