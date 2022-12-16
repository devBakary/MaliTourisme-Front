import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { InscrireComponent } from './inscrire/inscrire.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [
    {
        path: "",
        redirectTo:"/login",
        pathMatch: 'full'
    },
    {
        path: "navbar",
        component: NavbarComponent
    },
    {
        path: "footer",
        component: FooterComponent
    },
    {
        path: "accueil",
        component: AccueilComponent
    },
    {
        path: "inscrire",
        component: InscrireComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "regions",
        component: RegionComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
