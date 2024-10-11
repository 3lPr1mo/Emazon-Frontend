import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {

  @Input() label: string = '';
  @Input() isSuccessful = true;
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.closeEvent.emit();
  }

}
