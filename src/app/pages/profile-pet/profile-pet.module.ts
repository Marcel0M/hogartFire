import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePetPageRoutingModule } from './profile-pet-routing.module';

import { ProfilePetPage } from './profile-pet.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePetPageRoutingModule
  ],
  declarations: [ProfilePetPage]
})
export class ProfilePetPageModule {}
