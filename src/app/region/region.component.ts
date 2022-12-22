import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commentaire } from '../class/commentaire';
import { Population } from '../class/population';
import { Region } from '../class/region';
import { RegionService } from '../Service/region.service';
import { UserService } from '../Service/user.service';

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

  maPop: any

  formmodule!: FormGroup;

  constructor(private userService: UserService, private service: RegionService,
    private formB: FormBuilder,) { }

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

    console.log('listess___', data);

   })
  }

  //ajout de la region
    // getRegionFormData(data: any){
    //   console.warn(data)
    //   console.log("-----------------------------h")
    //   this.service.ajouter(data).subscribe((data)=>{
    //     console.log()
    //     this.ajoutRegion =data
    //     console.warn(data)
    //     console.log("-----------------------------h")
    //   })
    // }

    filechange(event: any){
      this.img = event.target.files[0]
      console.log('rrrrrrrrr', event);
    }


    //ajout region avec images
    getRegionFormData(){
      this.service.ajoutRegions(this.activite, this.coderegion, this.description, this.img,
                               this.nom,this.langue,  this.superficie).subscribe(
                                  (data)=>{
                                  console.log('eeeeeeeeeeeeeeeeeeeeee',data);
                                  this.ajoutRegion = data;
                                  this.reloadPage()

                                  this.message = "ajouter avec success!"
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




