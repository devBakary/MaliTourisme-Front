import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { StorageService } from '../Service/storage.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private roles: string[] = [];
  isLogged = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private tokenService: TokenService,
    ) { }

  ngOnInit(): void {

    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }

    this.currentUser = this.tokenService.getUser();



    // this.isLoggedIn =  this.tokenService.isLogged()

    // if(this.isLoggedIn){

    // }
    // this.isLoggedIn = this.tokenService.isLogged();

    // if (this.isLoggedIn) {
    //   const user = this.tokenService.getUser();
    //   this.roles = user.roles;

    //   this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    //   this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    //   this.username = user.username;
    // }
  }

  deconect(): void{
    this.tokenService.logout()
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
