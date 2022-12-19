import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { InscrireComponent } from './inscrire/inscrire.component';
import { LoginComponent } from './login/login.component';
import { RegionComponent } from './region/region.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './Helper/auth.interceptor';
import { ProfilComponent } from './profil/profil.component';
import { HomeComponent } from './home/home.component';
import { PaysComponent } from './class/pays/pays.component';
import { CommentaireComponent } from './class/commentaire/commentaire.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    InscrireComponent,
    LoginComponent,
    RegionComponent,
    NavbarComponent,
    FooterComponent,
    ProfilComponent,
    HomeComponent,
    PaysComponent,
    CommentaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
