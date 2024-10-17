import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  sidebarOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toogleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  goToNav(path: string) {
    this.router.navigate([`/dashboard/${path}`]);
  }
}
