import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  loading = new BehaviorSubject(false);

  constructor(public toastController: ToastController, public alertController: AlertController) { }

  showLoading(){
    this.loading.next(true);
  }

  dismissLoading(){
    this.loading.next(false);
  }

  watchLoading(){
    return this.loading.asObservable();
  }

  cargarLoading(){
    this.showLoading();
    setTimeout(_ => {
      this.dismissLoading();
    }, 2000);
  }

async presentToast(mensaje: string, duracion: number){
  const toast = await this.toastController.create({
    message: mensaje,
    duration: duracion
  });
}

async showAlert(header, message, buttons) {
  const alert = await this.alertController.create({
    header,
    message,
    buttons,
  });
  await alert.present();
}

}
