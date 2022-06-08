import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePetPage } from './profile-pet.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePetPageRoutingModule {}
