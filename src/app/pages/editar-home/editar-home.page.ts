import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvatarService } from 'src/app/services/avatar.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { InteractionService } from 'src/app/services/interaction.service';
import { users } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-home',
  templateUrl: './editar-home.page.html',
  styleUrls: ['./editar-home.page.scss'],
})
export class EditarHomePage implements OnInit {

  data: users = {
    uid: "",
    correo: "",
    nombre: "",
    apellido: "",
    direccion: "",
    fecha_nacimiento: "",
    sexo: "",
    reportes: 0,
    premios: 0,
    ciudad: "",
    region: ""
  }

  uid = '';
  profile = null;

  constructor(private loadingController: LoadingController, 
    private avatarService: AvatarService, 
    private alertController: AlertController, 
    private interaction: InteractionService,
    private firestore: FirestoreService,
    private authService: AuthService,
    private router: Router) 
    { 
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit() {
    this.interaction.cargarLoading();
  }


  async changeImage() {
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

      const result = await this.avatarService.uploadImage(image);
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


  editarUsuario(){
    const path = 'users';
    const usuario = this.authService.test() 
    this.data.uid = usuario;
    this.firestore.updateDoc(this.data, path, usuario).then( (res) => {
      console.log('HOGAR-TEMPORAL: SE EDITO UNA PERSONA EXITOSAMENTE: ', res);
    });
    this.router.navigateByUrl('home', { replaceUrl: true });
  }

  /* atras(){
    this.router.navigateByUrl('home', { replaceUrl: true });
  } */

}
