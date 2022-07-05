import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, IonDatetime, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { reporte, users } from 'src/app/models/models';
import { Geolocation, GeolocationOptions } from '@awesome-cordova-plugins/geolocation/ngx';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.page.html',
  styleUrls: ['./register-pet.page.scss'],
})
export class RegisterPetPage implements OnInit {

  nuevoReporte: Subscription;
  cantidadReporte: reporte[]

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

  perfil: users = {
    uid: "",
    correo: "",
    nombre: "",
    apellido: "",
    direccion: "",
    fecha_nacimiento: null,
    sexo: "",
    reportes: 0,
    premios: 0,
    ciudad: "",
    region: ""
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
    this.cargarUsuario();
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
    this.enviarContadorReportes();
    this.firestore.createDocument(this.data, path, token).then( (res) => {
      console.log('HOGAR-TEMPORAL: ID ASIGNADO A ESTE REPORTE: ', token);
      console.log('HOGAR-TEMPORAL: SE REGISTRO UNA MASCOTA EXITOSAMENTE: ', res);
    });
    this.router.navigateByUrl('main-menu', { replaceUrl: true });
  }


  cargarUsuario(){
    const usuario = this.authService.test() 
    this.firestore.getDoc<users>('users', usuario).subscribe( (resUser)=> {
      this.perfil.nombre = resUser.nombre;
      this.perfil.correo = resUser.correo;
      this.perfil.apellido = resUser.apellido;
      this.perfil.sexo = resUser.sexo;
      this.perfil.fecha_nacimiento = resUser.fecha_nacimiento;
      this.perfil.direccion = resUser.direccion;
      this.perfil.ciudad = resUser.ciudad;
      this.perfil.region = resUser.region;
      this.perfil.reportes = resUser.reportes;
    });
    
  }

  enviarContadorReportes() {
    const usuario = this.authService.test() 
    this.perfil.reportes = this.perfil.reportes + 1
    this.firestore.updateDoc(this.perfil, 'users', usuario).then( (res2) => {
      console.log('HOGAR-TEMPORAL: SE REGISTRO UNA MASCOTA EXITOSAMENTE: ', res2);
    })
  }

}