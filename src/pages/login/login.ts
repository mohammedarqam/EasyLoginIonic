import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { DashboardPage } from '../dashboard/dashboard';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userRef = firebase.database().ref("Companies");

  email : string;
  pass : string;

  mainBtn : string = "Log In"
  loadBtn : boolean = false;

  emailCheck  : boolean = true;

  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public navParams: NavParams
  ) {
    firebase.auth().onAuthStateChanged((user)=>{
      this.userRef.child(user.uid).once('value',snap=>{
        if(snap.exists()){
          this.navCtrl.setRoot(DashboardPage);
        }        
      })
    })
  }

  gtSignUp(){
    this.navCtrl.setRoot(SignUpPage);
  }

  checkData(){
    if(this.email){  
      if(this.pass){
        this.login();
      }else{
        this.presentToast("Enter Password");
      }
    }else{
      this.presentToast("Enter Email");
    }
  }

  login(){
    this.disMainBtn();
    firebase.auth().signInWithEmailAndPassword(this.email,this.pass).catch((e)=>{
      var err = e.message;
      this.clear();
      this.enMainBtn();
      this.presentToast(err);
    })
  }

  disMainBtn(){
    this.mainBtn = "Logging In"
    this.loadBtn = true;
  }
  enMainBtn(){
    this.mainBtn = "Log In"
    this.loadBtn = false;
  }

  clear(){
    this.email = null;
    this.pass = null;
  }

presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'top',
    showCloseButton : true
  });
  toast.present();

}


}
