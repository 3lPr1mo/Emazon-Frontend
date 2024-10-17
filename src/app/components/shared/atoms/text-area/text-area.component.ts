import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
  public onTouched = () => {}
  public control: FormControl = new FormControl();
  @Input() text: string = '';
  @Input() maxLength!: number;
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = false;
  @Input() controlName!: string;
  @Output() onValueChange = new EventEmitter<string>();

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.control = this.rootFormGroup.control.get(this.controlName) as FormControl;
    const validator = this.control.validator ? [this.control.validator] : [];
    validator.push(Validators.maxLength(this.maxLength))
    this.control.setValidators(validator);
    this.control.updateValueAndValidity();
  }

  getErrorMessage(): string {
    const errors = this.control.errors;
    if(errors?.['required']) {
      return 'Este campo es requerido';
    }
    if(errors?.['maxlength']) {
      return `Debe tener máximo ${errors?.['maxlength'].requiredLength} caracteres`;
    }
    return '';
  }

}
