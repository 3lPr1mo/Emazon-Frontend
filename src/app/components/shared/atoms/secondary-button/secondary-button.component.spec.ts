import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryButtonComponent } from './secondary-button.component';

describe('SecondaryButtonComponent', () => {
  let component: SecondaryButtonComponent;
  let fixture: ComponentFixture<SecondaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
