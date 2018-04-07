import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navBtns = [];
  curPage: string;
  isVisibile:boolean = true;

  constructor(private _data: DataService) {
    this._data.loggedIn.subscribe(res => this.isVisibile = res);
  }

  ngOnInit() {
    this._data.navBtns.subscribe(res => this.navBtns = res);
  }

  navigateTo(page) {
    this._data.navigateTo(page)
  }

  isVisibleOnMobile(page) {
    this._data.curPage.subscribe(res => this.curPage = res);

    return page.toLowerCase() === this.curPage.toLowerCase();

  }

}
