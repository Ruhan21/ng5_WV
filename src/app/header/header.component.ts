import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navBtns = [];
  curPage: string;
  isVisibile = true;
  userUid = '';

  constructor(private afAuth: AngularFireAuth, private _data: DataService) {
    this._data.loggedIn.subscribe(res => {
      this.isVisibile = res;
      this._data.user.subscribe(user => this.userUid = user.uid);
    });
  }

  ngOnInit() {
    this._data.navBtns.subscribe(res => this.navBtns = res);
  }

  signOut() {
    const result = this.afAuth.auth.signOut();
    if (result) {
      this._data.signOut();
      this.navigateTo('login');
    }
  }

  navigateTo(page) {
    this._data.navigateTo(page);
  }

  isVisibleOnMobile(page) {
    this._data.curPage.subscribe(res => this.curPage = res);

    return page.toLowerCase() === this.curPage.toLowerCase();

  }

}
