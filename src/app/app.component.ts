import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Service/auth.service';
import { StorageService } from './Service/storage.service';
import { TokenService } from './_services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MAliTourisme-Front';
  private roles: string[] = [];
  isLogged = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService, private tokenService: TokenService,  private route: Router) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        // window.location.reload();
        this.route.navigate(["/login"])
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

