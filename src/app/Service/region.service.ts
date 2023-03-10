import { HttpClient } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../class/commentaire';
import { Population } from '../class/population';
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

  //region par id
  supRegion(id: number): Observable<any>{
    return this.http.delete(`http://localhost:8080/tourisme/region/delete/${id}`)
  }




  //ajout de la population
  addPopu(populations: Population, id: number ):Observable<any>{

    return this.http.post<any>(`http://localhost:8080/tourisme/population/create/${id}`, populations)
  }

  //liste de region
  listePop():Observable<any>{
    return this.http.get(`http://localhost:8080/tourisme/population/liste`)
  }

  //liste de region
  PopRegion(id: number):Observable<any>{
    return this.http.get(`http://localhost:8080/tourisme/population/liste/${id}`)
  }



  //liste de commentaire par region
  listeCom(id: number): Observable<any>{
    return this.http.get(`http://localhost:8080/tourisme/commentaire/liste/${id}`)
  }

   //liste de commentaire
   listeCommentaire(): Observable<any>{
    return this.http.get(`http://localhost:8080/tourisme/commentaire/liste`)
  }

   //ajout de commentaire
   ajoutCom(commentaire: Commentaire, id: number, idreg: number): Observable<any>{
    return this.http.post(`http://localhost:8080/tourisme/commentaire/ajouter/${id}/${idreg}`, commentaire)
  }


}

