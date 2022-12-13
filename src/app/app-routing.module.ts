import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { InscrireComponent } from './inscrire/inscrire.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: "",
        redirectTo:"/login",
        pathMatch: 'full'
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
        path: "contact",
        component: ContactComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
