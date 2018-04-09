import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from "@angular/router"; //This is when you send through variables through url
import {DataService} from '../data.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  user: any;

  constructor(private _data: DataService) {
    this._data.user.subscribe(res => {
      this.user = res;

      if (!this.user.photoURL) {
        this.user.photoURL = 'assets/images/intro/default.png';
      }
    });
  }

  curPage = 'home';

  ngOnInit() {
    const btn = document.getElementById('btn');

    this._data.changeCurPage(this.curPage);

    btn.addEventListener('click', function () {
      alert('hello');
    });
  }
}
