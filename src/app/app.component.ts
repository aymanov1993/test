import { AuthService } from './../services/auth';
import { SigninPage } from './../pages/signin/signin';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase'

import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuth = false
  @ViewChild('nav') nav: NavController

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBiQnHGy_9_i5x13InRcNY7VCirk9nFOP0",
      authDomain: "recipebook-ea271.firebaseapp.com",
      databaseURL: "https://recipebook-ea271.firebaseio.com",
      projectId: "recipebook-ea271",
      storageBucket: "recipebook-ea271.appspot.com",
      messagingSenderId: "89632272117"
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuth = true
        this.nav.setRoot(TabsPage)
      } else {
        this.nav.setRoot(SigninPage)
        this.isAuth = false
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page)
    this.menuCtrl.close()
  }

  onLogout() {
    this.authService.signOut()
    this.menuCtrl.close()
    this.nav.setRoot(SigninPage)
  }

}

