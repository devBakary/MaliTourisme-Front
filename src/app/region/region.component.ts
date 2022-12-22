import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  formmodule!: FormGroup;

  constructor(private userService: UserService, private service: RegionService,
    private formB: FormBuilder,) { }

  ajoutRegion: Region ={

    activite: '',
    coderegion: '',
    description: '',
    langue: '',
    nom: '',
    superficie: '',
    img: '',
  }

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
      //console.table ("vbbvbcbvbx"+ this.nom);
      console.table ("ts :  "+ this.img);
      this.service.ajoutRegions(this.activite, this.coderegion, this.description, this.img,
                               this.nom,this.langue,  this.superficie).subscribe(
                                  (data)=>{
                                  console.log('eeeeeeeeeeeeeeeeeeeeee',data);
                                  this.ajoutRegion = data;
          })
    }

  }




