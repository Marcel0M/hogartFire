import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, IonDatetime, LoadingController } from '@ionic/angular';
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
    id: "",
    uid: "",
    url: "",
    tipo: "",
    sexo: "",
    raza: "",
    color: "",
    temperamento: "",
    tamano: "",
    situacion: "",
    lat: 0,
    lng: 0,
  }

  randomId = "";
  uid = '';
  lat = 0;
  lng = 0;
  alt : number;
  accur: number;
  options : GeolocationOptions;
  pet = null;
  newFile: any;
  getPetImage = null;

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
        this.lng = resp.coords.longitude;
        console.log('MASCOTA: Latitud : ', resp.coords.latitude);
        console.log('MASCOTA: Longitud: ', resp.coords.longitude);
      }).catch((error) => {
        console.log('MASCOTA: Error al obtener tu ubicacion', error);
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
      const path = 'reportes';
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
        console.log("MASCOTA: ERROR AL CARGAR IMAGEN");
        await alert.present();
      }
      console.log("MASCOTA: IMAGEN CARGADA CORRECTAMENTE");

      this.avatarService.getPetImage(this.randomId).subscribe((data) => {
        this.getPetImage = data;
      });
    }
  }

   registrarPet(){
    const path = 'reportes';
    const token = this.randomId
    const usuario = this.authService.test() 
    this.data.uid = usuario;
    this.data.lat = this.lat;
    this.data.lng = this.lng;
    this.data.id = token;
    this.firestore.createDocument(this.data, path, token).then( (res) => {
      console.log('HOGAR-TEMPORAL: ID ASIGNADO A ESTE REPORTE: ', token);
      console.log('HOGAR-TEMPORAL: SE REGISTRO UNA MASCOTA EXITOSAMENTE: ', res);
      //this.interaction.presentToast('SE REGISTRO UNA MASCOTA EXITOSAMENTE', 2000);
    });
    this.router.navigateByUrl('main-menu', { replaceUrl: true });
  }
}