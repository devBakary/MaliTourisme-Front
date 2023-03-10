import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentaire } from '../class/commentaire';
import { RegionService } from '../Service/region.service';
import { TokenService } from '../_services/token.service';
import swal from 'sweetalert2';

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
  maPop: any;
  currentUser: any;
  iduser: any
  maliste: any;

  constructor(
    private service: RegionService,
    private route: ActivatedRoute,
    private tokenService: TokenService
    ) { }


  ajoutCommentaire: Commentaire={
    description: ''
  }

  reset(){
    this.description= '';
  }

  description: string = ''

  ngOnInit(): void {

    //recuperation de l'user encours
    this.currentUser = this.tokenService.getUser();
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",this.currentUser.id);
    this.iduser= this.currentUser.id

    //capture de l'id
    this.id = +this.route.snapshot.params['id']

    //liste par id region
    this.service.getRegion(this.id).subscribe(data =>{
      this.idreg = data

    })


    this.service.PopRegion(this.id).subscribe(data =>{
      this.maPop = data
     })


     //liste des regions
    this.service.liste().subscribe(data=>{
      this.listes=data;
     });


   //liste des commentaire par region
   this.service.listeCom(this.id).subscribe(data =>{
    this.mesliste = data;
    console.log("commenatire", data[0].user.username);


   });

   //liste des commentaire
   this.service.listeCommentaire().subscribe(data =>{
    this.maliste = data;
   });


  }

  //ajout des commentaires
  getCommentData(data : any){
    swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ajoutCommentaire.description = this.description
        this.service.ajoutCom(data, this.id, this.iduser).subscribe(data=>{
          this.reloadPage();
        })
        swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        swal.fire('Changes are not saved', '', 'info')
      }
    })

  }


  reloadPage(): void {
    window.location.reload();
  }

  submit(){
    swal.fire("hhh")
  }

}
