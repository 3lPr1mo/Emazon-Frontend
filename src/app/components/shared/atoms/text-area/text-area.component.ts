import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements OnInit {

  private onChange = (value: string) => {};
  public control: FormControl = new FormControl();
  @Input() text: string = '';
  @Input() maxLength: number = 0;
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = false;
  @Output() onValueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage(): string {
    const errors = this.control.errors;
    if(errors?.['required']) {
      return 'Este campo es requerido';
    }
    if(errors?.['minlength']) {
      return `Debe tener al menos ${errors?.['minlength'].requiredLength} caracteres`;
    }
    if(errors?.['maxlength']) {
      return `Debe tener máximo ${errors?.['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }

  get value(): string {
    return this.control.value;
  }

  set value(value: string) {
    this.control.setValue(value);
    this.onValueChange.emit(value);
  }

  onInput(event: any): void {
    this.onChange(event.target.value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

}
