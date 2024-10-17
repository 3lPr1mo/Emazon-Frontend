import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should toggle side bar', () => {
    component.toogleSidebar();
    expect(component.sidebarOpen).toBeTruthy();
    component.toogleSidebar();
    expect(component.sidebarOpen).toBeFalsy();
  });

  test('should navigate to the correct path', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const path = 'brands';
    component.goToNav(path);
    expect(navigateSpy).toHaveBeenCalledWith([`/dashboard/${path}`]);
  });

});
