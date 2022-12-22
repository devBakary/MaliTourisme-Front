import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICredentials } from '../_interfaces/credentials';
import { IToken } from '../_interfaces/token';

const AUTH_API = 'http://localhost:8080/api/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  log = 'http://localhost:8080/api/auth/connexion';

  constructor(private http : HttpClient) { }


  login(credentials: ICredentials): Observable<IToken>{
    return this.http.post<IToken>(this.log, credentials)
  }



//methode pour la connexion
// Connexion(username: string, password: string): Observable<any>{
//   return this.http.post(AUTH_API + 'connexion',
//   {username,
//    password
//   },
//    httpOptions
//    );
// }


//methode pour l'inscription
inscription(username: string, email: string, password: string): Observable<any> {
  return this.http.post(
    AUTH_API + 'inscrire',
    {
      username,
      email,
      password,
    },
    httpOptions
  );
}

//methode pour la deconnexion
logout(): Observable<any> {
  return this.http.post(AUTH_API + 'signout', { }, httpOptions);
}
}


