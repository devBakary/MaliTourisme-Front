import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

  const token = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(private router: Router, private us: UserService) { }


    saveToken(token: any): void{
    window.localStorage.setItem('token', JSON.stringify(token))
    this.router.navigate(['/navbar/accueil'])
  }



  //methode pour recuperer le token dans le localstorage
  isLogged(): boolean{
    const token = window.localStorage.getItem('token')
    // console.log(token)
    return !! token
  }
  public getUser(): any {
    const user = window.localStorage.getItem('token');
    if (user) {
      console.log("iiiiiiiiiiiiiiiiiii", user);
      return JSON.parse(user);
    }

    return {};
  }
























  //methode pour supprimer le token
  logout(): void{
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  getToken(): string | null{
    return localStorage.getItem('token')
  }

}
