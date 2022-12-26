import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commentaire } from '../class/commentaire';
import { Population } from '../class/population';
import { Region } from '../class/region';
import { RegionService } from '../Service/region.service';
import { UserService } from '../Service/user.service';
import { TokenService } from '../_services/token.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  region!: Region;
  id: any
  liste: any;
  content?: string;
  img:any;
  message: any;
  iduser:any

  maPop: any

  formmodule!: FormGroup;
  currentUser: any;
  isLogged= false;

  constructor(private userService: UserService, private service: RegionService,
    private formB: FormBuilder, private tokenService: TokenService) { }

    //pour la region
  ajoutRegion: Region ={

    activite: '',
    coderegion: '',
    description: '',
    langue: '',
    nom: '',
    superficie: '',
    img: '',
  }
  //pour la population
    ajoutPop: Population={
      annee: '',
      habitants: 0
  }

  annee: string =  '';
  habitants: number = 0

  formodule! : FormGroup
  activite: string = '';
  coderegion: string = '';
  description: string = '';
  langue: string = '';
  nom: string = '';
  superficie: string = '';


  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
    this.currentUser = this.tokenService.getUser();

    this.formmodule = this.formB.group({
      img: ["", Validators.required],
    })



    //liste des regions
    this.service.liste().subscribe(data=>{
      this.liste=data;
   });

   //liste des popul
   this.service.listePop().subscribe(data =>{
    this.maPop = data
    console.log(this.maPop);


    console.log('listess___', data);

   })
  }

  supprimer(id: number){

      swal.fire({
        title: 'Voulez-vous vraiment supprimer?',
        text: "Vous ne pourrez plus le recuperer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, effacer!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.supRegion(id).subscribe(data =>{
            this.reloadPage() })
          swal.fire(
            'Effacer!',
            'Supprimer avec success',
            'success'
          )
        }
      })

  }

    filechange(event: any){
      this.img = event.target.files[0]
      console.log('rrrrrrrrr', event);
    }


    //ajout region avec images
    getRegionFormData(){
      this.service.ajoutRegions(this.activite, this.coderegion, this.description, this.img,
                               this.nom,this.langue,  this.superficie).subscribe(
                                  (data)=>{
                                  this.ajoutRegion = data;
                                  this.reloadPage()

                                  this.message = "ajouter avec success!"
          })
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Region ajouter avec succes',
            text:'Veuillez ajouter une population',
            showConfirmButton: false,
            timer: 1800

          }).then((result) => {
            this.reloadPage()
           })
    }


    resetForm(){
      this.annee='',
      this.habitants=0
    }

    //methode pour ajouter un comm
    population(){
      console.log("donnée===========");
      this.ajoutPop.annee=this.annee;
      this.ajoutPop.habitants=this.habitants;
      this.service.addPopu(this.ajoutPop, this.id).subscribe(data =>{
        this.reloadPage()

      })
    }

    reloadPage(): void {
      window.location.reload();
    }

  }




