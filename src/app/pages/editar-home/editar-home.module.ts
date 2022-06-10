import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarHomePageRoutingModule } from './editar-home-routing.module';

import { EditarHomePage } from './editar-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarHomePageRoutingModule
  ],
  declarations: [EditarHomePage]
})
export class EditarHomePageModule {}
