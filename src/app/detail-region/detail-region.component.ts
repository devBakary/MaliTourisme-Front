import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commentaire } from '../class/commentaire';
import { RegionService } from '../Service/region.service';

@Component({
  selector: 'app-detail-region',
  templateUrl: './detail-region.component.html',
  styleUrls: ['./detail-region.component.scss']
})
export class DetailRegionComponent implements OnInit {
  listes: any;
  mesliste: any;
  id: any
  idreg: any

  constructor(
    private service: RegionService,
    private route: ActivatedRoute) { }


  ajoutCommentaire: Commentaire={
    description: ''
  }

  description: string = ''

  ngOnInit(): void {

    const id = +this.route.snapshot.params['id']
    console.log("id____________",id)

    //liste par id
    this.service.getRegion(id).subscribe(data =>{
      this.idreg = data
      console.log("==========================moi",data);
    })


    this.service.liste().subscribe(data=>{
      this.listes=data;

   });


   //liste des commentaire
   //console.log("mes comment")
   this.service.listeCom().subscribe(data =>{
    this.mesliste = data;
    //console.log("===========================afficher", data)
   });
  }

  //ajout des commentaires
  getCommentData(data : any){
    this.service.Comment(data).subscribe(data=>{
      this.ajoutCommentaire= data;
      //console.log( "------------------------------ok")
    })
  }

  

}
