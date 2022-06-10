import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;

  perfil: users = {
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

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private firestore: FirestoreService,
    private interaction: InteractionService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  ngOnInit(){
    this.getUsuarios();
    this.interaction.cargarLoading();
    this.obtenerDatos()
  }

 
  getUsuarios(){
    this.firestore.readCollection()
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

  editar() {
    this.router.navigateByUrl('editar-home', { replaceUrl: true });
  }

  obtenerDatos(){
    const id = this.authService.test() 
    this.firestore.getDoc<users>('users', id).subscribe( (res)=> {
      console.log("LECTURA DATOS: ", res)
       this.perfil.nombre = res.nombre;
      this.perfil.correo = res.correo;
      this.perfil.apellido = res.apellido;
      this.perfil.sexo = res.sexo
      this.perfil.fecha_nacimiento = res.fecha_nacimiento
      this.perfil.direccion = res.direccion
    })
  }





}
