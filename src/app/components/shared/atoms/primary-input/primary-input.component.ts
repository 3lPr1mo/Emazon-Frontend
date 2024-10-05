import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-primary-input',
  templateUrl: './primary-input.component.html',
  styleUrls: ['./primary-input.component.scss']
})
export class PrimaryInputComponent implements OnInit {

  @Input() text: string = 'aaaaaaa';
  @Input() type: 'text' | 'password' = 'password';
  @Input() size: '' | 'small' = '';
  showPassword: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
