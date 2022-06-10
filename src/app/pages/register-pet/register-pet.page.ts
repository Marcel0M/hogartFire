import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { users } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { reporte } from 'src/app/models/models';
import { GeolocationPlugin } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';


@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.page.html',
  styleUrls: ['./register-pet.page.scss'],
})
export class RegisterPetPage implements OnInit {

  options: NativeGeocoderOptions = {
    useLocale: true, 
    maxResults: 5
  }


  data: reporte = {
    uid: '',
    url: "",
    tipo:'',
    sexo: '',
    raza: "",
    color: "",
    temperamento: "",
    tamano: ''

  }


  pet = null;

   


  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: FirestoreService,
    private interaction: InteractionService,
    private geolocation: GeolocationPlugin,
    private nativegeocoder: NativeGeocoder
    
  ) 
  {
    this.avatarService.getPet().subscribe((data) => {
      this.pet = data;
    });
   }

   

  ngOnInit() {
    this.interaction.cargarLoading();
    this.changePhoto();
    /* this.obtenerUbicacion(); */
    this.geolocationM();
    
  }
  
  async geolocationM(){
    const princPosition = await this.geolocation.getCurrentPosition();
    console.log("Current Position: ", princPosition)
  }
  



/* async obtenerUbicacion(){
  const location = await this.geolocation.getCurrentPosition();
  console.log('location = ', location);

  this.nativegeocoder.reverseGeocode(location.coords.latitude, location.coords.longitude, this.options).then((
    result: NativeGeocoderResult[])=>{
      console.log('result = ', result);
      console.log('result = ', result[0]);
    })
}
 */

   /* await this.geolocation.getCurrentPosition().then((resp) => {
    var lat = resp.coords.latitude;
    var long = resp.coords.longitude;
    console.log(lat);
    console.log(long);
  }).catch((error) => {
    console.log('Error getting location', error);
  }); */


/*   sendPost(){
    this.geolocation.getCurrentPosition().then((resp) => {
      var lat = resp.coords.latitude;
      var long = resp.coords.longitude;
      console.log(lat);
      console.log(long);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
 */
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
    const usuario = this.authService.test()
    this.firestore.createDocument(this.data, path, usuario).then( (res) => {
      console.log('SE REGISTRO UNA MASCOTA EXITOSAMENTE: ', res);
    });
  }

  /* newReporte: reporte {
    uid: '';
    url: '';
    tipo: '';
    sexo: '';//Macho-Hembra
    raza: '';
    color: '';
    temperamento: '';
    tamano: '';
  }; */




}
