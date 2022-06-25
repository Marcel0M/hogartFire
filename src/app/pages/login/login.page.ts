import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { users } from 'src/app/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  

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
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
}
