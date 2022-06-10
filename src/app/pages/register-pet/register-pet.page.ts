import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { reporte } from 'src/app/models/models';
import { Geolocation, GeolocationOptions } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.page.html',
  styleUrls: ['./register-pet.page.scss'],
})
export class RegisterPetPage implements OnInit {

  data: reporte = {
    uid: "",
    url: "",
    tipo: "",
    sexo: "",
    raza: "",
    color: "",
    temperamento: "",
    tamano: "",
    lat: 0,
    lon: 0,
  }

  uid = '';
  lat = 0;
  lon = 0;
  alt : number;
  accur: number;
  options : GeolocationOptions;
  pet = null;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: FirestoreService,
    private interaction: InteractionService,
    private geolocation: Geolocation
    
  ) 
  {
    this.options = {
      enableHighAccuracy : true
    };
  
      this.geolocation.getCurrentPosition(this.options).then((resp) => {
        this.lat = resp.coords.latitude;
        this.lon = resp.coords.longitude;
        console.log('HOGAR-TEMPORAL: Latitud : ', resp.coords.latitude);
        console.log('HOGAR-TEMPORAL: Longitud: ', resp.coords.longitude);
      }).catch((error) => {
        console.log('HOGAR-TEMPORAL: Error al obtener tu ubicacion', error);
      });


    this.avatarService.getPet().subscribe((data) => {
      this.pet = data;
    });
   }



  ngOnInit() {
    this.interaction.cargarLoading();
    this.changePhoto();
  }


  async changePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create({
          message: 'Cargando Imagen',
          spinner: "bubbles"
      });
      await loading.present();

      const result = await this.avatarService.uploadPhoto(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Subida fallida',
          message: 'Hubo un problema al cargar tu foto',
          buttons: ['OK'],
        });
        console.log("HOGAR-TEMPORAL: ERROR AL CARGAR IMAGEN");
        await alert.present();
      }
      console.log("HOGAR-TEMPORAL: IMAGEN CARGADA CORRECTAMENTE");
    }
  }


   registrarPet(){
    const path = 'reportes';
    const randomid = this.firestore.createRandomID();
    const usuario = this.authService.test() 
    this.data.uid = usuario;
    this.data.lat = this.lat;
    this.data.lon = this.lon
    this.firestore.createDocument(this.data, path, randomid).then( (res) => {
      console.log('HOGAR-TEMPORAL: ID ASIGNADO A ESTE REPORTE: ', randomid);
      console.log('HOGAR-TEMPORAL: SE REGISTRO UNA MASCOTA EXITOSAMENTE: ', res);
    });
  }

  

}
