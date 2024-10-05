import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss']
})
export class SecondaryButtonComponent implements OnInit {

  @Input() text: string = 'Button';
  @Input() showIcon: boolean = true;
  @Input() size: string= '';

  constructor() { }

  ngOnInit(): void {
  }

}
