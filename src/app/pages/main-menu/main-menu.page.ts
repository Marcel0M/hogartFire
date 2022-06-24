import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';

//import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { InteractionService } from 'src/app/services/interaction.service';
import { reporte } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Console } from 'console';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {


  ruta: string = '';
  profile = null;
  Reportes : reporte[] = [];
  test = null;

  constructor(private router: Router,
    private avatarService: AvatarService,
    public navController: NavController,
    public loadingController: LoadingController,
    private authService: AuthService,
    private interaction: InteractionService,
    private firestore: FirestoreService
    ) { 
      this.avatarService.getUserProfile().subscribe((data) => {
        this.profile = data;
        
      });
    }

  ngOnInit() {
    this.interaction.cargarLoading();
    this.cargarReportes();
  }


cargarReportes(){
  this.firestore.getCollection<reporte>('reportes').subscribe( res => {
    console.log('HOGAR-TEMPORAL: Esta es la coleccion: ', res);
    this.Reportes = res;
  })
}

editPet(pet: reporte) {
  console.log('click en mascota ->', pet);
  this.firestore.readPet(pet);
}



//FUNCIONES NAVEGACION
  toHome() {
    this.router.navigate(['/home']);
    this.navController.navigateRoot('home')
  }

  toRegisterPet() {
    this.router.navigate(['/register-pet']);
    this.navController.navigateRoot('register-pet')
  }

  toHomePet() {
    this.router.navigate(['/home-pet']);
    this.navController.navigateRoot('home-pet')
  }

  toProfilePet(id) {
    console.log('click en la mascota ->', id)
    this.router.navigate(['/profile-pet']);
    this.navController.navigateRoot('profile-pet')
  }

  async testeandoID(){
    await this.authService.test()
  }

}
