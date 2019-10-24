import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  encendido = false;
  tabletOMovil = true;
  flashDisponible = false;
  constructor(public platform: Platform, private flashligth: Flashlight) {
    this.accionFlash();
    console.log(this.platform.platforms());

    this.platform.pause.subscribe
    (() => {
        this.flashligth.switchOff();
        this.encendido = false; });

    this.platform.backButton.subscribe(
      () => {
        this.flashligth.switchOff();
        this.encendido = false;
       }
    );
  }

  accionFlash() {
    this.platform.ready().then(() => {
      if (this.platform.is('tablet') || this.platform.is('mobile')) {
        this.tabletOMovil = true;
        this.flashligth.available().then(() => {
          this.flashDisponible = true;
        });
      } else {
        this.tabletOMovil = false;
      }
    });
  }


  accionBoton() {
    if (this.encendido === true) {
      this.flashligth.switchOff();
    } else {
      this.flashligth.switchOn();
    }
    this.textoBoton();
  }

  textoBoton() {
    if (this.encendido === true) {
      this.encendido = false;
    } else {
      this.encendido = true;
    }
  }
}
