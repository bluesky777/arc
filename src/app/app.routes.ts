import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      { path: '', redirectTo: 'access-requests', pathMatch: 'full' },
      { 
        path: 'access-requests', 
        loadComponent: () => import('./pages/access-requests/access-requests').then(m => m.AccessRequests)
      },
      { 
        path: 'access-approval', 
        loadComponent: () => import('./pages/access-approval/access-approval').then(m => m.AccessApproval)
      },
      { 
        path: 'history', 
        loadComponent: () => import('./pages/history/history').then(m => m.History)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];