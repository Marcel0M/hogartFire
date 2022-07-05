import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users, reporte } from 'src/app/models/models';
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
    fecha_nacimiento: null,
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


  // FORMA ARCAICA DE REALIZAR LAS VALIDACIONES. SE DEBE ACTUALIZAR ESTE METODO SI O SI!
  obtenerDatos(){
    const id = this.authService.test() 
    this.firestore.getDoc<users>('users', id).subscribe( (res)=> {
      console.log("LECTURA DATOS: ", res)
      if (res.nombre === '') {
        this.perfil.nombre = 'Vacio';
        this.perfil.correo = res.correo;
        this.perfil.apellido = res.apellido;
        this.perfil.sexo = res.sexo;
        this.perfil.fecha_nacimiento = res.fecha_nacimiento;
        this.perfil.direccion = res.direccion;
        this.perfil.ciudad = res.ciudad;
        this.perfil.region = res.region;
        this.perfil.reportes = res.reportes;
      } else if (res.apellido === '') {
        this.perfil.apellido = 'Vacio';
        this.perfil.nombre = res.nombre;
        this.perfil.correo = res.correo;
        this.perfil.sexo = res.sexo;
        this.perfil.fecha_nacimiento = res.fecha_nacimiento;
        this.perfil.direccion = res.direccion;
        this.perfil.ciudad = res.ciudad;
        this.perfil.region = res.region;
        this.perfil.reportes = res.reportes;
      } else if (res.correo === '') {
        this.perfil.correo = 'Vacio';
        this.perfil.nombre = res.nombre;
        this.perfil.apellido = res.apellido;
        this.perfil.sexo = res.sexo;
        this.perfil.fecha_nacimiento = res.fecha_nacimiento;
        this.perfil.direccion = res.direccion;
        this.perfil.ciudad = res.ciudad;
        this.perfil.region = res.region;
        this.perfil.reportes = res.reportes;
      } else if (res.sexo === '') {
        this.perfil.sexo = 'Vacio';
        this.perfil.nombre = res.nombre;
        this.perfil.correo = res.correo;
        this.perfil.apellido = res.apellido;
        this.perfil.fecha_nacimiento = res.fecha_nacimiento;
        this.perfil.direccion = res.direccion;
        this.perfil.ciudad = res.ciudad;
        this.perfil.region = res.region;
        this.perfil.reportes = res.reportes;
      } else if (res.fecha_nacimiento === null) {
        this.perfil.fecha_nacimiento = null;
        this.perfil.nombre = res.nombre;
        this.perfil.correo = res.correo;
        this.perfil.apellido = res.apellido;
        this.perfil.sexo = res.sexo;
        this.perfil.direccion = res.direccion;
        this.perfil.ciudad = res.ciudad;
        this.perfil.region = res.region;
        this.perfil.reportes = res.reportes;
      } else if ( res.direccion === '') {
        this.perfil.direccion = 'Vacio';
        this.perfil.nombre = res.nombre;
        this.perfil.correo = res.correo;
        this.perfil.apellido = res.apellido;
        this.perfil.sexo = res.sexo;
        this.perfil.fecha_nacimiento = res.fecha_nacimiento;
        this.perfil.ciudad = res.ciudad;
        this.perfil.region = res.region;
        this.perfil.reportes = res.reportes;
      } else if (res.ciudad === '') {
        this.perfil.ciudad = 'Vacio';
        this.perfil.nombre = res.nombre;
        this.perfil.correo = res.correo;
        this.perfil.apellido = res.apellido;
        this.perfil.sexo = res.sexo;
        this.perfil.fecha_nacimiento = res.fecha_nacimiento;
        this.perfil.direccion = res.direccion;
        this.perfil.region = res.region;
        this.perfil.reportes = res.reportes;
      } else if ( res.region === '') {
        this.perfil.region = 'Vacio'; 
        this.perfil.nombre = res.nombre;
        this.perfil.correo = res.correo;
        this.perfil.apellido = res.apellido;
        this.perfil.sexo = res.sexo;
        this.perfil.fecha_nacimiento = res.fecha_nacimiento;
        this.perfil.direccion = res.direccion;
        this.perfil.ciudad = res.ciudad;
        this.perfil.reportes = res.reportes;
      } else {
      this.perfil.nombre = res.nombre;
      this.perfil.correo = res.correo;
      this.perfil.apellido = res.apellido;
      this.perfil.sexo = res.sexo;
      this.perfil.fecha_nacimiento = res.fecha_nacimiento;
      this.perfil.direccion = res.direccion;
      this.perfil.ciudad = res.ciudad;
      this.perfil.region = res.region;
      this.perfil.reportes = res.reportes;
    }

    })
  }
}
