import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { hogar } from 'src/app/models/models';
import { Geolocation, GeolocationOptions } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-register-hogar',
  templateUrl: './register-hogar.page.html',
  styleUrls: ['./register-hogar.page.scss'],
})
export class RegisterHogarPage implements OnInit {

  data:  hogar = {
    id: "",
    uid: "",
    url: "",
    tipoh: "",//Casa-Depto
    tipom: "",//Perro-Gato-Ambos
    metraje: "",
    patio: "",//Si-No
    seguridad: "",//Si-No
    direccion: "",//Si-No
    cantidad: "",//cantidad mascotas-crear contador quizas
    disponibilidad: "", //Si-No 
    lat: 0,
    lon: 0,
  }

  randomId = "";
  uid = '';
  lat = 0;
  lon = 0;
  alt : number;
  accur: number;
  options : GeolocationOptions;
  hogar = null;
  newFile: any;
  getHogarImage = null;



  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: FirestoreService,
    private interaction: InteractionService,
    private geolocation: Geolocation,
    private router: Router
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
      source: CameraSource.Camera, 
    });

    if (image) {
      const loading = await this.loadingController.create({
          message: 'Cargando Imagen',
          spinner: "bubbles"
      });
      await loading.present();
      const path = 'hogares';
      const generarToken = this.firestore.createRandomID();
      this.randomId = generarToken
      const result = await this.avatarService.uploadPhoto(image, path, this.randomId); 
      loading.dismiss();
      this.data.url = result;

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

      this.avatarService.getHogarImage(this.randomId).subscribe((data) => {
        this.getHogarImage = data;
      });
    }
  }


  registrarHogar(){
    const path = 'hogares';
    const token = this.randomId
    const usuario = this.authService.test() 
    this.data.uid = usuario;
    this.data.lat = this.lat;
    this.data.lon = this.lon;
    this.data.id = token;
    this.firestore.createDocument(this.data, path, token).then( (res) => {
      console.log('HOGAR-TEMPORAL: ID ASIGNADO A HOGAR TEMPORAL: ', token);
      console.log('HOGAR-TEMPORAL: SE REGISTRO UN HOGAR TEMPORAL: ', res);
      //this.interaction.presentToast('SE REGISTRO UN HOGAR TEMPORAL EXITOSAMENTE', 2000);
    });
    this.router.navigateByUrl('home-pet', { replaceUrl: true });
  }

}
