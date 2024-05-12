import { Component, Input, OnInit } from '@angular/core';
import { NavConfig } from "./constants/nav-configuration";
import { SidebarNavMenu } from './models/sidebar-menu-nav-type';

@Component({
  selector: 'app-sidebar-menu-nav',
  templateUrl: './sidebar-menu-nav.component.html',
  styleUrls: ['./sidebar-menu-nav.component.scss']
})
export class SidebarMenuNavComponent implements OnInit {

  @Input() navigationItems: SidebarNavMenu[] = [];
  constructor() {
  }

  ngOnInit(): void {
  }

}
