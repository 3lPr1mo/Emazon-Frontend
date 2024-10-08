import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string = '';
  @Output() closeEvn: EventEmitter<void> = new EventEmitter<void>();

  constructor(public elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  close() {
    this.elementRef.nativeElement.remove();
    this.closeEvn.emit();
  }

}
