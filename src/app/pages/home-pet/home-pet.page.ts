import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home-pet',
  templateUrl: './home-pet.page.html',
  styleUrls: ['./home-pet.page.scss'],
})
export class HomePetPage implements OnInit {

  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: -33.404015,
    lng: -70.7400601,
  };

  markerId: string;
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

  ngAfterViewInit() {
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
    await this.newMap.enableCurrentLocation(true);
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

  toRegisterHogar() {
    this.router.navigate(['/register-hogar']);
    this.navController.navigateRoot('register-hogar')
  }

}
