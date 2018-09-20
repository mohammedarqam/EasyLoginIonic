import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePopPage } from './profile-pop';

@NgModule({
  declarations: [
    ProfilePopPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePopPage),
  ],
})
export class ProfilePopPageModule {}
