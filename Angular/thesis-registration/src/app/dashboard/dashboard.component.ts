import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getDashboardData().subscribe(
      (response) => {
        this.dashboardData = response;
        console.log('Dashboard data:', this.dashboardData);
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }
}
