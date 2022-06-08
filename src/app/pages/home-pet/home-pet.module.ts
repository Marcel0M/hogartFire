import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePetPageRoutingModule } from './home-pet-routing.module';

import { HomePetPage } from './home-pet.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';//IMPORTACION PARA GOOGLE MAPS EN ANGULAR

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePetPageRoutingModule,
  ],
  declarations: [HomePetPage]
})
export class HomePetPageModule {}
