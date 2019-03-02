import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BackButtonTabsDirective } from './back-button-tabs.directive';
import { BackButtonTabsComponent } from './back-button-tabs.component';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    BackButtonTabsDirective,
    BackButtonTabsComponent
  ],
  exports: [
    BackButtonTabsComponent
  ]
})
export class BackButtonTabsModule { }
