import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';


import { environment } from 'src/environments/environment';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { reporte } from 'src/app/models/models';


@Component({
  selector: 'app-profile-pet',
  templateUrl: './profile-pet.page.html',
  styleUrls: ['./profile-pet.page.scss'],
})
export class ProfilePetPage implements OnInit {

  petPerfil : reporte = {
    id: "",
    uid: "",
    url: "",
    tipo: "",
    sexo: "",//Macho-Hembra
    raza: "",
    color: "",
    temperamento: "",
    tamano: "",
    lat: 0,
    lon: 0,
    situacion: ""
  }
  ruta: string = '';
  profile = null;
  Reportes : reporte[] = [];

  

  constructor(
    private router: Router,
    private avatarService: AvatarService,
    public navController: NavController,
    public loadingController: LoadingController,
    private authService: AuthService,
    private interaction: InteractionService,
    private firestore: FirestoreService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
      
    });
   }

  ngOnInit() {

    
    this.interaction.cargarLoading();
    const pet = this.firestore.getPet();
    console.log('VAMOS A MOSTRAR ESTE ->', pet);
  }

   //FUNCION QUE CARGA PAGINA
   async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 1500,
      spinner: "bubbles"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('HOGAR-TEMPORAL: CARGA FINALIZADA');
  }


  //FUNCIONES NAVEGACION
  toHome() {
    this.router.navigate(['/home']);
    this.navController.navigateRoot('home')
  }


  cargarReportes(){
    this.firestore.getCollection<reporte>('reportes').subscribe( res => {
      console.log('HOGAR-TEMPORAL: Esta es la coleccion: ', res);
      this.Reportes = res;
    })
  }

  /* editPet() {
    this.firestore.readPet
  } */

  /* obtenerPet() {
    this.firestore.getPet().( (res)=> {
      console.log("LECTURA DATOS: ", res)
      this.petPerfil.tipo = res.tipo;
      this.petPerfil.sexo = res.sexo;
      this.petPerfil.raza = res.raza;
      this.petPerfil.color = res.color;
      this.petPerfil.temperamento = res.temperamento;
      this.petPerfil.tamano = res.tamano;
      this.petPerfil.lat = res.lat;
      this.petPerfil.lon = res.lon;
      this.petPerfil.situacion = res.situacion;
    })
  } */

}
