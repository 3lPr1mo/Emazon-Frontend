import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMessageComponent } from './modal-message.component';

describe('ModalMessageComponent', () => {
  let component: ModalMessageComponent;
  let fixture: ComponentFixture<ModalMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should close modal', () => {
    jest.spyOn(component.closeEvent, 'emit');
    component.closeModal();
    expect(component.closeEvent.emit).toHaveBeenCalled();
  });
});
