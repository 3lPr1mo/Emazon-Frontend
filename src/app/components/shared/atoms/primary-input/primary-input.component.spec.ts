import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryInputComponent } from './primary-input.component';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

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
});
