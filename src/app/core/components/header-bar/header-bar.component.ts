import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss'],
})
export class HeaderBarComponent {

  @Input()
  title: string;

  constructor(private menu: MenuController) { }

  async openMenu() {
    this.menu.open('sidemenu');
  }

}
