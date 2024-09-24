import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLogout = false;
  userName: string | null = null;
  userSurname: string | null = null;
  isHome: boolean | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.userName = user ? user.name : null;
      this.userSurname = user ? user.surname : null;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/home';
      }
    });
  }

  logout(): void {
    this.isLogout = true;
    this.authService.logout();
    this.isLogout = false;
  }

  settings(): void {
    this.isHome = false;
    this.router.navigate(['/settings']);
  }

  home(): void {
    this.isHome = true;
    this.router.navigate(['/home']);
  }
}
