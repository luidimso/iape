import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login-user',
  templateUrl: 'login-user.html',
})
export class LoginUserPage {
  usuarios:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public alert: AlertController, public http: HttpClient, public storage: Storage) {
    this.storage.get('usuarios').then((data) => {
      if (data != null && data != ''){
        this.usuarios = JSON.parse(data);
      }
      else {
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginUserPage');
  }

  onHome() {
    this.navCtrl.pop();
  }

  logar(email:string, senha:string) {
    let usuario:any = null;
    for (let u of this.usuarios) {
      if(u.email == email && u.senha == senha) {
        usuario = u;
      }
    }

    if (usuario != null) {
      this.storage.set('usuario_logado', JSON.stringify(usuario));
      this.navCtrl.setRoot("DstPage");
    } else {
      let alert = this.alert.create({
        title: 'E-mail ou senha incorreto',
        subTitle: 'Verifique e tente novamente',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  onCadastrarUser() {
    this.navCtrl.push("CadastroUserPage");
  }
}
