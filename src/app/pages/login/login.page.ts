import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { users } from 'src/app/models/models';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  user = null;
  

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


  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private interaction: InteractionService,
    private firestore: FirestoreService
  ) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      const path = 'users';
      const usuario = this.authService.test();
      this.perfil.uid = usuario;
      this.firestore.createDocument(this.perfil, path, usuario).then( (res) => {
        console.log('HOGAR-TEMPORAL: SE CREO UNA PERSONA EXITOSAMENTE: ');
      });
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.interaction.showAlert('Registro Fallido', 'Por Favor intentalo nuevamente!', ['OK']);
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      //console.log('SE LOGEO ALGUIEN CORRECTAMENTE ');
      //this.interaction.presentToast('Usuario Logeado Correctamente', 2000);
      this.router.navigateByUrl('/main-menu', { replaceUrl: true });
    } else {
      this.interaction.showAlert('Login Fallido', 'Por Favor intentalo nuevamente!', ['OK']);
    }
  }


//INICIO SESION CON GOOGLE
  async signIn() {
    this.user = await GoogleAuth.signIn();
    this.router.navigateByUrl('/main-menu')
    console.log('user: ', this.user);
  };
  async refresh() {
    const AuthCode = await GoogleAuth.refresh();
    console.log('actualizar: ', AuthCode);
    //{ accessToken: 'xxx', idToken: 'xxx'}
  };
  async signOut() {
    await GoogleAuth.signOut();
    this.user = null;
  };
}
