import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface ApprovalItem {
  id: number;
  user: string;
  resource: string;
  type: string;
  requested: string;
  priority: string;
}

@Component({
  selector: 'app-access-approval',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './access-approval.html',
  styleUrl: './access-approval.scss'
})
export class AccessApproval {
  approvals = signal<ApprovalItem[]>([
    { id: 1, user: 'john.doe@email.com', resource: 'Database Prod', type: 'Read', requested: '2024-01-15', priority: 'High' },
    { id: 2, user: 'jane.smith@email.com', resource: 'API Gateway', type: 'Write', requested: '2024-01-14', priority: 'Medium' },
    { id: 3, user: 'bob.wilson@email.com', resource: 'Cloud Storage', type: 'Read', requested: '2024-01-13', priority: 'Low' }
  ]);

  approve(id: number) {
    this.approvals.update(items => items.filter(item => item.id !== id));
  }

  reject(id: number) {
    this.approvals.update(items => items.filter(item => item.id !== id));
  }
}