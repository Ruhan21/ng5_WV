import { Component, OnInit } from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {DataService} from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validToken = false;
  token: number;
  user: any;
  loggedIn = false;
  hasUser = false;
  error = false;

  constructor(private afAuth: AngularFireAuth, public _data: DataService) {
    this._data.user.subscribe(res => {
      this.user = res;
      if (res.uid) {
        this.hasUser = true;
      }
    });

    this._data.loggedIn.subscribe(res => {
      this.loggedIn = res;
    });
  }

  ngOnInit() {
  }

  googleLogin() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  facebookLogin() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  AnonLogin(){
    this.afAuth.auth.signInAnonymously();
  }

  submitToken() {
    if (this._data.newToken(this.token, this.user.uid)) {
      this._data.navigateTo('home');
    } else {
      this.error = true;
    }
  }

}
