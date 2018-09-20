import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profile-pop',
  templateUrl: 'profile-pop.html',
})
export class ProfilePopPage {

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }


  signOut(){
    firebase.auth().signOut().then(()=>{
      this.navCtrl.setRoot(LoginPage);
    })
  }

}
