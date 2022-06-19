import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterHogarPageRoutingModule } from './register-hogar-routing.module';

import { RegisterHogarPage } from './register-hogar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterHogarPageRoutingModule
  ],
  declarations: [RegisterHogarPage]
})
export class RegisterHogarPageModule {}
