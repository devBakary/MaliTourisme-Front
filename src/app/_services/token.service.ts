import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

  // const token = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {



  constructor(private router: Router) { }

  saveToken(token: string): void{
    localStorage.setItem('token', token)
    this.router.navigate(['/navbar/accueil'])
  }

  //methode pour recuperer le token dans le localstorage
  isLogged(): boolean{
    const token = localStorage.getItem('token')
    console.log(token)
    return !! token
  }

  public getUser(): any {
    const user = localStorage.getItem('token');
    console.log("--------------------------Me",user);

    if (user) {
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
