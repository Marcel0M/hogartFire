import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';

import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: -33.404015,
    lng: -70.7400601,
  };

  markerId: string;

  ruta: string = '';
  profile = null;

  constructor(private router: Router,
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

  ngAfterViewInit() {
    this.createMap();

  }

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

  async addMarker(lat, lng) {
    //AGREGAR MARCA AL MAPA
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

  async removeMarker() {
    await this.newMap.removeMarker(this.markerId);
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
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
  registraMascota() {
    this.router.navigate(['/registrar-mascota']);
    this.navController.navigateRoot('registrar-mascota')
  }

  home() {
    this.router.navigate(['/home']);
    this.navController.navigateRoot('home')
  }

  toRegisterPet() {
    this.router.navigate(['/register-pet']);
    this.navController.navigateRoot('register-pet')
  }

  async testeandoID(){
    await this.authService.test()
  }

}
