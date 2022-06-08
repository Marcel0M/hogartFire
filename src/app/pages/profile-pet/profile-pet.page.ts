import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';


import { environment } from 'src/environments/environment';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-profile-pet',
  templateUrl: './profile-pet.page.html',
  styleUrls: ['./profile-pet.page.scss'],
})
export class ProfilePetPage implements OnInit {

  ruta: string = '';
  profile = null;

  constructor(
    private router: Router,
    private avatarService: AvatarService,
    public navController: NavController,
    public loadingController: LoadingController,
    private authService: AuthService,
    private interaction: InteractionService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
      
    });
   }

  ngOnInit() {
    this.interaction.cargarLoading();
  }

   //FUNCION QUE CARGA PAGINA
   async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 1500,
      spinner: "bubbles"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('HOGAR-TEMPORAL: CARGA FINALIZADA');
  }


  //FUNCIONES NAVEGACION
  toHome() {
    this.router.navigate(['/home']);
    this.navController.navigateRoot('home')
  }

}
