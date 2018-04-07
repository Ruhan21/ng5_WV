import { Injectable } from '@angular/core';
import { DataService } from './data.service'
import { CanActivate } from '@angular/router';

@Injectable()
export class LoginAuthService implements CanActivate{

  constructor(private _data: DataService) { }

  canActivate() {
    this._data.loggedIn.subscribe(res => {
      return res;
    });
  }
}


