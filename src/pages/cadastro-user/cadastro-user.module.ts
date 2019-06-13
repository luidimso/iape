import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroUserPage } from './cadastro-user';
import { BrMaskerModule } from 'brmasker-ionic-3';


@NgModule({
  declarations: [
    CadastroUserPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroUserPage),
    BrMaskerModule
  ],
})
export class CadastroUserPageModule {}
