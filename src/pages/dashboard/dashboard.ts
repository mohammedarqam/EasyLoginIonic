import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ProfilePopPage } from '../profile-pop/profile-pop';
import { ViewUsersPage } from '../view-users/view-users';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(
  public navCtrl: NavController, 
  public popoverCtrl : PopoverController,
  public navParams: NavParams
  ) {
  }

  profilePop(ev) {
    let popover = this.popoverCtrl.create(ProfilePopPage);
    popover.present({
      ev: ev
    });
  }

  viewUsers(){
    this.navCtrl.push(ViewUsersPage);
  }


}
