import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveTableComponent } from './reactive-table.component';
import { CategoryService } from '../../../../category/service/category.service';
import { ContentPage } from 'src/app/category/dtos/response/categories.response';
import { Observable, of } from 'rxjs';
import { CategoryModule } from '../../../../category/category.module';

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
});
