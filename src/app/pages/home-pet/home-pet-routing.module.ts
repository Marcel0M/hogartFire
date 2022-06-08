import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePetPage } from './home-pet.page';

const routes: Routes = [
  {
    path: '',
    component: HomePetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePetPageRoutingModule {}
