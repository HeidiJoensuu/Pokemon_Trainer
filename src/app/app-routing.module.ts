import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { ProfilePage } from './pages/profile/profile.page';
import { AuthGuard } from './guards/auth.guard';
import { CataloguePage } from "./pages/catalogue/catalogue.page";

/**
 * Routes for our spa
 * profile and / are guarded with requirement
 *path:"" = this dummy root will always protect other root 1auth guard for all roots
 */
const routes: Routes = [

  { path: '', component: LoginPage },
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'profile', component: ProfilePage },
      {path: '/', component: CataloguePage}
    ],
  },
  { path: '**', component: LoginPage, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
