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

  /* @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: -33.404015,
    lng: -70.7400601,
  }; */

  //markerId: string;

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

  /* ngAfterViewInit() {
    this.createMap();
  }
  
  //FUNCION CREAR MAPA
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKeyMaps,
      config: {
        center: this.center,
        zoom: 8,
      },
    });

    this.addMarker(this.center.lat, this.center.lng);
  }

  //AGREGAR MARCA AL MAPA
  async addMarker(lat, lng) {
    this.markerId = await this.newMap.addMarker({
     coordinate: {
       lat: lat,
       lng: lng,
     },
     title: "Hogar-Temporal",
     snippet: "Hogar-Temporal",
     draggable: true
    });
  }
  //REMUEVE MARCA DEL MAPA
  async removeMarker() {
    await this.newMap.removeMarker(this.markerId);
  } */

  //FUNCION CERRAR SESION
  /* async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  } */


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
