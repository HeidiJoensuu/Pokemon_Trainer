import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCatalogueComponent } from './components/pokemon-catalogue/pokemon-catalogue.component';
import { ErrorPage } from './pages/error/error.page';
import { LoginPage } from './pages/login/login.page';
import { ProfilePage } from './pages/profile/profile.page';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  //end points/routes goes here
  { path: '', component: LoginPage },
  { path: '', //! this dummy root will always protect other root 1auth guard for all roots
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [{ path: 'profile', component: ProfilePage }, {path: 'catalogue', component: PokemonCatalogueComponent}],
  },
  { path: '**', component: ErrorPage, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
