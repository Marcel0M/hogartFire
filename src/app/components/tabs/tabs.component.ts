import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  selectTab: any;
  @ViewChild('tabs') tabs: IonTabs;
  constructor() { }

  ngOnInit() {}

  setCurrentTab(event) {
    console.log(event);
    this.selectTab = this.tabs.getSelected();
  }

}


  