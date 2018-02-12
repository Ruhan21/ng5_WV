import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navBtns = [];
  curPage: string;

  constructor(private router: Router, private _data: DataService) {
  }

  ngOnInit() {
    this._data.navBtns.subscribe(res => this.navBtns = res);
  }

  navigateTo(page) {
    this.router.navigate([page.toLowerCase()]);
  }

  isVisibleOnMobile(page) {
    this._data.curPage.subscribe(res => this.curPage = res);

    return page.toLowerCase() === this.curPage.toLowerCase();

  }

}
