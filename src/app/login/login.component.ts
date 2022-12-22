import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { StorageService } from '../Service/storage.service';
import { ICredentials } from '../_interfaces/credentials';
import { IToken } from '../_interfaces/token';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: ICredentials = {
    username: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private route: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roles;
      console.log("mon role+++++++++++++++++++",this.roles);

    }
  }

  // onSubmit(): void {
  //   const { username, password } = this.form;

  //   this.authService.Connexion(username, password).subscribe({
  //     next: data => {
  //       this.storageService.saveUser(data);
  //       console.log(data)

  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       this.roles = this.storageService.getUser().roles;
  //       this.route.navigate(['/navbar/accueil']);
  //       // this.reloadPage();


  //     },
  //     error: err => {
  //       this.errorMessage = err.error.message;
  //       this.isLoginFailed = true;
  //     }
  //   });
  // }

    onSubmit(): void{
      console.log(this.form);
      this.authService.login(this.form).subscribe(
        data =>{
          // console.log(data.accessToken),
          this.tokenService.saveToken(data.accessToken)
        },
        err => console.log(err)
      )
    }

  reloadPage(): void {
    window.location.reload();
  }

}
