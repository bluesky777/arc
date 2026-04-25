import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './access-requests.html',
  styleUrl: './access-requests.scss'
})
export class AccessRequests {
  requests = signal<AccessRequest[]>([
    { id: 1, user: 'john.doe@email.com', resource: 'Database Prod', type: 'Read', date: '2024-01-15', status: 'Pending' },
    { id: 2, user: 'jane.smith@email.com', resource: 'API Gateway', type: 'Write', date: '2024-01-14', status: 'Pending' },
    { id: 3, user: 'bob.wilson@email.com', resource: 'Cloud Storage', type: 'Read', date: '2024-01-13', status: 'Approved' },
    { id: 4, user: 'alice.brown@email.com', resource: 'Analytics', type: 'Admin', date: '2024-01-12', status: 'Rejected' }
  ]);

  displayedColumns = ['user', 'resource', 'type', 'date', 'status', 'actions'];
}