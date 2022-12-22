import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DetailRegionComponent } from './detail-region/detail-region.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './Helper/auth.guard';
import { HomeComponent } from './home/home.component';
import { InscrireComponent } from './inscrire/inscrire.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilComponent } from './profil/profil.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [
    {
        path: "",
        redirectTo:"/login",
        pathMatch: 'full'
    },
    {
        path: "navbar",
        component: NavbarComponent, canActivate: [AuthGuard],
        children:[
          {
            path: "accueil",
            component: AccueilComponent,
          },
          {
            path: "regions",
            component: RegionComponent
          },
          { path: 'home',
          component: HomeComponent
          },
          {
            path: 'profile',
            component: ProfilComponent
          },
        ]

    },
    {
      path: 'detail/:id',
      component: DetailRegionComponent
    },
    {
        path: "footer",
        component: FooterComponent
    },

    {
        path: "inscrire",
        component: InscrireComponent
    },
    {
        path: "login",
        component: LoginComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
