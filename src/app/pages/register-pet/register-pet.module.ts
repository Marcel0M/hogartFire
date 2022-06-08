import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPetPageRoutingModule } from './register-pet-routing.module';

import { RegisterPetPage } from './register-pet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPetPageRoutingModule
  ],
  declarations: [RegisterPetPage]
})
export class RegisterPetPageModule {}
