import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  @Output() successfulLogin = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

}
