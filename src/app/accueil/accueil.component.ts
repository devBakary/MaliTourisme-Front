import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commentaire } from '../class/commentaire';
import { RegionService } from '../Service/region.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  //liste commentaire
  mesliste: any

  //liste des regions
  listes: any;

  constructor(
    private service : RegionService,
    ) { }


  ngOnInit(): void {





    this.service.liste().subscribe(data=>{
      this.listes=data;
   });

   //liste des commentaire
   console.log("mes comment")
   this.service.listeCom().subscribe(data =>{
    this.mesliste = data;
    console.log("===========================afficher", data)
   });
  }






}
