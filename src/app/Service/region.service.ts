import { HttpClient } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../class/commentaire';
import { Region } from '../class/region';

const API = 'http://localhost:8080/tourisme/region/'

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor( private http: HttpClient) { }

  //liste des regions
  liste(): Observable<any>{
    return this.http.get(API + 'read')
  }

  //ajout des region avec images
  ajoutRegions(activite: string, coderegion: string, description: string,
    img: any,  langue: string,  nom: string,  superficie: string): Observable<any>{
              console.log("service: " + img)
              let data = new FormData();
              data.append('activite', activite);
              data.append('coderegion', coderegion);
              data.append('description', description);
              data.append('img', img);
              data.append('langue', langue);
              data.append('nom', nom);
              data.append('superficie', superficie);
              
          return this.http.post(`http://localhost:8080/tourisme/region/ajout`, data);
  }

  //ajout de nos regions
  ajouter(region:Region): Observable<any>{

    return this.http.post(`http://localhost:8080/tourisme/region/create`, region);
  }

  //region par id
  getRegion(id: number): Observable<any>{
    return this.http.get(`http://localhost:8080/tourisme/region/get/${id}`)
  }


  //ajouter un commentaire
  Comment(commentaire: Commentaire): Observable<any>{

    return this.http.post(`http://localhost:8080/tourisme/commentaire/ajouter`, commentaire);
  }
  //liste de commentaire
  listeCom(): Observable<any>{
    return this.http.get(`http://localhost:8080/tourisme/commentaire/liste`)
  }
}

