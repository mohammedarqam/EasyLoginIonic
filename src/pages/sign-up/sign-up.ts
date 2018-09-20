import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  userRef = firebase.database().ref("Companies");

  name  : string;
  website : string;
  email : string;
  pass : string;

  mainBtn : string = "Create"
  loadBtn : boolean = false;

  emailCheck  : boolean = true;
  passCheck  : boolean = true;
  urlcheck  : boolean = true;

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

  gtLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  checkData(){
    if(this.name){  
      if(this.emailCheck){
        if(this.passCheck){
          if(this.urlcheck){
            this.register();
          }
        }
      }
    }else{
      this.presentToast("Enter a Name");
    }
  }

  register(){
    this.disMainBtn();
    firebase.auth().createUserWithEmailAndPassword(this.email,this.pass).catch((e)=>{
      var err = e.message;
      this.clear();
      this.enMainBtn();
      this.presentToast(err);
    }).then(()=>{
      this.userRef.child(firebase.auth().currentUser.uid).set({
        Name : this.name,
        Email : this.email,
        Password : this.pass,
        Website : this.website
      }).then(()=>{
        this.navCtrl.setRoot(DashboardPage);
      })
    })
  }

  disMainBtn(){
    this.mainBtn = "Creating"
    this.loadBtn = true;
  }
  enMainBtn(){
    this.mainBtn = "Create"
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
