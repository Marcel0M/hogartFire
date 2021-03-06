import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['main-menu']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'main-menu',
    loadChildren: () => import('./pages/main-menu/main-menu.module').then( m => m.MainMenuPageModule)
  },  {
    path: 'register-pet',
    loadChildren: () => import('./pages/register-pet/register-pet.module').then( m => m.RegisterPetPageModule)
  },
  {
    path: 'home-pet',
    loadChildren: () => import('./pages/home-pet/home-pet.module').then( m => m.HomePetPageModule)
  },
  {
    path: 'profile-pet',
    loadChildren: () => import('./pages/profile-pet/profile-pet.module').then( m => m.ProfilePetPageModule)
  },
  {
    path: 'editar-home',
    loadChildren: () => import('./pages/editar-home/editar-home.module').then( m => m.EditarHomePageModule)
  },
  {
    path: 'register-hogar',
    loadChildren: () => import('./pages/register-hogar/register-hogar.module').then( m => m.RegisterHogarPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
