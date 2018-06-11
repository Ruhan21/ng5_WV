import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class LoginGuard implements CanActivate {

  status: boolean;

  constructor(private _data: DataService) {
    this._data.loggedIn.subscribe(res => {
      this.status = res;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log(state.url);
    console.log(next);
    this._data.changeCurPage(next.url[0].path);
     return this.status;
  }
}
