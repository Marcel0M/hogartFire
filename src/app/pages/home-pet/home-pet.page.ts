import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { hogar } from 'src/app/models/models';
import { __metadata } from 'tslib';



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
  cursosArr = [];
  hogar : hogar[] = [];

  hogaresP: hogar= {
    id: "",
    uid: "",
    url: "",
    tipoh: "",//Casa-Depto
    tipom: "",//Perro-Gato-Ambos
    metraje: "",
    patio: "",//Si-No
    seguridad: "",//Si-No
    direccion: "",
    cantidad: "",//cantidad mascotas-crear contador quizas
    disponibilidad: "", //Si-No 
    lat: 0,
    lng: 0,
  }

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
  }

  ngAfterViewInit() {
    this.createMap();
    this.cargarHogares();
  
  }


  cargarHogares(){
    this.firestore.getCollection<hogar>('hogares').subscribe( res => {
      console.log('HOGAR-TEMPORAL: Esta es la coleccion: ', res);
      this.hogar = res;
      
      for ( let i = 0; i < res.length; i++){
        const element = res[i];
        let _lat = element.lat;
        let _lng = element.lng;
        let titulo = element.disponibilidad;
        this.hogaresP.direccion = element.direccion;
        this.hogaresP.tipoh = element.tipoh;
        this.hogaresP.tipom = element.tipom;
        this.addMarker(_lat, _lng, titulo);
      }

    })
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
    //this.addMarker(this.center.lat, this.center.lng);
  }

  //AGREGAR MARCA AL MAPA
  async addMarker(lat, lng, titulo) {
    this.markerId = await this.newMap.addMarker({
     coordinate: {
       lat: lat,
       lng: lng,
     },
     title: "Direccion: " + this.hogaresP.direccion + "\n" + "Disponibilidad: " + titulo + "\n" + "Tipo de Hogar: " + this.hogaresP.tipoh + "\n" + "Mascotas Aceptadas: " + this.hogaresP.tipom ,
     
     snippet: "Hogar-Temporal",
     draggable: false,
     iconUrl: 'https://icons-for-free.com/download-icon-home+house+thiago+pontes+icon-1320086034131259248_32.png',
     
    });
  }

  //https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1'
  //REMUEVE MARCA DEL MAPA
  async removeMarker() {
    await this.newMap.removeMarker(this.markerId);
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
