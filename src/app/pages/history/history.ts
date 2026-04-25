import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface HistoryItem {
  id: number;
  user: string;
  resource: string;
  type: string;
  date: string;
  action: string;
}

@Component({
  selector: 'app-history',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History {
  history = signal<HistoryItem[]>([
    { id: 1, user: 'john.doe@email.com', resource: 'Database Prod', type: 'Read', date: '2024-01-10', action: 'Approved' },
    { id: 2, user: 'jane.smith@email.com', resource: 'API Gateway', type: 'Write', date: '2024-01-09', action: 'Approved' },
    { id: 3, user: 'bob.wilson@email.com', resource: 'Cloud Storage', type: 'Read', date: '2024-01-08', action: 'Rejected' },
    { id: 4, user: 'alice.brown@email.com', resource: 'Analytics', type: 'Admin', date: '2024-01-07', action: 'Approved' },
    { id: 5, user: 'charlie.davis@email.com', resource: 'Database Dev', type: 'Write', date: '2024-01-06', action: 'Approved' }
  ]);

  stats = signal({
    total: 156,
    approved: 132,
    rejected: 24,
    pending: 3
  });
}