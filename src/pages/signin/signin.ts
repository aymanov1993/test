import { AuthService } from './../../services/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService : AuthService, private loadingCtrl : LoadingController, private alertCtrl : AlertController){}
  
  onSignin(form:NgForm){
    const laoding = this.loadingCtrl.create({
      content : 'Signing you in ...'
    })
    laoding.present()
    this.authService.signin(form.value.email, form.value.password)
    .then(data => {
      laoding.dismiss()
    })
    .catch(error => {
      laoding.dismiss()
      this.alertCtrl.create({
        title : 'Signin Failed!',
        message : error.message,
        buttons : ["ok"]
      }).present()
    })
  }
}
