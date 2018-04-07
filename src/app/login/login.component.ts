import { Component, OnInit } from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {DataService} from "../data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, public _data: DataService) { }

  ngOnInit() {
  }

  googleLogin() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  // async googleLogin() : Promise<void>{
  //   try{
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     const credentail = await firebase.auth().signInWithPopup(provider);
  //   } catch (err){
  //     console.log(err)
  //   }
  // }

}
