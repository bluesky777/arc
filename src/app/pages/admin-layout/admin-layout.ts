import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  menuItems = [
    { path: '/admin/access-requests', icon: 'request_page', label: 'Access Requests' },
    { path: '/admin/access-approval', icon: 'approval', label: 'Access Approval' },
    { path: '/admin/history', icon: 'history', label: 'History' }
  ];

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }
}