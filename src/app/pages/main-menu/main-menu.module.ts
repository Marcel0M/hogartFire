import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMenuPageRoutingModule } from './main-menu-routing.module';

import { MainMenuPage } from './main-menu.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMenuPageRoutingModule,
    //ComponentsModule
  ],
  declarations: [MainMenuPage]
})
export class MainMenuPageModule {}
