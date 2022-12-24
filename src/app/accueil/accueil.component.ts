import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commentaire } from '../class/commentaire';
import { RegionService } from '../Service/region.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  //liste commentaire
  mesliste: any
  id= 1
  //liste des regions
  listes: any;
  maPop: any;

  constructor(
    private service : RegionService,
    private tokenService: TokenService
    ) { }


  ngOnInit(): void {



    //population region
    this.service.PopRegion(this.id).subscribe(data =>{
      this.maPop = data
     })

    this.service.liste().subscribe(data=>{
      this.listes=data;
   });

  }

}
