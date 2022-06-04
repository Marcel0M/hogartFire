import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {


  constructor(private router: Router, 
              public navController: NavController) { }

  ngOnInit() {
  }



  //FUNCION SLIDES WELCOME PAGE
  slides = [
    {
      img: 'assets/img/mascota.png',
      titulo: 'Ayuda!<br>Rescatando de las calles<br>Una mascota abandonada'
    },
    {
      img: 'assets/img/house.png',
      titulo: 'Puedes llevarlo a un<br>Hogar temporal<br>Mas cercano'
    },
    {
      img: 'assets/img/adopta.png',
      titulo: 'Adopta!<br>Entregale amor y<br>Dale un hogar definitivo'
    }
  ];



  //FUNCIONES NAVEGACION
  comenzar() {
    this.router.navigate(['/login']);
    this.navController.navigateRoot('login')
  }

}
