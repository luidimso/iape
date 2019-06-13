import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { BrMaskModel, BrMaskerIonic3 } from 'brmasker-ionic-3';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-cadastro-user',
  templateUrl: 'cadastro-user.html',
  providers: [BrMaskerIonic3]
})
export class CadastroUserPage {
  myphoto:string = '';
  endereco:any = {
    cep: "",
    bairro: "",
    cidade: "",
    uf: ""
  };
  usuarios:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public loading: LoadingController, public alert: AlertController, public http: HttpClient, public storage: Storage) {
    this.storage.get('usuarios').then((data) => {
      if (data != null && data != ''){
        this.usuarios = JSON.parse(data);
      }
      else {
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUserPage');
  }

  onLoginUser(){
    this.navCtrl.pop();
  }

  getImage() {
    const options: CameraOptions = {
      quality: 50,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myphoto = "data:image/jpeg;base64," + imageData;
    });
  }

  onChange(input:number){
    if(input == 9){
      let loading = this.loading.create({ content: "Buscando endereço" });
      loading.present();

      let cep = this.endereco.cep.replace("-", "")

      this.http.get("https://viacep.com.br/ws/"+cep+"/json/").subscribe(res => {
        const response:any = res;

        if(!response.hasOwnProperty("erro")){
          this.endereco.bairro = response.bairro;
          this.endereco.cidade = response.localidade;
          this.endereco.uf = response.uf;
        } else {
          let alert = this.alert.create({
            title: 'Endereço não encontrado',
            subTitle: '',
            buttons: ['OK']
          });
          alert.present();
        }
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();

        let alert = this.alert.create({
          title: 'Não foi possível conectar ao servidor!',
          subTitle: 'Verifique sua conexão com a internet',
          buttons: ['OK']
        });
        alert.present();
      });
    }
  }

  cadastrar(nome:string, email:string, dt:string, sexo:string, senha:string, senhaConf:string){
    if(nome == '' || sexo == '' || senha == '' || senhaConf == ''){
      let alert = this.alert.create({
        title: 'Algum campo não foi preenchido',
        subTitle: 'Verifique e tente novamente',
        buttons: ['OK']
      });
      alert.present();
    } else {
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        let alert = this.alert.create({
          title: 'E-mail inválido',
          subTitle: 'Verifique e tente novamente',
          buttons: ['OK']
        });
        alert.present();
      } else {
        let data = dt.split("/");
        dt = data[2]+"-"+data[1]+"-"+data[0];
        let dt_teste = new Date(dt).getTime();

        if (dt.length != 10 || isNaN(dt_teste)) {
          let alert = this.alert.create({
            title: 'Data de nascimento inválida',
            subTitle: 'Verifique e tente novamente',
            buttons: ['OK']
          });
          alert.present();
        } else {
          if (senha != senhaConf){
            let alert = this.alert.create({
              title: 'As senhas não são iguais',
              subTitle: 'Verifique e tente novamente',
              buttons: ['OK']
            });
            alert.present();
          } else {
            let achou:boolean = false;
            for (let u of this.usuarios){
              if (u.email == email) {
                achou = true;
              }
            }

            if (achou) {
              let alert = this.alert.create({
                title: 'E-mail já sendo usado por outra conta',
                subTitle: 'Verifique e tente novamente',
                buttons: ['OK']
              });
              alert.present();
            } else {
              let usuario = {
                foto: this.myphoto,
                nome: nome,
                email: email,
                dt_nascimento: dt,
                sexo: sexo,
                endereco: this.endereco,
                senha: senha,
                salvos: []
              };

              this.usuarios.push(usuario);
              this.storage.set('usuarios', JSON.stringify(this.usuarios));
              this.navCtrl.pop();
            }
          }
        }
      }
    }
  }
}
