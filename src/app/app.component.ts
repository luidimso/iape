import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, Slides } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild('switcher') slides: Slides;

  rootPage:any;
  usuario:any = [];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public events: Events) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#5CE1E6');
      splashScreen.hide();

      this.storage.get('usuario_logado').then((data) => {
        if (data != null && data != ''){
          this.usuario = JSON.parse(data);
          if(this.usuario.hasOwnProperty("crm")){
            this.rootPage = "DstPage";
          }
          else{
            this.rootPage = "DstPage";
          }
        }
        else {
          this.rootPage = "HomePage";
        }
      });

      events.subscribe('usuario_logado:changed', (u) => {
        this.usuario = u;
      });
    });
  }

  menuOpened() {
    this.slides.update();
  }

  next() {
    this.slides.slideNext();
  }

  onDst(page:number) {
    this.storage.set('dstPage', page);
    this.nav.setRoot('DstPage');
  }
}
