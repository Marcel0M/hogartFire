import { Injectable } from '@angular/core';
import {ActionPerformed,PushNotificationSchema,PushNotifications,Token, PushNotificationActionPerformed} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public platform: Platform) {
    this.inicializar();
   }


inicializar(){
  if (this.platform.is('capacitor')) {
    PushNotifications.requestPermissions().then( result => {
      console.log("Pidiendo permisos");
      if (result.receive === 'granted') {
        console.log("Permiso concedido");
        PushNotifications.register();
        this.addListeners();
      } else {
        // Mostrar error
      }
    });
  } else {
    console.log('No es un movil');
  }
}

addListeners(){
  PushNotifications.addListener('registration',
    (token: Token) => {
/*       this.guardarToken(token.value); */
      console.log("El token es: ", token);
    }
  );

  PushNotifications.addListener('registrationError', 
    (error: any) => {
      console.log("Error al registrar ", error)
    }
  );

  PushNotifications.addListener('pushNotificationReceived', 
    (notification: PushNotificationSchema) => {
      console.log("Notificacion en primer plano recibida: ", notification)
    }
  );

  PushNotifications.addListener('pushNotificationActionPerformed', 
    (notification: ActionPerformed) => {
      console.log("Notificacion en segundo plano recibida: ", notification)
    }
  );

  

}

}
