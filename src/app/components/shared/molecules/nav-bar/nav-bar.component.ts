import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  sidebarOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toogleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
