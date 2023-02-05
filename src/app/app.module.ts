import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { PokemonCatalogueComponent } from './components/pokemon-catalogue/pokemon-catalogue.component';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProfilePage } from './pages/profile/profile.page';
import { ErrorPage } from './pages/error/error.page';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrainerListItemsComponent } from './components/trainer-list-items/trainer-list-items.component';
import { LoginPageAltComponent } from './components/login-page-alt/login-page-alt.component';
import { UnfavouriteButtonComponent } from './components/unfavourite-button/unfavourite-button.component';
import { CataloguePage } from './pages/catalogue/catalogue.page';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    LoginFormComponent,
    PokemonCatalogueComponent,
    ProfilePage,
    ErrorPage,
    NavbarComponent,
    TrainerListItemsComponent,
    LoginPageAltComponent,
    UnfavouriteButtonComponent,
    CataloguePage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgbTooltipModule,
    NgbPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
