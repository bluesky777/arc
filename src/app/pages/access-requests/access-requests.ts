import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
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
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './access-requests.html',
  styleUrl: './access-requests.scss'
})
export class AccessRequests implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);

  requests = signal<AccessRequest[]>([]);
  resourceOptions = signal<string[]>([]);
  userEmail = signal('');
  submitDisabled = signal(false);

  form = new FormGroup({
    userEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
    resource: new FormControl('', [Validators.required]),
    type: new FormControl('READ', [Validators.required])
  });

  displayedColumns = ['user', 'resource', 'type', 'date', 'status', 'actions'];

  ngOnInit() {
    this.loadUserData();
    this.loadAccessRequests();
    this.loadResourceOptions();
  }

  private loadUserData() {
    const authData = this.authService.getAuthData();
    if (authData?.email) {
      this.userEmail.set(authData.email);
      this.form.patchValue({ userEmail: authData.email });
    }
  }

  private loadAccessRequests() {
    const apiUrl = `${API_BASE_URL}/requests`;
    this.http.get<AccessRequest[]>(apiUrl, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: (data) => this.requests.set(data),
      error: (err) => console.error('Error loading access requests:', err)
    });
  }

  private loadResourceOptions() {
    const apiUrl = `${API_BASE_URL}/resources`;
    this.http.get<string[]>(apiUrl, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: (data) => this.resourceOptions.set(data.slice(0, 3)),
      error: () => {
        this.resourceOptions.set(['S3-Bucket-Finance', 'Database-Production', 'Analytics-Dashboard']);
      }
    });
  }

  createRequest() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitDisabled.set(true);
    const payload = {
      resource: this.form.get('resource')?.value,
      type: this.form.get('type')?.value,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };

    const apiUrl = `${API_BASE_URL}/requests`;
    this.http.post(apiUrl, payload, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: () => {
        this.loadAccessRequests();
        this.resetForm();
        this.submitDisabled.set(false);
      },
      error: (err) => {
        console.error('Error creating access request:', err);
        this.submitDisabled.set(false);
      }
    });
  }

  cancel() {
    this.resetForm();
  }

  private resetForm() {
    this.form.reset({ userEmail: this.userEmail(), resource: '', type: 'READ' });
  }

  approveRequest(id: number) {
    const apiUrl = `${API_BASE_URL}/requests/${id}/approve`;
    this.http.post(apiUrl, {}, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: () => this.loadAccessRequests(),
      error: (err) => console.error('Error approving request:', err)
    });
  }

  rejectRequest(id: number) {
    const apiUrl = `${API_BASE_URL}/requests/${id}/reject`;
    this.http.post(apiUrl, {}, { headers: this.authService.getAuthHeaders() }).subscribe({
      next: () => this.loadAccessRequests(),
      error: (err) => console.error('Error rejecting request:', err)
    });
  }
}