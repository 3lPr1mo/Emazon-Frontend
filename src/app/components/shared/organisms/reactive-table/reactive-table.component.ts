import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../../../category/service/category.service';
import { Content } from 'src/app/common/dto/response/paged.response';

@Component({
  selector: 'app-reactive-table',
  templateUrl: './reactive-table.component.html',
  styleUrls: ['./reactive-table.component.scss']
})
export class ReactiveTableComponent implements OnInit {
  @Input() data!: Content[];
  @Input() headers!: string[];
  @Input() pageSize!: number[];
  @Input() totalPages!: number;
  @Input() currentPage!: number;

  public orderAsc: boolean = true;
  public selectedSize: number = 3;

  @Output() isAsc: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() size = new EventEmitter<number>();
  @Output() pageSelected = new EventEmitter<number>();
  
  constructor(private service: CategoryService) { }

  ngOnInit(): void {
  }

  setOrder(event: Event){
    const selectedElement = event.target as HTMLSelectElement;
    const value = selectedElement.value === 'true';
    this.isAsc.emit(value);
  }

  setSize(event: Event){
    const selectedElement = event.target as HTMLSelectElement;
    const value = parseInt(selectedElement.value, 10);
    this.size.emit(value);
  }

  goToPage(page: number): void {
    this.pageSelected.emit(page);
  }

}
