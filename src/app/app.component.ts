import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { InteractionService } from './services/interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loading = false;

  constructor(private interactionService: InteractionService, private plt: Platform) {
    this.initApp();
  }

  initApp(){
    this.plt.ready()
    .then(_ => {
      this.watchLoading();
    });
  }

  // PANTALLA DE CARGA
  watchLoading(){
    this.interactionService.watchLoading()
    .subscribe(loading => {
        this.loading = loading;
    });
  }

}
