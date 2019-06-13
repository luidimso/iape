import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConvidarPage } from './convidar';

@NgModule({
  declarations: [
    ConvidarPage,
  ],
  imports: [
    IonicPageModule.forChild(ConvidarPage),
  ],
})
export class ConvidarPageModule {}
