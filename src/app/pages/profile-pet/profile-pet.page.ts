import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';

import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { reporte } from 'src/app/models/models';




@Component({
  selector: 'app-profile-pet',
  templateUrl: './profile-pet.page.html',
  styleUrls: ['./profile-pet.page.scss'],
})
export class ProfilePetPage implements OnInit {

     @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: -33.404015,
    lng: -70.7400601,
  };

  markerId: string;

  petPerfil : reporte = {
    id: "",
    uid: "",
    url: "",
    tipo: "",
    sexo: "",//Macho-Hembra
    raza: "",
    color: "",
    temperamento: "",
    tamano: "",
    lat: 0,
    lng: 0,
    situacion: ""
  }
  ruta: string = '';
  profile = null;
  Reportes : reporte[] = [];

  

  constructor(
    private router: Router,
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
    this.actualizarDatosPet();
  }


  actualizarDatosPet(){
    const pet = this.firestore.getPet();
    this.petPerfil.id = pet.id;
    this.petPerfil.uid = pet.uid;
    this.petPerfil.color = pet.color;
    this.petPerfil.raza = pet.raza;
    this.petPerfil.sexo = pet.sexo;
    this.petPerfil.situacion = pet.situacion;
    this.petPerfil.tamano = pet.tamano;
    this.petPerfil.temperamento = pet.temperamento;
    this.petPerfil.tipo = pet.tipo;
    this.petPerfil.url = pet.url;
    this.petPerfil.lat = pet.lat;
    this.petPerfil.lng = pet.lng;
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
        zoom: 10,
      },
    });

    //await this.newMap.enableTrafficLayer(true);
    await this.newMap.enableCurrentLocation(true);
    //await this.newMap.enableClustering();

    this.addMarker(this.center.lat, this.center.lng);
    
  }

  //AGREGAR MARCA AL MAPA
  async addMarker(lat, lng) {
    this.markerId = await this.newMap.addMarker({
     coordinate: {
       lat: this.petPerfil.lat,
       lng: this.petPerfil.lng,
     },
     title: this.petPerfil.situacion,
     snippet: this.petPerfil.tipo,
     draggable: false
    });
    
  }

  //REMUEVE MARCA DEL MAPA
  async removeMarker() {
    await this.newMap.removeMarker(this.markerId);
  } 

  //FUNCION CERRAR SESION
  /* async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  } */


  //FUNCIONES NAVEGACION
  toHome() {
    this.router.navigate(['/home']);
    this.navController.navigateRoot('home')
  }

}
