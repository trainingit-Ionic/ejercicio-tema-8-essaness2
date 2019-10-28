import { Component } from "@angular/core";
import { Platform, NavController } from "@ionic/angular";
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
  constructor(public platform: Platform, private flashligth: Flashlight, private nav: NavController) {
    this.accionFlash();
    console.log(this.platform.platforms());

    this.platform.pause.subscribe
    (() => {
        console.log('pause method');
        this.flashligth.switchOff();
      });

    this.platform.backButton.subscribe(
      () => {
        console.log('backbutton method');
        this.flashligth.switchOff();
       }
    );
    this.platform.resume.subscribe(
     () => {
       console.log('Resume dejo el flash como estaba');
       if ( this.encendido === true) {
          this.flashligth.switchOn();
       }
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
