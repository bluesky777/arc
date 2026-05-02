import { Injectable, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpHeaders } from '@angular/common/http';

export interface AuthUserData {
  sub: string;
  email: string;
  email_verified: boolean;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  at_hash: string;
  c_hash: string;
  auth_time: number;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly oidcSecurityService = inject(OidcSecurityService);

  loadAuthData(): void {
    this.oidcSecurityService.userData$.subscribe((userData) => {
      if (userData?.userData) {
        sessionStorage.setItem('auth_user_data', JSON.stringify(userData.userData));
      }
    });
  }

  getAuthData(): AuthUserData | null {
    const data = sessionStorage.getItem('auth_user_data');
    return data ? JSON.parse(data) : null;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getToken(): string {
    let token = '';
    this.oidcSecurityService.getIdToken().subscribe(t => token = t);
    return token;
  }

  clearAuthData(): void {
    sessionStorage.removeItem('auth_user_data');
  }
}