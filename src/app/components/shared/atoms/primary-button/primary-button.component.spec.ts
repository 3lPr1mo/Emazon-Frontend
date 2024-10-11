import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryButtonComponent } from './primary-button.component';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

describe('PrimaryButtonComponent', () => {
  let component: PrimaryButtonComponent;
  let fixture: ComponentFixture<PrimaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should display the correct text', () => {
    component.text = 'Add to cart';
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(buttonElement.textContent).toEqual('Add to cart');
  });

  it('should display the icon', () => {
    component.showIcon = true;
    fixture.detectChanges();
    expect(component.showIcon).toEqual(true);
  })

  it('should not display the icon', () => {
    component.showIcon = false;
    fixture.detectChanges();
    const element: DebugElement = fixture.debugElement.query(By.css('i'));
    expect(element).toBeFalsy();
  });

  it('should apply the correct class for small size', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(element.className).toContain('small-button');
  });

  it('should apply the correct class for medium size', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(element.className).toContain('medium-button');
  });

  it('should apply the correct class for large size', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(element.className).toContain('large-button');
  });*/

});
