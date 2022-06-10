import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarHomePage } from './editar-home.page';

const routes: Routes = [
  {
    path: '',
    component: EditarHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarHomePageRoutingModule {}
