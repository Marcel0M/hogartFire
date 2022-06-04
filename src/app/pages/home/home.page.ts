import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: FirestoreService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit(){
    this.getUsuarios();
  }

  getUsuarios(){
    this.firestore.readCollection()
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
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
}
