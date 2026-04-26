import { Component, signal, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { API_BASE_URL } from '../../config/api.config';

interface AccessRequest {
  id: number;
  user: string;
  resource: string;
  type: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-access-requests',
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './access-requests.html',
  styleUrl: './access-requests.scss'
})
export class AccessRequests implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);

  requests = signal<AccessRequest[]>([]);

  displayedColumns = ['user', 'resource', 'type', 'date', 'status', 'actions'];

  ngOnInit() {
    this.loadAccessRequests();
  }

  private loadAccessRequests() {
    const apiUrl = `${API_BASE_URL}/requests`;
    this.http.get<AccessRequest[]>(apiUrl, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: (data) => this.requests.set(data),
      error: (err) => console.error('Error loading access requests:', err)
    });
  }

  approveRequest(id: number) {
    const apiUrl = `${API_BASE_URL}/requests/${id}/approve`;
    this.http.post(apiUrl, {}, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: () => this.loadAccessRequests(), // Reload data after action
      error: (err) => console.error('Error approving request:', err)
    });
  }

  rejectRequest(id: number) {
    const apiUrl = `${API_BASE_URL}/requests/${id}/reject`;
    this.http.post(apiUrl, {}, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: () => this.loadAccessRequests(), // Reload data after action
      error: (err) => console.error('Error rejecting request:', err)
    });
  }
}