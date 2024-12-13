import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: any;
  constructor(private authService: AuthService) {}

  isAdmin(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 'admin';
  }

  logout(): void {
    this.authService.logout();
  }
}
