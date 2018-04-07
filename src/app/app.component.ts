import { Component } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private _data: DataService, private afAuth: AngularFireAuth){
    afAuth.authState.subscribe(user => {
      if(!user){
        _data.navigateTo('Login')
      } else {
        this._data.setUser(user);

        // _data.navigateTo('')
      }
    })
  }



}
