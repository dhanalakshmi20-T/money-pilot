import { Component, OnInit } from '@angular/core';
import { DashboardSummary } from 'src/app/core/models/dashboard/dashboard-summary';
import { RecentTransaction } from 'src/app/core/models/dashboard/recent-transaction';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading = false;
  summary!: DashboardSummary;
  recentTransactions: RecentTransaction[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.dashboardService.getDashboard().subscribe({
      next: (response) => {
        this.summary = response.summary;
        this.recentTransactions = response.recentTransactions;
        this.loading = false;
      },

      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }
}
