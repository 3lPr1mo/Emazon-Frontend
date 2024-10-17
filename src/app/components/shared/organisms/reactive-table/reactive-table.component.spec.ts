import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveTableComponent } from './reactive-table.component';
import { CategoryService } from '../../../../category/service/category.service';
import { ContentPage } from 'src/app/common/dto/response/paged.response'; 
import { Observable, of, throwError } from 'rxjs';
import { CategoryModule } from '../../../../category/category.module';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('ReactiveTableComponent', () => {
  let component: ReactiveTableComponent;
  let fixture: ComponentFixture<ReactiveTableComponent>;
  let service: CategoryService;

  beforeEach(async () => {
    
    const mockResponse: ContentPage = {
      totalPage: 1,
      first: true,
      last: true,
      pageNumber: 0,
      pageSize: 10,
      totalElements: 1,
      content: [{id: 1, name: 'Category 1', description: 'Description 1'}],
    };
    const categoryServiceMock = {
      getAllCategories: jest.fn().mockReturnValue(of(mockResponse))
    };

    await TestBed.configureTestingModule({
      declarations: [ ReactiveTableComponent ],
      imports: [CategoryModule],
      providers: [
        {provide: CategoryService, useValue: categoryServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveTableComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CategoryService);

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should emit correct value for setOrder when event is triggered', () => {
    jest.spyOn(component.isAsc, 'emit');
    const selectedElement = fixture.debugElement.query(By.css('.section__controls__order__select')).nativeElement;
    selectedElement.value = selectedElement.options[0].value;
    selectedElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.isAsc.emit).toHaveBeenCalledWith(true);
    
    selectedElement.value = selectedElement.options[1].value;
    selectedElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.isAsc.emit).toHaveBeenCalledWith(false);
  });

  test('should emit correct size value for setSize when event is triggered', () => {
    jest.spyOn(component.size, 'emit');
    const select = fixture.debugElement.query(By.css('.section__controls__size__select')).nativeElement;
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.size.emit).toHaveBeenCalledWith(3);
  });

  test('should emit pageSelected when goToPage method is invoke', () => {
    jest.spyOn(component.pageSelected, 'emit');
    component.goToPage(1);
    expect(component.pageSelected.emit).toHaveBeenCalledWith(1);
  });

});
